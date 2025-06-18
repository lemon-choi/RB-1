"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, User, Key, Eye, EyeOff, ShieldAlert } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { RainbowText } from "@/components/rainbow-text"

export default function AdminLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "admin@rainbowbuddy.kr",
    password: "admin12345",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || "로그인에 실패했습니다.")
      }

      // 관리자 계정인지 확인
      if (data.data.user.role !== 'admin') {
        throw new Error("관리자 계정이 아닙니다.")
      }

      // 로그인 성공 처리
      localStorage.setItem("token", data.data.token)
      localStorage.setItem("user", JSON.stringify(data.data.user))
      
      // 게시판 관리 페이지로 리다이렉트
      router.push("/board/manage")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateAdmin = async () => {
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/admin-seed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (!response.ok && !data.message.includes("이미 존재")) {
        throw new Error(data.error?.message || "관리자 계정 생성에 실패했습니다.")
      }

      alert(data.message || "관리자 계정이 생성되었습니다. 이제 로그인할 수 있습니다.")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FEF9F2]">
      <MainNav />

      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-start mb-8">
            <Link href="/login">
              <Button variant="ghost" className="flex items-center text-gray-600">
                <ArrowLeft className="mr-2 h-4 w-4" />
                일반 로그인으로 돌아가기
              </Button>
            </Link>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="rounded-3xl shadow-md border-gray-200 bg-orange-50 border-orange-100">
              <CardHeader className="space-y-1 text-center">
                <div className="flex justify-center">
                  <ShieldAlert className="h-12 w-12 text-orange-500 mb-2" />
                </div>
                <CardTitle className="text-2xl font-bold">
                  <RainbowText>관리자 로그인</RainbowText>
                </CardTitle>
                <CardDescription>
                  관리자 권한으로 접속합니다
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="admin@rainbowbuddy.kr"
                        className="pl-10 rounded-xl"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">비밀번호</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 rounded-xl"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-2.5"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button
                    type="submit"
                    className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-sm"
                    disabled={isLoading}
                  >
                    {isLoading ? "로그인 중..." : "관리자로 로그인"}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-orange-100">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">관리자 계정이 없나요?</h3>
                  <Button
                    type="button"
                    className="w-full rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800"
                    onClick={handleCreateAdmin}
                    disabled={isLoading}
                  >
                    관리자 계정 생성하기
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    기본 관리자 계정: admin@rainbowbuddy.kr / admin12345
                  </p>
                </div>
              </CardContent>
              <CardFooter className="bg-orange-100 rounded-b-3xl">
                <div className="text-sm text-center w-full text-orange-800">
                  이 페이지는 관리자 전용 페이지입니다. 일반 사용자는{" "}
                  <Link href="/login" className="text-orange-600 hover:underline font-medium">
                    일반 로그인
                  </Link>
                  을 이용해주세요.
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}