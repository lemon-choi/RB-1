"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, User, Key, Mail, Eye, EyeOff } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { RainbowText } from "@/components/rainbow-text"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
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
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || "회원가입에 실패했습니다.")
      }

      // 회원가입 성공 처리
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
                  <RainbowText>회원가입</RainbowText>
                </CardTitle>
                <CardDescription>
                  Rainbow Buddy에 가입하고 다양한 기능을 이용해보세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">사용자 이름</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="사용자 이름"
                        className="pl-10 rounded-xl"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        minLength={3}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
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
                        minLength={8}
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
                    <p className="text-xs text-gray-500">비밀번호는 최소 8자 이상이어야 합니다</p>
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button
                    type="submit"
                    className="w-full rounded-xl bg-[#A091E6] hover:bg-[#8A7DD1] text-white shadow-sm"
                    disabled={isLoading}
                  >
                    {isLoading ? "가입 중..." : "회원가입"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <div className="text-sm text-center">
                  <span className="text-gray-600">이미 계정이 있으신가요? </span>
                  <Link href="/login" className="text-[#A091E6] hover:underline">
                    로그인
                  </Link>
                </div>
                <div className="pt-2 border-t border-gray-100 mt-2 text-xs text-gray-500 text-center">
                  관리자 계정은 <Link href="/login/admin" className="text-gray-600 hover:underline">관리자 로그인 페이지</Link>에서 생성할 수 있습니다.
                </div>
              </CardFooter>
            </Card>

            <div className="mt-8 bg-white rounded-3xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">개인정보 보호</h2>
              <p className="text-gray-600 text-sm">
                Rainbow Buddy는 여러분의 개인정보를 소중히 여깁니다. 여러분이 제공한 정보는 서비스 이용을 위해서만
                사용되며, 여러분의 동의 없이 제3자에게 제공되지 않습니다. 저희는 가능한 한 최소한의 정보만을
                수집하고 있으며, 모든 데이터는 암호화되어 저장됩니다.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}