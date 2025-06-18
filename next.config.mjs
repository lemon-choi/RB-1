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
  env: {
    DATABASE_URL: "postgresql://postgres:1234@localhost:5432/rainbow_buddy",
    JWT_SECRET: "your-secret-key-should-be-changed-in-production",
    JWT_EXPIRES_IN: "7d"
  }
}

export default nextConfig
