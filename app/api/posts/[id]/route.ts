import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticate } from '@/lib/auth';
import { z } from 'zod';

// 게시글 수정 요청 검증 스키마
const updatePostSchema = z.object({
  title: z.string().min(1, { message: '제목을 입력해주세요.' }).optional(),
  content: z.string().min(1, { message: '내용을 입력해주세요.' }).optional(),
  categoryId: z.number().optional(),
  relatedLinks: z.array(z.any()).optional(),
});

// 게시글 상세 조회 (GET)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id;
    
    // 게시글 조회
    const post = await prisma.post.findUnique({
      where: { 
        id: postId,
        deletedAt: null
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
    
    if (!post) {
      return NextResponse.json({ 
        success: false, 
        error: { message: '게시글을 찾을 수 없습니다.' }
      }, { status: 404 });
    }
    
    // 조회수 증가
    await prisma.post.update({
      where: { id: postId },
      data: { views: { increment: 1 } }
    });
    
    return NextResponse.json({
      success: true,
      data: post
    });
    
  } catch (error) {
    console.error('게시글 상세 조회 오류:', error);
    return NextResponse.json({ 
      success: false, 
      error: { message: '게시글 조회 중 오류가 발생했습니다.' }
    }, { status: 500 });
  }
}

// 게시글 수정 (PATCH)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 인증 검증
    const authResult = await authenticate(request);
    if (authResult instanceof NextResponse) {
      return authResult; // 인증 실패 응답 반환
    }
    
    const postId = params.id;
    
    // 게시글 존재 및 권한 확인
    const post = await prisma.post.findUnique({
      where: { 
        id: postId,
        deletedAt: null
      },
      select: { authorId: true }
    });
    
    if (!post) {
      return NextResponse.json({ 
        success: false, 
        error: { message: '게시글을 찾을 수 없습니다.' }
      }, { status: 404 });
    }
    
    // 작성자 또는 관리자만 수정 가능
    const user = await prisma.user.findUnique({
      where: { id: authResult.id as string },
      select: { role: true }
    });
    
    if (post.authorId !== authResult.id && user?.role !== 'admin') {
      return NextResponse.json({ 
        success: false, 
        error: { message: '게시글을 수정할 권한이 없습니다.' }
      }, { status: 403 });
    }
    
    // 요청 본문 파싱
    const body = await request.json();
    
    // 데이터 유효성 검증
    const result = updatePostSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ 
        success: false, 
        error: { 
          message: '입력 데이터가 유효하지 않습니다.',
          details: result.error.format() 
        }
      }, { status: 400 });
    }
    
    // 게시글 수정
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        ...result.data,
        updatedAt: new Date()
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
      data: updatedPost
    });
    
  } catch (error) {
    console.error('게시글 수정 오류:', error);
    return NextResponse.json({ 
      success: false, 
      error: { message: '게시글 수정 중 오류가 발생했습니다.' }
    }, { status: 500 });
  }
}

// 게시글 삭제 (DELETE)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 인증 검증
    const authResult = await authenticate(request);
    if (authResult instanceof NextResponse) {
      return authResult; // 인증 실패 응답 반환
    }
    
    const postId = params.id;
    
    // 게시글 존재 및 권한 확인
    const post = await prisma.post.findUnique({
      where: { 
        id: postId,
        deletedAt: null
      },
      select: { authorId: true }
    });
    
    if (!post) {
      return NextResponse.json({ 
        success: false, 
        error: { message: '게시글을 찾을 수 없습니다.' }
      }, { status: 404 });
    }
    
    // 작성자 또는 관리자만 삭제 가능
    const user = await prisma.user.findUnique({
      where: { id: authResult.id as string },
      select: { role: true }
    });
    
    if (post.authorId !== authResult.id && user?.role !== 'admin') {
      return NextResponse.json({ 
        success: false, 
        error: { message: '게시글을 삭제할 권한이 없습니다.' }
      }, { status: 403 });
    }
    
    // 소프트 삭제 (실제로 삭제하지 않고 deletedAt 필드 설정)
    await prisma.post.update({
      where: { id: postId },
      data: { deletedAt: new Date() }
    });
    
    return NextResponse.json({
      success: true,
      message: '게시글이 성공적으로 삭제되었습니다.'
    });
    
  } catch (error) {
    console.error('게시글 삭제 오류:', error);
    return NextResponse.json({ 
      success: false, 
      error: { message: '게시글 삭제 중 오류가 발생했습니다.' }
    }, { status: 500 });
  }
}