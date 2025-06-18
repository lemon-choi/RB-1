"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ArrowLeft, MessageSquare, Phone, Video, Calendar, Clock, CheckCircle } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { RainbowGradient } from "@/components/rainbow-gradient"
import { RainbowText } from "@/components/rainbow-text"
import { motion } from "framer-motion"

export default function CounselingPage() {
  const [step, setStep] = useState(1)
  const [selectedCounselor, setSelectedCounselor] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    contactMethod: "chat",
    preferredDate: "",
    preferredTime: "",
    concern: "",
    urgency: "normal",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(step + 1)
  }

  const handleCounselorSelect = (id: number) => {
    setSelectedCounselor(id)
    setTimeout(() => setStep(3), 500)
  }

  const counselors = [
    {
      id: 1,
      name: "김상담",
      specialty: "성 정체성, 커밍아웃",
      image: "/female-counselor-illustration.png",
      available: true,
    },
    {
      id: 2,
      name: "이지원",
      specialty: "가족 관계, 학교 생활",
      image: "/placeholder-o00ee.png",
      available: true,
    },
    {
      id: 3,
      name: "박도움",
      specialty: "또래 관계, 자존감",
      image: "/young-female-counselor.png",
      available: false,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFFFF]">
      <MainNav />
      <RainbowGradient className="opacity-20" />

      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <Link href="/">
              <Button variant="ghost" className="flex items-center text-[#555555] hover:text-[#333333]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                홈으로 돌아가기
              </Button>
            </Link>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              <RainbowText>띵동 상담 연결</RainbowText>
            </h1>
            <p className="mt-4 text-lg text-[#555555] max-w-2xl mx-auto">
              전문 상담사와 연결하여 안전하고 비밀이 보장되는 상담을 받아보세요. 여러분의 이야기를 들을 준비가 되어
              있습니다.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="flex justify-between">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 1 ? "bg-[#01CDFE] text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  1
                </div>
                <span className="text-sm mt-2">정보 입력</span>
              </div>
              <div className="flex-1 flex items-center">
                <div className={`h-1 w-full ${step >= 2 ? "bg-[#01CDFE]" : "bg-gray-200"}`}></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 2 ? "bg-[#01CDFE] text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  2
                </div>
                <span className="text-sm mt-2">상담사 선택</span>
              </div>
              <div className="flex-1 flex items-center">
                <div className={`h-1 w-full ${step >= 3 ? "bg-[#01CDFE]" : "bg-gray-200"}`}></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 3 ? "bg-[#01CDFE] text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  3
                </div>
                <span className="text-sm mt-2">예약 완료</span>
              </div>
            </div>
          </div>

          {/* Step 1: Information Form */}
          {step === 1 && (
            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="rounded-[10px] shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    <RainbowText>상담 정보 입력</RainbowText>
                  </CardTitle>
                  <CardDescription className="text-[#777777]">
                    안전한 상담을 위해 필요한 정보를 입력해주세요.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-[#555555]">
                          이름 (닉네임)
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="실명 또는 닉네임"
                          className="rounded-xl border-gray-200 focus:border-[#01CDFE] focus:ring-[#01CDFE]"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="age" className="text-sm font-medium text-[#555555]">
                          나이
                        </label>
                        <Input
                          id="age"
                          name="age"
                          type="number"
                          value={formData.age}
                          onChange={handleInputChange}
                          placeholder="나이"
                          className="rounded-xl border-gray-200 focus:border-[#01CDFE] focus:ring-[#01CDFE]"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#555555]">선호하는 상담 방식</label>
                      <div className="grid grid-cols-3 gap-4">
                        <div
                          className={`p-4 border rounded-xl text-center cursor-pointer transition-all ${
                            formData.contactMethod === "chat"
                              ? "border-[#01CDFE] bg-[#F0FCFF]"
                              : "border-gray-200 hover:border-[#01CDFE]"
                          }`}
                          onClick={() => setFormData((prev) => ({ ...prev, contactMethod: "chat" }))}
                        >
                          <MessageSquare className="h-6 w-6 mx-auto mb-2 text-[#01CDFE]" />
                          <span className="font-medium">채팅 상담</span>
                        </div>
                        <div
                          className={`p-4 border rounded-xl text-center cursor-pointer transition-all ${
                            formData.contactMethod === "video"
                              ? "border-[#01CDFE] bg-[#F0FCFF]"
                              : "border-gray-200 hover:border-[#01CDFE]"
                          }`}
                          onClick={() => setFormData((prev) => ({ ...prev, contactMethod: "video" }))}
                        >
                          <Video className="h-6 w-6 mx-auto mb-2 text-[#01CDFE]" />
                          <span className="font-medium">화상 상담</span>
                        </div>
                        <div
                          className={`p-4 border rounded-xl text-center cursor-pointer transition-all ${
                            formData.contactMethod === "phone"
                              ? "border-[#01CDFE] bg-[#F0FCFF]"
                              : "border-gray-200 hover:border-[#01CDFE]"
                          }`}
                          onClick={() => setFormData((prev) => ({ ...prev, contactMethod: "phone" }))}
                        >
                          <Phone className="h-6 w-6 mx-auto mb-2 text-[#01CDFE]" />
                          <span className="font-medium">전화 상담</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="preferredDate" className="text-sm font-medium text-[#555555]">
                          선호 날짜
                        </label>
                        <div className="relative">
                          <Calendar
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#777777]"
                            size={16}
                          />
                          <Input
                            id="preferredDate"
                            name="preferredDate"
                            type="date"
                            value={formData.preferredDate}
                            onChange={handleInputChange}
                            className="pl-10 rounded-xl border-gray-200 focus:border-[#01CDFE] focus:ring-[#01CDFE]"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="preferredTime" className="text-sm font-medium text-[#555555]">
                          선호 시간
                        </label>
                        <div className="relative">
                          <Clock
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#777777]"
                            size={16}
                          />
                          <Input
                            id="preferredTime"
                            name="preferredTime"
                            type="time"
                            value={formData.preferredTime}
                            onChange={handleInputChange}
                            className="pl-10 rounded-xl border-gray-200 focus:border-[#01CDFE] focus:ring-[#01CDFE]"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="concern" className="text-sm font-medium text-[#555555]">
                        상담 내용 (간략히)
                      </label>
                      <Textarea
                        id="concern"
                        name="concern"
                        value={formData.concern}
                        onChange={handleInputChange}
                        placeholder="어떤 이야기를 나누고 싶으신가요? (선택사항)"
                        className="rounded-xl border-gray-200 focus:border-[#01CDFE] focus:ring-[#01CDFE]"
                        rows={4}
                      />
                      <p className="text-xs text-[#777777]">
                        * 상담 내용은 상담사가 준비하는 데 도움이 됩니다. 편안하게 작성해주세요.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#555555]">상담 긴급도</label>
                      <div className="grid grid-cols-3 gap-4">
                        <div
                          className={`p-3 border rounded-xl text-center cursor-pointer transition-all ${
                            formData.urgency === "low"
                              ? "border-[#01CDFE] bg-[#F0FCFF]"
                              : "border-gray-200 hover:border-[#01CDFE]"
                          }`}
                          onClick={() => setFormData((prev) => ({ ...prev, urgency: "low" }))}
                        >
                          <span className="font-medium">여유있음</span>
                          <p className="text-xs text-[#777777] mt-1">1-2주 내</p>
                        </div>
                        <div
                          className={`p-3 border rounded-xl text-center cursor-pointer transition-all ${
                            formData.urgency === "normal"
                              ? "border-[#01CDFE] bg-[#F0FCFF]"
                              : "border-gray-200 hover:border-[#01CDFE]"
                          }`}
                          onClick={() => setFormData((prev) => ({ ...prev, urgency: "normal" }))}
                        >
                          <span className="font-medium">보통</span>
                          <p className="text-xs text-[#777777] mt-1">이번 주 내</p>
                        </div>
                        <div
                          className={`p-3 border rounded-xl text-center cursor-pointer transition-all ${
                            formData.urgency === "high"
                              ? "border-[#01CDFE] bg-[#F0FCFF]"
                              : "border-gray-200 hover:border-[#01CDFE]"
                          }`}
                          onClick={() => setFormData((prev) => ({ ...prev, urgency: "high" }))}
                        >
                          <span className="font-medium">긴급</span>
                          <p className="text-xs text-[#777777] mt-1">가능한 빨리</p>
                        </div>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    className="rounded-[10px] bg-[#39393D] hover:bg-[#39393D]/90 text-white shadow-md transition-all duration-300"
                    onClick={handleSubmit}
                  >
                    다음 단계
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Counselor Selection */}
          {step === 2 && (
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="rounded-[10px] shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    <RainbowText>상담사 선택</RainbowText>
                  </CardTitle>
                  <CardDescription className="text-[#777777]">
                    전문 분야와 일정을 고려하여 상담사를 선택해주세요.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {counselors.map((counselor) => (
                      <motion.div
                        key={counselor.id}
                        whileHover={{ y: -5 }}
                        className={`
                          border rounded-[10px] overflow-hidden transition-all duration-300
                          ${selectedCounselor === counselor.id ? "border-[#01CDFE] shadow-lg" : "border-gray-200"}
                          ${!counselor.available && "opacity-60"}
                        `}
                      >
                        <div className="relative h-48 w-full bg-[#F0FCFF]">
                          <Image
                            src={counselor.image || "/placeholder.svg"}
                            alt={counselor.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-[#333333]">{counselor.name} 상담사</h3>
                          <p className="text-sm text-[#777777] mb-3">{counselor.specialty}</p>
                          <Button
                            className={`w-full rounded-[10px] ${
                              counselor.available
                                ? "bg-[#39393D] hover:bg-[#39393D]/90 text-white"
                                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                            }`}
                            onClick={() => counselor.available && handleCounselorSelect(counselor.id)}
                            disabled={!counselor.available}
                          >
                            {counselor.available ? "선택하기" : "예약 불가"}
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    className="rounded-[10px] border-[#01CDFE] text-[#01CDFE] hover:bg-[#F0FCFF]"
                    onClick={() => setStep(1)}
                  >
                    이전 단계
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="rounded-[10px] shadow-lg border-0">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-[#F0FCFF] flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-[#01CDFE]" />
                  </div>
                  <CardTitle className="text-2xl">
                    <RainbowText>상담 예약이 완료되었습니다</RainbowText>
                  </CardTitle>
                  <CardDescription className="text-[#777777]">
                    상담 일정이 확정되면 입력하신 연락처로 안내 메시지가 발송됩니다.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-[#F0FCFF] rounded-[10px] p-6 mb-6">
                    <h3 className="font-semibold text-[#333333] mb-4">예약 정보</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-[#777777]">상담사</span>
                        <span className="font-medium text-[#333333]">
                          {selectedCounselor && counselors.find((c) => c.id === selectedCounselor)?.name} 상담사
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#777777]">상담 방식</span>
                        <span className="font-medium text-[#333333]">
                          {formData.contactMethod === "chat" && "채팅 상담"}
                          {formData.contactMethod === "video" && "화상 상담"}
                          {formData.contactMethod === "phone" && "전화 상담"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#777777]">희망 일시</span>
                        <span className="font-medium text-[#333333]">
                          {formData.preferredDate} {formData.preferredTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-[#555555]">
                    <p className="mb-2">궁금한 점이 있으신가요?</p>
                    <p className="text-sm text-[#777777]">
                      문의사항은 <span className="text-[#01CDFE]">help@rainbowbuddy.kr</span>로 연락주세요.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button
                    className="rounded-[10px] bg-[#39393D] hover:bg-[#39393D]/90 text-white shadow-md transition-all duration-300"
                    asChild
                  >
                    <Link href="/">홈으로 돌아가기</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {/* Information Section */}
          {step < 3 && (
            <div className="mt-12 max-w-3xl mx-auto bg-white rounded-[10px] shadow-lg p-8">
              <h2 className="text-xl font-bold mb-4">
                <RainbowText>상담 서비스 안내</RainbowText>
              </h2>
              <div className="space-y-4 text-[#555555]">
                <p>
                  <span className="font-medium">안전한 공간:</span> 모든 상담은 비밀이 보장되며, 안전한 환경에서
                  진행됩니다.
                </p>
                <p>
                  <span className="font-medium">전문 상담사:</span> 성소수자 청소년 상담 경험이 풍부한 전문 상담사들이
                  여러분의 이야기를 경청합니다.
                </p>
                <p>
                  <span className="font-medium">무료 서비스:</span> 모든 상담은 무료로 제공됩니다. 필요한 경우 추가 지원
                  서비스도 연결해 드립니다.
                </p>
              </div>
              <div className="mt-6 p-4 bg-[#FFF5F9] rounded-[10px]">
                <p className="text-[#FF71CE] text-sm">
                  긴급한 위기 상황이라면 청소년 상담 1388, 자살예방 핫라인 1393으로 즉시 연락하세요.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
            <div className="flex items-center space-x-2">
              <Image src="/logo.png" alt="레버 로고" width={100} height={35} className="h-8 w-auto" />
            </div>
            <div className="text-sm text-[#777777]">© 2023 Rainbow Buddy. All rights reserved.</div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-[#777777] hover:text-[#39393D]">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="text-[#777777] hover:text-[#39393D]">
                이용약관
              </Link>
              <Link href="/contact" className="text-[#777777] hover:text-[#39393D]">
                문의하기
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 h-1 w-full bg-gradient-to-r from-[#FF71CE] via-[#FFF152] via-[#00F5A0] via-[#7FD8FF] to-[#FF9D00]"></div>
      </footer>
    </div>
  )
}
