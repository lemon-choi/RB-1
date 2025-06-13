import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticate } from '@/lib/auth';
import { z } from 'zod';

// 카테고리 생성 요청 검증 스키마
const createCategorySchema = z.object({
  name: z.string().min(1, { message: '카테고리명을 입력해주세요.' }),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, { message: '유효한 색상 코드를 입력해주세요.' }).optional(),
});

// 카테고리 목록 조회 (GET)
export async function GET() {
  try {
    // 카테고리 조회
    const categories = await prisma.dictionaryCategory.findMany({
      orderBy: { id: 'asc' }
    });
    
    return NextResponse.json({
      success: true,
      data: categories
    });
    
  } catch (error) {
    console.error('카테고리 목록 조회 오류:', error);
    return NextResponse.json({ 
      success: false, 
      error: { message: '카테고리 목록 조회 중 오류가 발생했습니다.' }
    }, { status: 500 });
  }
}

// 카테고리 생성 (POST) - 관리자만 가능
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
    
    if (user?.role !== 'admin') {
      return NextResponse.json({ 
        success: false, 
        error: { message: '카테고리를 생성할 권한이 없습니다.' }
      }, { status: 403 });
    }
    
    // 요청 본문 파싱
    const body = await request.json();
    
    // 데이터 유효성 검증
    const result = createCategorySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ 
        success: false, 
        error: { 
          message: '입력 데이터가 유효하지 않습니다.',
          details: result.error.format() 
        }
      }, { status: 400 });
    }
    
    const { name, color } = result.data;
    
    // 중복 카테고리 확인
    const existingCategory = await prisma.dictionaryCategory.findFirst({
      where: { name }
    });
    
    if (existingCategory) {
      return NextResponse.json({ 
        success: false, 
        error: { message: '이미 존재하는 카테고리 이름입니다.' }
      }, { status: 400 });
    }
    
    // 카테고리 생성
    const newCategory = await prisma.dictionaryCategory.create({
      data: {
        name,
        color
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      data: newCategory
    }, { status: 201 });
    
  } catch (error) {
    console.error('카테고리 생성 오류:', error);
    return NextResponse.json({ 
      success: false, 
      error: { message: '카테고리 생성 중 오류가 발생했습니다.' }
    }, { status: 500 });
  }
}