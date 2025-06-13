import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, signJwtToken } from '@/lib/auth';
import { z } from 'zod';

// 회원가입 요청 검증 스키마
const registerSchema = z.object({
  email: z.string().email({ message: '유효한 이메일 주소를 입력해주세요.' }),
  password: z.string().min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
  username: z.string().min(3, { message: '사용자 이름은 최소 3자 이상이어야 합니다.' }),
});

// POST 핸들러 (회원가입)
export async function POST(request: NextRequest) {
  try {
    // 요청 본문 파싱
    const body = await request.json();
    
    // 데이터 유효성 검증
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ 
        success: false, 
        error: { 
          message: '입력 데이터가 유효하지 않습니다.',
          details: result.error.format() 
        }
      }, { status: 400 });
    }

    const { email, password, username } = result.data;

    // 이메일 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ 
        success: false, 
        error: { message: '이미 사용 중인 이메일입니다.' }
      }, { status: 400 });
    }

    // 사용자 이름 중복 확인
    const existingUsername = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUsername) {
      return NextResponse.json({ 
        success: false, 
        error: { message: '이미 사용 중인 사용자 이름입니다.' }
      }, { status: 400 });
    }

    // 비밀번호 해싱
    const passwordHash = await hashPassword(password);

    // 사용자 생성
    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash,
        username,
        profile: {
          create: {} // 기본 프로필 생성
        }
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true
      }
    });

    // JWT 토큰 생성
    const token = await signJwtToken({ 
      id: newUser.id, 
      email: newUser.email, 
      role: newUser.role 
    });

    // 응답 반환
    return NextResponse.json({ 
      success: true, 
      data: { 
        user: newUser,
        token 
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('회원가입 오류:', error);
    return NextResponse.json({ 
      success: false, 
      error: { message: '회원가입 처리 중 오류가 발생했습니다.' }
    }, { status: 500 });
  }
}