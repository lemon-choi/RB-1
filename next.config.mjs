/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // 빌드 성능 최적화
    optimizeCss: false,
    // 메모리 사용량 최적화
    workerThreads: false,
  },
  // 빌드 최적화
  swcMinify: true,
  // 정적 최적화 설정
  output: 'standalone',
  env: {
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:1234@localhost:5432/rainbow_buddy",
    JWT_SECRET: process.env.JWT_SECRET || "your-secret-key-should-be-changed-in-production",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d"
  }
}

export default nextConfig
