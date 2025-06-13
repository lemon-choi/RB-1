import { PrismaClient } from '@prisma/client';

// PostgreSQL 데이터베이스 사용
const DATABASE_URL = "postgresql://postgres:1234@localhost:5432/rainbow_buddy";

// PrismaClient는 전역 싱글톤으로 사용 (중복 인스턴스 방지)
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;