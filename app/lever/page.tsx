"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MessageSquare, ExternalLink, Phone, Mail, Clock, Shield, Heart } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { RainbowGradient } from "@/components/rainbow-gradient"
import { RainbowText } from "@/components/rainbow-text"
import { motion } from "framer-motion"

export default function LeverPage() {
  const handleKakaoTalk = () => {
    // 카카오톡 상담 연결 (실제 구현 시 띵동의 카카오톡 채널 ID 사용)
    window.open("https://pf.kakao.com/_xdxoTxj", "_blank") // 예시 URL
  }

  const handleWebsiteVisit = () => {
    // 띵동 웹사이트로 이동
    window.open("https://ddingdong.kr", "_blank") // 실제 띵동 웹사이트 URL
  }

  const handlePhoneCall = () => {
    // 전화 상담 연결
    window.location.href = "tel:02-1234-5678" // 실제 띵동 전화번호
  }

  const handleEmailContact = () => {
    // 이메일 상담 연결
    window.location.href = "mailto:help@ddingdong.kr" // 실제 띵동 이메일
  }

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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                <RainbowText>🎯 레버를 당겨보세요!</RainbowText>
              </h1>
              <p className="text-lg text-[#555555] max-w-2xl mx-auto mb-8">
                혼자서 고민하지 마세요. 전문가들이 여러분의 이야기를 들을 준비가 되어 있어요.
                <br />
                <span className="font-medium text-[#FF71CE]">띵동</span>과 함께 안전하고 따뜻한 대화를 나눠보세요.
              </p>
            </motion.div>
          </div>

          {/* 띵동 소개 섹션 */}
          <motion.div
            className="max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="rounded-[20px] shadow-lg border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-[#FF71CE]/10 via-[#FFF152]/10 to-[#01CDFE]/10 p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4">
                      <RainbowText>띵동이 뭐예요?</RainbowText>
                    </h2>
                    <p className="text-[#555555] mb-4">
                      띵동은 청소년 성소수자를 위한 전문 상담 및 지원 단체입니다. 2015년부터 청소년들의 고민을 함께
                      나누고, 안전한 공간을 제공해왔어요.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center text-[#01CDFE]">
                        <Shield className="h-4 w-4 mr-2" />
                        <span>비밀 보장</span>
                      </div>
                      <div className="flex items-center text-[#FF71CE]">
                        <Heart className="h-4 w-4 mr-2" />
                        <span>전문 상담사</span>
                      </div>
                      <div className="flex items-center text-[#FFF152]">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>무료 상담</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-48 w-48 flex-shrink-0">
                    <Image
                      src="/korean-diverse-youth.png"
                      alt="띵동 소개"
                      fill
                      className="object-cover rounded-[15px]"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* 연결 방법 선택 */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              <RainbowText>어떤 방법으로 연결할까요?</RainbowText>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {/* 카카오톡 상담 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="rounded-[20px] shadow-lg border-0 hover:shadow-xl transition-all duration-300 h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-[#FEE500] flex items-center justify-center">
                      <MessageSquare className="h-8 w-8 text-[#3C1E1E]" />
                    </div>
                    <CardTitle className="text-xl">카카오톡 상담</CardTitle>
                    <CardDescription>편안하게 채팅으로 대화해요</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-[#555555] mb-4">
                      • 실시간 채팅 상담
                      <br />• 익명 가능
                      <br />• 평일 10:00-18:00
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full rounded-[15px] bg-[#FEE500] hover:bg-[#FEE500]/90 text-[#3C1E1E] font-medium"
                      onClick={handleKakaoTalk}
                    >
                      카카오톡으로 상담하기
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* 웹사이트 방문 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="rounded-[20px] shadow-lg border-0 hover:shadow-xl transition-all duration-300 h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-[#01CDFE] flex items-center justify-center">
                      <ExternalLink className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">띵동 웹사이트</CardTitle>
                    <CardDescription>더 많은 정보와 자료를 확인해요</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-[#555555] mb-4">
                      • 상담 신청 폼<br />• 다양한 자료실
                      <br />• 프로그램 안내
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full rounded-[15px] bg-[#01CDFE] hover:bg-[#01CDFE]/90 text-white"
                      onClick={handleWebsiteVisit}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      띵동 웹사이트 방문하기
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* 전화 상담 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="rounded-[20px] shadow-lg border-0 hover:shadow-xl transition-all duration-300 h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-[#FF71CE] flex items-center justify-center">
                      <Phone className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">전화 상담</CardTitle>
                    <CardDescription>목소리로 직접 대화해요</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-[#555555] mb-4">
                      • 1:1 전화 상담
                      <br />• 즉시 연결 가능
                      <br />• 평일 10:00-18:00
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full rounded-[15px] bg-[#FF71CE] hover:bg-[#FF71CE]/90 text-white"
                      onClick={handlePhoneCall}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      전화로 상담하기
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* 이메일 상담 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card className="rounded-[20px] shadow-lg border-0 hover:shadow-xl transition-all duration-300 h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-[#FFF152] flex items-center justify-center">
                      <Mail className="h-8 w-8 text-[#333333]" />
                    </div>
                    <CardTitle className="text-xl">이메일 상담</CardTitle>
                    <CardDescription>신중하게 글로 소통해요</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-[#555555] mb-4">
                      • 이메일 상담
                      <br />• 깊이 있는 대화
                      <br />• 24시간 접수
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full rounded-[15px] bg-[#FFF152] hover:bg-[#FFF152]/90 text-[#333333]"
                      onClick={handleEmailContact}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      이메일로 상담하기
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>

            {/* 안내 메시지 */}
            <motion.div
              className="bg-white rounded-[20px] shadow-lg p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h3 className="text-xl font-bold mb-4">
                <RainbowText>안전하고 따뜻한 공간</RainbowText>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[#555555]">
                <div>
                  <Shield className="h-8 w-8 text-[#01CDFE] mx-auto mb-2" />
                  <h4 className="font-medium mb-2">완전한 비밀보장</h4>
                  <p className="text-sm">모든 상담 내용은 철저히 비밀이 보장됩니다.</p>
                </div>
                <div>
                  <Heart className="h-8 w-8 text-[#FF71CE] mx-auto mb-2" />
                  <h4 className="font-medium mb-2">전문 상담사</h4>
                  <p className="text-sm">성소수자 청소년 상담 전문가가 함께합니다.</p>
                </div>
                <div>
                  <Clock className="h-8 w-8 text-[#FFF152] mx-auto mb-2" />
                  <h4 className="font-medium mb-2">무료 서비스</h4>
                  <p className="text-sm">모든 상담 서비스는 무료로 제공됩니다.</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-[#FFF5F9] rounded-[15px]">
                <p className="text-[#FF71CE] text-sm">
                  <strong>긴급상황이라면?</strong>
                  <br />
                  청소년 상담전화 1388 또는 자살예방 상담전화 1393으로 즉시 연락하세요.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
            <div className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Rainbow Buddy 로고" width={100} height={35} className="h-8 w-auto" />
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
