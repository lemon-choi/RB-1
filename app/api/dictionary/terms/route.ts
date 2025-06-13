import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticate } from '@/lib/auth';
import { z } from 'zod';

// 용어 생성 요청 검증 스키마
const createTermSchema = z.object({
  title: z.string().min(1, { message: '용어명을 입력해주세요.' }),
  titleEn: z.string().optional(),
  description: z.string().min(1, { message: '설명을 입력해주세요.' }),
  example: z.string().optional(),
  categoryId: z.number().optional(),
  isFeatured: z.boolean().optional(),
  imageUrl: z.string().optional(),
  relatedTerms: z.array(z.string()).optional(),
});

// 용어 목록 조회 (GET)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // 필터링 파라미터
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured') === 'true';
    
    // 검색 조건 구성
    const where: any = {};
    
    if (category) {
      const categoryObj = await prisma.dictionaryCategory.findFirst({
        where: { name: category }
      });
      
      if (categoryObj) {
        where.categoryId = categoryObj.id;
      }
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { titleEn: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (featured) {
      where.isFeatured = true;
    }
    
    // 용어 조회
    const terms = await prisma.dictionaryTerm.findMany({
      where,
      include: {
        category: true
      },
      orderBy: [
        { isFeatured: 'desc' },
        { title: 'asc' }
      ]
    });
    
    return NextResponse.json({
      success: true,
      data: terms
    });
    
  } catch (error) {
    console.error('용어 목록 조회 오류:', error);
    return NextResponse.json({ 
      success: false, 
      error: { message: '용어 목록 조회 중 오류가 발생했습니다.' }
    }, { status: 500 });
  }
}

// 용어 생성 (POST) - 관리자만 가능
export async function POST(request: NextRequest) {
  try {
    // 인증 검증
    const authResult = await authenticate(request);
    if (authResult instanceof NextResponse) {
      return authResult; // 인증 실패 응답 반환
    }
    
    // 관리자 권한 확인
    const user = await prisma.user.findUnique({
      where: { id: authResult.id as string },
      select: { role: true }
    });
    
    if (user?.role !== 'admin' && user?.role !== 'counselor') {
      return NextResponse.json({ 
        success: false, 
        error: { message: '용어를 생성할 권한이 없습니다.' }
      }, { status: 403 });
    }
    
    // 요청 본문 파싱
    const body = await request.json();
    
    // 데이터 유효성 검증
    const result = createTermSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ 
        success: false, 
        error: { 
          message: '입력 데이터가 유효하지 않습니다.',
          details: result.error.format() 
        }
      }, { status: 400 });
    }
    
    const { 
      title, 
      titleEn, 
      description, 
      example, 
      categoryId, 
      isFeatured, 
      imageUrl, 
      relatedTerms 
    } = result.data;
    
    // 용어 생성
    const newTerm = await prisma.dictionaryTerm.create({
      data: {
        title,
        titleEn,
        description,
        example,
        categoryId: categoryId || undefined,
        isFeatured: isFeatured || false,
        imageUrl,
        relatedTerms: relatedTerms || []
      },
      include: {
        category: true
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      data: newTerm
    }, { status: 201 });
    
  } catch (error) {
    console.error('용어 생성 오류:', error);
    return NextResponse.json({ 
      success: false, 
      error: { message: '용어 생성 중 오류가 발생했습니다.' }
    }, { status: 500 });
  }
}