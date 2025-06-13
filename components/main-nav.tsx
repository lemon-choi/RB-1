"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // 로그인 상태 확인
  useEffect(() => {
    // 로컬 스토리지에서 토큰 확인
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* 무지개 그라데이션 상단 바 */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF71CE] via-[#FFF152] via-[#00F5A0] via-[#7FD8FF] to-[#FF9D00]"></div>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Rainbow Buddy 로고" width={120} height={40} className="h-10 w-auto" />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-[#555555] hover:text-[#333333] transition-colors font-medium">
              홈
            </Link>
            <Link href="/dictionary" className="text-[#555555] hover:text-[#FFF152] transition-colors font-medium">
              용어사전
            </Link>
            <Link href="/identity-quiz" className="text-[#555555] hover:text-[#00F5A0] transition-colors font-medium">
              정체성 퀴즈
            </Link>
            <Link href="/board" className="text-[#555555] hover:text-[#7FD8FF] transition-colors font-medium">
              게시판
            </Link>
            <Button
              className="rounded-[10px] bg-[#39393D] hover:bg-[#39393D]/90 text-white shadow-sm transition-all duration-300"
              asChild
            >
              <Link href="/lever">🎯 레버당기기</Link>
            </Button>
            {isLoggedIn ? (
              <Button
                className="rounded-[10px] bg-[#A091E6] hover:bg-[#8A7DD1] text-white shadow-sm transition-all duration-300"
                asChild
              >
                <Link href="/profile">
                  <User className="h-4 w-4 mr-2" />
                  프로필
                </Link>
              </Button>
            ) : (
              <Button
                className="rounded-[10px] bg-[#A091E6] hover:bg-[#8A7DD1] text-white shadow-sm transition-all duration-300"
                asChild
              >
                <Link href="/login">
                  <User className="h-4 w-4 mr-2" />
                  로그인
                </Link>
              </Button>
            )}
          </nav>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 space-y-4 bg-white border-t border-gray-100">
              <Link href="/" className="block py-2 text-[#555555] hover:text-[#333333] font-medium">
                홈
              </Link>
              <Link href="/dictionary" className="block py-2 text-[#555555] hover:text-[#FFF152] font-medium">
                용어사전
              </Link>
              <Link href="/identity-quiz" className="block py-2 text-[#555555] hover:text-[#00F5A0] font-medium">
                정체성 퀴즈
              </Link>
              <Link href="/board" className="block py-2 text-[#555555] hover:text-[#7FD8FF] font-medium">
                게시판
              </Link>
              <Button className="w-full rounded-[10px] bg-[#39393D] hover:bg-[#39393D]/90 text-white shadow-sm" asChild>
                <Link href="/lever">🎯 레버당기기</Link>
              </Button>
              {isLoggedIn ? (
                <Button className="w-full rounded-[10px] bg-[#A091E6] hover:bg-[#8A7DD1] text-white shadow-sm" asChild>
                  <Link href="/profile" className="flex items-center justify-center">
                    <User className="h-4 w-4 mr-2" />
                    프로필
                  </Link>
                </Button>
              ) : (
                <Button className="w-full rounded-[10px] bg-[#A091E6] hover:bg-[#8A7DD1] text-white shadow-sm" asChild>
                  <Link href="/login" className="flex items-center justify-center">
                    <User className="h-4 w-4 mr-2" />
                    로그인
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
