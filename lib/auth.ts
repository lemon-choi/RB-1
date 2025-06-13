import { NextRequest, NextResponse } from 'next/server';
import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import bcrypt from 'bcrypt';

// 비밀번호 해싱
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

// 비밀번호 검증
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// JWT 토큰 생성
export async function signJwtToken(payload: any): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN || '7d')
    .sign(secret);
}

// JWT 토큰 검증
export async function verifyJwtToken(token: string): Promise<JWTPayload> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
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

    const payload = await verifyJwtToken(token);
    return payload;
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ success: false, error: { message: 'Invalid token' } }),
      { status: 401 }
    );
  }
}