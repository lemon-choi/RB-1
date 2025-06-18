import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 데이터베이스 연결 테스트
    const categories = await prisma.boardCategory.findMany();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: categories
    });
    
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      success: false, 
      error: { 
        message: 'Database connection failed',
        details: error
      }
    }, { status: 500 });
  }
}