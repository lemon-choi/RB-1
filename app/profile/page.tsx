"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, LogOut } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { RainbowText } from "@/components/rainbow-text"

interface User {
  id: string
  username: string
  email: string
  role: string
  createdAt: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 가져오기
    const storedUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")

    if (!storedUser || !token) {
      // 로그인 페이지로 리다이렉트
      router.push("/login")
      return
    }

    try {
      setUser(JSON.parse(storedUser))
    } catch (error) {
      console.error("Failed to parse user data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    // 로컬 스토리지에서 사용자 정보와 토큰 삭제
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    
    // 홈으로 리다이렉트
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#FEF9F2]">
        <MainNav />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <p>로딩 중...</p>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FEF9F2]">
      <MainNav />

      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-start mb-8">
            <Link href="/">
              <Button variant="ghost" className="flex items-center text-gray-600">
                <ArrowLeft className="mr-2 h-4 w-4" />
                홈으로 돌아가기
              </Button>
            </Link>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="rounded-3xl shadow-md border-gray-200">
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">
                  <RainbowText>내 프로필</RainbowText>
                </CardTitle>
                <CardDescription>
                  안녕하세요, {user?.username}님!
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage 
                    src={`/abstract-avatar.png?key=8t0x6&height=96&width=96&query=abstract avatar ${user?.username}`} 
                  />
                  <AvatarFallback>{user?.username?.[0]}</AvatarFallback>
                </Avatar>

                <div className="space-y-3 w-full">
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <h3 className="text-sm font-medium text-gray-500">사용자 이름</h3>
                    <p className="text-gray-900">{user?.username}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <h3 className="text-sm font-medium text-gray-500">이메일</h3>
                    <p className="text-gray-900">{user?.email}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <h3 className="text-sm font-medium text-gray-500">역할</h3>
                    <p className="text-gray-900">{user?.role === 'admin' ? '관리자' : user?.role === 'counselor' ? '상담사' : '사용자'}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <h3 className="text-sm font-medium text-gray-500">가입일</h3>
                    <p className="text-gray-900">{new Date(user?.createdAt || "").toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleLogout}
                  className="w-full rounded-xl bg-red-500 hover:bg-red-600 text-white shadow-sm"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  로그아웃
                </Button>
              </CardFooter>
            </Card>

            <div className="mt-8 bg-white rounded-3xl shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">내 활동</h2>
              <div className="grid grid-cols-2 gap-4">
                <Button className="w-full rounded-xl bg-[#F7F5FC] text-[#A091E6] hover:bg-[#F0EDFA]" asChild>
                  <Link href="/board">내 게시글</Link>
                </Button>
                <Button className="w-full rounded-xl bg-[#F5F9FD] text-[#7EAED9] hover:bg-[#E6F3FA]" asChild>
                  <Link href="/garden">내 정원</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}