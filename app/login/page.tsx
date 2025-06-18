"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, User, Key, Eye, EyeOff } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { RainbowText } from "@/components/rainbow-text"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

      // 로그인 성공 처리
      localStorage.setItem("token", data.data.token)
      localStorage.setItem("user", JSON.stringify(data.data.user))
      
      // 홈으로 리다이렉트
      router.push("/")
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
                  <RainbowText>로그인</RainbowText>
                </CardTitle>
                <CardDescription>
                  Rainbow Buddy에 오신 것을 환영합니다
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
                        placeholder="name@example.com"
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
                    className="w-full rounded-xl bg-[#A091E6] hover:bg-[#8A7DD1] text-white shadow-sm"
                    disabled={isLoading}
                  >
                    {isLoading ? "로그인 중..." : "로그인"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <div className="text-sm text-center">
                  <span className="text-gray-600">계정이 없으신가요? </span>
                  <Link href="/register" className="text-[#A091E6] hover:underline">
                    회원가입
                  </Link>
                </div>
                <div className="pt-2 border-t border-gray-100 mt-2">
                  <Link href="/login/admin">
                    <Button
                      variant="outline"
                      className="w-full text-gray-600 hover:text-gray-800 text-sm border-dashed"
                    >
                      관리자로 로그인
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>

            <div className="mt-8 bg-white rounded-3xl shadow-sm p-6 text-center">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">안전한 공간</h2>
              <p className="text-gray-600 text-sm">
                Rainbow Buddy는 청소년 성소수자와 앨라이들을 위한 안전한 공간입니다.
                여러분의 개인정보는 철저히 보호되며, 모든 활동은 익명으로 진행됩니다.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}