import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticate } from '@/lib/auth';
import { z } from 'zod';

// 게시글 생성 요청 검증 스키마
const createPostSchema = z.object({
  title: z.string().min(1, { message: '제목을 입력해주세요.' }),
  content: z.string().min(1, { message: '내용을 입력해주세요.' }),
  categoryId: z.number().optional(),
  relatedLinks: z.array(z.any()).optional(),
});

// 게시글 목록 조회 (GET)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // 페이지네이션 파라미터
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;
    
    // 필터링 파라미터
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    // 검색 조건 구성
    const where: any = { deletedAt: null };
    
    if (category) {
      const categoryObj = await prisma.boardCategory.findFirst({
        where: { name: category }
      });
      
      if (categoryObj) {
        where.categoryId = categoryObj.id;
      }
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    // 게시글 조회
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              username: true,
              role: true
            }
          },
          category: true
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.post.count({ where })
    ]);
    
    // 페이지네이션 정보
    const totalPages = Math.ceil(total / limit);
    
    return NextResponse.json({
      success: true,
      data: {
        items: posts,
        pagination: {
          page,
          limit,
          total,
          totalPages
        }
      }
    });
    
  } catch (error) {
    console.error('게시글 목록 조회 오류:', error);
    return NextResponse.json({ 
      success: false, 
      error: { message: '게시글 목록 조회 중 오류가 발생했습니다.' }
    }, { status: 500 });
  }
}

// 게시글 생성 (POST)
export async function POST(request: NextRequest) {
  try {
    // 인증 검증
    const authResult = await authenticate(request);
    if (authResult instanceof NextResponse) {
      return authResult; // 인증 실패 응답 반환
    }
    
    // 요청 본문 파싱
    const body = await request.json();
    
    // 데이터 유효성 검증
    const result = createPostSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ 
        success: false, 
        error: { 
          message: '입력 데이터가 유효하지 않습니다.',
          details: result.error.format() 
        }
      }, { status: 400 });
    }
    
    const { title, content, categoryId, relatedLinks } = result.data;
    
    // 사용자 역할 확인 (counselor 또는 admin만 공식 게시글 작성 가능)
    const user = await prisma.user.findUnique({
      where: { id: authResult.id as string },
      select: { role: true }
    });
    
    const isOfficial = user?.role === 'admin';
    const isCounselor = user?.role === 'counselor';
    
    // 게시글 생성
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        categoryId: categoryId || undefined,
        authorId: authResult.id as string,
        isOfficial,
        isCounselor,
        relatedLinks: relatedLinks || []
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            role: true
          }
        },
        category: true
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      data: newPost
    }, { status: 201 });
    
  } catch (error) {
    console.error('게시글 생성 오류:', error);
    return NextResponse.json({ 
      success: false, 
      error: { message: '게시글 생성 중 오류가 발생했습니다.' }
    }, { status: 500 });
  }
}