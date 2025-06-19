import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { FeatureCard } from "@/components/feature-card"
import { MainNav } from "@/components/main-nav"
import { RainbowGradient } from "@/components/rainbow-gradient"
import { RainbowText } from "@/components/rainbow-text"
import { HeroAnimation } from "@/components/hero-animation"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F4F4F4]">
      <MainNav />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <RainbowGradient className="opacity-20" />

        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="flex flex-col space-y-6 max-w-4xl">
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                  <RainbowText>Rainbow Buddy</RainbowText>
                </h1>
                <h2 className="mt-4 text-2xl md:text-3xl font-medium text-[#333333]">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF71CE] to-[#FF9D00]">
                    나를 더 알아가는 공간
                  </span>
                </h2>
                <div className="flex justify-center mt-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-white/80">
                    <HeroAnimation />
                  </div>
                </div>
              </div>
              <p className="text-lg text-[#555555] max-w-xl mx-auto">
                내가 혹시 성소수자인지 고민하고 있나요? 안전하고 정확한 정보로 청소년 여러분의 정체성 탐색을 도와드립니다.
                <br/> Rainbow Buddy에서 다양한 성 정체성과 지향성을 탐색하고, 자신만의 이야기를 만들어가 보세요!
              </p>
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center">
                <Button
                  size="lg"
                  className="rounded-[10px] bg-[#39393D] hover:bg-[#39393D]/90 text-white shadow-md transition-all duration-300"
                  asChild
                >
                  <Link href="/identity-quiz">정체성 테스트 시작하기</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-[10px] border-[#39393D] text-[#39393D] hover:bg-[#39393D]/5 transition-all duration-300"
                  asChild
                >
                  <Link href="/about">더 알아보기</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              <RainbowText>주요 기능</RainbowText>
            </h2>
            <p className="mt-4 text-lg text-[#555555] max-w-2xl mx-auto">
              Rainbow Buddy는 청소년들이 안전하게 자신의 성 정체성과 지향성을 탐색하고 띵동 서비스와 연결될 수 있는 디지털 안전
              공간입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              icon="book"
              title="용어사전"
              description="LGBTQ+ 관련 용어를 쉽고 친절하게 알아보고 이해의 폭을 넓혀보세요"
              href="/dictionary"
              color="yellow"
            />
            <FeatureCard
              icon="gamepad"
              title="정체성 테스트"
              description="MBTI 스타일의 퀴즈로 나의 성 정체성과 성적 지향에 대해 탐색해보세요"
              href="/identity-quiz"
              color="green"
            />
            <FeatureCard
              icon="message-square"
              title="정보 게시판"
              description="다양한 정체성과 관련된 유용한 정보와 경험을 살펴보세요"
              href="/board"
              color="orange"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#F4F4F4] py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-[10px] bg-white p-12 shadow-xl border border-gray-100">
            <div className="text-center">
              <h3 className="text-2xl font-bold">
                <RainbowText>지금 바로 시작해보세요</RainbowText>
              </h3>
              <p className="mt-4 text-lg text-[#555555]">
                Rainbow Buddy와 함께 안전하게 자신을 탐색하고 띵동 서비스와 연결되어 전문적인 도움을 받을 수 있습니다.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="rounded-[10px] bg-[#39393D] hover:bg-[#39393D]/90 text-white shadow-md transition-all duration-300"
                  asChild
                >
                  <Link href="/identity-quiz" className="flex items-center">
                    정체성 테스트 시작하기 <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  className="rounded-[10px] bg-[#39393D] hover:bg-[#39393D]/90 text-white shadow-md transition-all duration-300"
                  asChild
                >
                  <Link href="/lever" className="flex items-center">
                    🎯 레버당기기 <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              <RainbowText>"부드러운 발견, 강요 없는 탐색"</RainbowText>
            </h2>
            <p className="mt-6 text-lg text-[#555555]">
              Rainbow Buddy는 성 정체성과 지향성에 대해 고민하는 청소년들이 자신의 정체성을 안전하게 탐색하고, 필요할 때 전문적인 도움을 받을 수
              있도록 설계되었습니다. 여러분의 여정을 응원합니다.
            </p>
            <div className="mt-8 flex justify-center">
              <Button variant="link" className="text-[#39393D] hover:text-[#39393D]/80" asChild>
                <Link href="/about" className="flex items-center">
                  더 알아보기 <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <div className="ml-4">
                <Link href="/testimonial-videos" className="inline-block">
                  <Image
                    src="/play-button.png"
                    alt="후기 영상 보기"
                    width={40}
                    height={40}
                    className="hover:scale-110 transition-transform duration-300"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F4F4F4] py-12">
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
