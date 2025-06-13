import { NextRequest, NextResponse } from 'next/server';

// 간소화된 비밀번호 해싱 (실제 프로덕션에서는 사용하지 마세요!)
export function hashPassword(password: string): string {
  return password; // 실제 해싱 없이 그대로 반환 (테스트용)
}

// 간소화된 비밀번호 검증
export function verifyPassword(password: string, hashedPassword: string): boolean {
  return password === hashedPassword; // 단순 비교 (테스트용)
}

// 간소화된 JWT 토큰 생성 (실제 암호화 없음, 테스트용)
export function signJwtToken(payload: any): string {
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

// 간소화된 JWT 토큰 검증
export function verifyJwtToken(token: string): any {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
    return payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// 인증 미들웨어
export async function authenticate(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return new NextResponse(
        JSON.stringify({ success: false, error: { message: 'Authentication required' } }),
        { status: 401 }
      );
    }

    const payload = verifyJwtToken(token);
    return payload;
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ success: false, error: { message: 'Invalid token' } }),
      { status: 401 }
    );
  }
}