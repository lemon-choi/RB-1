import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, signJwtToken } from '@/lib/auth';
import { z } from 'zod';

// 로그인 요청 검증 스키마
const loginSchema = z.object({
  email: z.string().email({ message: '유효한 이메일 주소를 입력해주세요.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
});

// POST 핸들러 (로그인)
export async function POST(request: NextRequest) {
  try {
    // 요청 본문 파싱
    const body = await request.json();
    
    // 데이터 유효성 검증
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ 
        success: false, 
        error: { 
          message: '입력 데이터가 유효하지 않습니다.',
          details: result.error.format() 
        }
      }, { status: 400 });
    }

    const { email, password } = result.data;

    // 사용자 조회
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        passwordHash: true,
        role: true,
        createdAt: true,
        deletedAt: true
      }
    });

    // 사용자가 존재하지 않거나 삭제된 사용자인 경우
    if (!user || user.deletedAt) {
      return NextResponse.json({ 
        success: false, 
        error: { message: '이메일 또는 비밀번호가 올바르지 않습니다.' }
      }, { status: 401 });
    }

    // 비밀번호 검증
    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json({ 
        success: false, 
        error: { message: '이메일 또는 비밀번호가 올바르지 않습니다.' }
      }, { status: 401 });
    }

    // 응답에서 비밀번호 해시 제거
    const { passwordHash, ...userWithoutPassword } = user;

    // JWT 토큰 생성
    const token = await signJwtToken({ 
      id: user.id, 
      email: user.email, 
      role: user.role 
    });

    // 응답 반환
    return NextResponse.json({ 
      success: true, 
      data: { 
        user: userWithoutPassword,
        token 
      }
    });
    
  } catch (error) {
    console.error('로그인 오류:', error);
    return NextResponse.json({ 
      success: false, 
      error: { message: '로그인 처리 중 오류가 발생했습니다.' }
    }, { status: 500 });
  }
}