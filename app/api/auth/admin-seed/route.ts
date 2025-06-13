import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

// 관리자 계정 생성 API
export async function POST(request: NextRequest) {
  try {
    // 기본 관리자 계정 정보
    const adminUser = {
      email: 'admin@rainbowbuddy.kr',
      username: 'admin',
      password: 'admin12345', // 실제 환경에서는 더 강력한 비밀번호 사용
      role: 'admin'
    };

    // 이미 존재하는 관리자 계정 확인
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminUser.email }
    });

    if (existingAdmin) {
      return NextResponse.json({ 
        success: false, 
        message: '관리자 계정이 이미 존재합니다.' 
      });
    }

    // 비밀번호 해싱
    const passwordHash = await hashPassword(adminUser.password);

    // 관리자 계정 생성
    const createdAdmin = await prisma.user.create({
      data: {
        email: adminUser.email,
        username: adminUser.username,
        passwordHash,
        role: 'admin',
        profile: {
          create: {
            nickname: '관리자',
          }
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

    return NextResponse.json({ 
      success: true, 
      message: '관리자 계정이 성공적으로 생성되었습니다.',
      data: createdAdmin
    }, { status: 201 });
    
  } catch (error) {
    console.error('관리자 계정 생성 오류:', error);
    return NextResponse.json({ 
      success: false, 
      error: { message: '관리자 계정 생성 중 오류가 발생했습니다.' }
    }, { status: 500 });
  }
}