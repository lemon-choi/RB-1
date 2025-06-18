import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticate } from '@/lib/auth';
import { z } from 'zod';

// 용어 수정 요청 검증 스키마
const updateTermSchema = z.object({
  title: z.string().min(1, { message: '용어명을 입력해주세요.' }).optional(),
  titleEn: z.string().optional(),
  description: z.string().min(1, { message: '설명을 입력해주세요.' }).optional(),
  example: z.string().optional(),
  categoryId: z.number().optional(),
  isFeatured: z.boolean().optional(),
  imageUrl: z.string().optional(),
  relatedTerms: z.array(z.string()).optional(),
});

// 용어 상세 조회 (GET)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const termId = params.id;
    
    // 용어 조회
    const term = await prisma.dictionaryTerm.findUnique({
      where: { id: termId },
      include: {
        category: true
      }
    });
    
    if (!term) {
      return NextResponse.json({ 
        success: false, 
        error: { message: '용어를 찾을 수 없습니다.' }
      }, { status: 404 });
    }
    
    // 관련 용어 조회
    let relatedTermsData = [];
    if (term.relatedTerms && term.relatedTerms.length > 0) {
      relatedTermsData = await prisma.dictionaryTerm.findMany({
        where: {
          id: { in: term.relatedTerms as string[] }
        },
        select: {
          id: true,
          title: true,
          categoryId: true,
          category: true
        }
      });
    }
    
    return NextResponse.json({
      success: true,
      data: {
        ...term,
        relatedTermsData
      }
    });
    
  } catch (error) {
    console.error('용어 상세 조회 오류:', error);
    return NextResponse.json({ 
      success: false, 
      error: { message: '용어 조회 중 오류가 발생했습니다.' }
    }, { status: 500 });
  }
}

// 용어 수정 (PATCH) - 관리자만 가능
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
    
    // 관리자 권한 확인
    const user = await prisma.user.findUnique({
      where: { id: authResult.id as string },
      select: { role: true }
    });
    
    if (user?.role !== 'admin' && user?.role !== 'counselor') {
      return NextResponse.json({ 
        success: false, 
        error: { message: '용어를 수정할 권한이 없습니다.' }
      }, { status: 403 });
    }
    
    const termId = params.id;
    
    // 용어 존재 확인
    const term = await prisma.dictionaryTerm.findUnique({
      where: { id: termId }
    });
    
    if (!term) {
      return NextResponse.json({ 
        success: false, 
        error: { message: '용어를 찾을 수 없습니다.' }
      }, { status: 404 });
    }
    
    // 요청 본문 파싱
    const body = await request.json();
    
    // 데이터 유효성 검증
    const result = updateTermSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ 
        success: false, 
        error: { 
          message: '입력 데이터가 유효하지 않습니다.',
          details: result.error.format() 
        }
      }, { status: 400 });
    }
    
    // 용어 수정
    const updatedTerm = await prisma.dictionaryTerm.update({
      where: { id: termId },
      data: {
        ...result.data,
        updatedAt: new Date()
      },
      include: {
        category: true
      }
    });
    
    return NextResponse.json({
      success: true,
      data: updatedTerm
    });
    
  } catch (error) {
    console.error('용어 수정 오류:', error);
    return NextResponse.json({ 
      success: false, 
      error: { message: '용어 수정 중 오류가 발생했습니다.' }
    }, { status: 500 });
  }
}

// 용어 삭제 (DELETE) - 관리자만 가능
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
    
    // 관리자 권한 확인
    const user = await prisma.user.findUnique({
      where: { id: authResult.id as string },
      select: { role: true }
    });
    
    if (user?.role !== 'admin') {
      return NextResponse.json({ 
        success: false, 
        error: { message: '용어를 삭제할 권한이 없습니다.' }
      }, { status: 403 });
    }
    
    const termId = params.id;
    
    // 용어 존재 확인
    const term = await prisma.dictionaryTerm.findUnique({
      where: { id: termId }
    });
    
    if (!term) {
      return NextResponse.json({ 
        success: false, 
        error: { message: '용어를 찾을 수 없습니다.' }
      }, { status: 404 });
    }
    
    // 용어 삭제
    await prisma.dictionaryTerm.delete({
      where: { id: termId }
    });
    
    return NextResponse.json({
      success: true,
      message: '용어가 성공적으로 삭제되었습니다.'
    });
    
  } catch (error) {
    console.error('용어 삭제 오류:', error);
    return NextResponse.json({ 
      success: false, 
      error: { message: '용어 삭제 중 오류가 발생했습니다.' }
    }, { status: 500 });
  }
}