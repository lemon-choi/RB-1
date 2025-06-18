import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, signJwtToken } from '@/lib/auth';

export async function GET() {
  const results: any = {};

  try {
    // 0. Prisma URL 정보 확인
    const DATABASE_URL = "postgresql://postgres:1234@localhost:5432/rainbow_buddy";
    results.prismaConfig = {
      directUrl: DATABASE_URL,
      clientConfig: (prisma as any)._engineConfig?.datasources?.db?.url || 'URL not available'
    };

    // 1. 데이터베이스 연결 테스트
    results.dbConnection = { success: false, error: null };
    try {
      // 간단한 쿼리 실행
      const testQuery = await prisma.$queryRaw`SELECT 1 as result`;
      results.dbConnection.success = true;
      results.dbConnection.data = testQuery;
    } catch (error: any) {
      results.dbConnection.error = error.message;
    }
    
    // 2. 테이블 존재 여부 확인
    results.tables = { success: false, error: null };
    try {
      const tables = await prisma.$queryRaw`
        SELECT tablename FROM pg_tables WHERE schemaname = 'public'
      `;
      results.tables.success = true;
      results.tables.data = tables;
    } catch (error: any) {
      results.tables.error = error.message;
    }
    
    // 3. 비밀번호 해싱 테스트
    results.passwordHashing = { success: false, error: null };
    try {
      const hashedPassword = await hashPassword('test123');
      results.passwordHashing.success = true;
      results.passwordHashing.data = { hashed: hashedPassword.substring(0, 10) + '...' };
    } catch (error: any) {
      results.passwordHashing.error = error.message;
    }
    
    // 4. JWT 토큰 생성 테스트
    results.jwtGeneration = { success: false, error: null };
    try {
      const token = await signJwtToken({ test: true });
      results.jwtGeneration.success = true;
      results.jwtGeneration.data = { token: token.substring(0, 20) + '...' };
    } catch (error: any) {
      results.jwtGeneration.error = error.message;
    }
    
    // 5. 환경 변수 확인 (민감 정보 제외)
    results.env = {
      DATABASE_URL: process.env.DATABASE_URL ? '설정됨' : '설정되지 않음',
      JWT_SECRET: process.env.JWT_SECRET ? '설정됨' : '설정되지 않음',
      JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
      NODE_ENV: process.env.NODE_ENV
    };
    
    return NextResponse.json({
      success: true,
      message: '디버그 정보',
      data: results
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: { message: '디버깅 중 오류 발생', details: error.message }
    }, { status: 500 });
  }
}