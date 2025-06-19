import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { RainbowText } from "@/components/rainbow-text"
import { RainbowGradient } from "@/components/rainbow-gradient"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F4F4F4]">
      <MainNav />
      <RainbowGradient className="opacity-20" />

      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <Link href="/">
              <Button variant="ghost" className="flex items-center text-gray-600">
                <ArrowLeft className="mr-2 h-4 w-4" />
                홈으로 돌아가기
              </Button>
            </Link>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              <RainbowText>Rainbow Buddy 소개</RainbowText>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              내가 혹시 성소수자인지 고민하고 있나요? 안전하고 정확한 정보로 청소년 여러분의 정체성 탐색을 도와드립니다. Rainbow Buddy에서 다양한 성 정체성과 지향성을 탐색하고, 자신만의 이야기를 만들어가 보세요!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="rounded-[10px] overflow-hidden shadow-lg">
              <Image
                src="/placeholder-xer07.png"
                alt="Rainbow Buddy 소개 이미지"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">
                <RainbowText>우리의 미션</RainbowText>
              </h2>
              <p className="text-gray-600 mb-6">
                Rainbow Buddy는 성 정체성을 고민하는 청소년들이 자신의 정체성을 안전하게 탐색하고, 필요한 정보와 지원을 받을 수 있는
                디지털 안전 공간을 제공합니다. 우리는 모든 청소년이 자신을 있는 그대로 사랑하고 존중받을 수 있는 세상을
                만들기 위해 노력합니다.
              </p>
              <h2 className="text-2xl font-bold mb-4">
                <RainbowText>우리의 가치</RainbowText>
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>
                  <span className="font-medium">안전:</span> 모든 사용자가 안전하게 자신을 표현할 수 있는 공간을
                  제공합니다.
                </li>
                <li>
                  <span className="font-medium">포용:</span> 다양한 정체성과 경험을 존중하고 포용합니다.
                </li>
                <li>
                  <span className="font-medium">교육:</span> 정확하고 친절한 정보를 제공하여 이해와 공감을 돕습니다.
                </li>
                <li>
                  <span className="font-medium">지원:</span> 필요할 때 전문적인 도움을 받을 수 있도록 연결합니다.
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-[10px] shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">
              <RainbowText>Rainbow Buddy의 특징</RainbowText>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-[#FFF5F9] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#FF71CE]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">무지개 동산</h3>
                <p className="text-gray-600 text-sm">
                  자신만의 아바타와 안전한 공간을 꾸미며 자신의 정체성을 탐색할 수 있어요.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-[#FFFEF0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#FFF152]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">용어사전</h3>
                <p className="text-gray-600 text-sm">LGBTQ+ 관련 용어를 쉽고 친절하게 설명하여 이해를 돕습니다.</p>
              </div>
              <div className="text-center">
                <div className="bg-[#F0FFF5] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#00F5A0]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">정체성 테스트</h3>
                <p className="text-gray-600 text-sm">
                  나는 성소수자일까요? 어떤 정체성을 가지고 있을까요? 정체성 테스트를 통해 자신에 대해 탐색하는 시간을 가져보아요.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-[#FFF9F0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#FF9D00]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">게시판</h3>
                <p className="text-gray-600 text-sm">익명으로 질문하고 공감받는 안전한 커뮤니티 공간을 제공합니다.</p>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-2xl font-bold mb-6">
              <RainbowText>띵동 서비스와의 연결</RainbowText>
            </h2>
            <p className="text-gray-600 mb-8">
              Rainbow Buddy는 청소년 성소수자 지원 단체인 '띵동'과 연계하여 전문적인 상담 및 지원 서비스를 제공합니다.
              필요할 때 언제든지 전문 상담사와 연결되어 도움을 받을 수 있습니다.
            </p>
            <Button
              className="rounded-[10px] bg-[#39393D] hover:bg-[#39393D]/90 text-white shadow-md transition-all duration-300"
              asChild
            >
              <Link href="/lever">🎯 레버당기기</Link>
            </Button>
          </div>

          <div className="bg-white rounded-[10px] shadow-lg p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              <RainbowText>함께해요</RainbowText>
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Rainbow Buddy는 모든 청소년이 자신의 정체성을 자유롭게 탐색하고 표현할 수 있는 세상을 꿈꿉니다. 우리와
              함께 더 포용적이고 다양성을 존중하는 사회를 만들어가요.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                className="rounded-[10px] bg-gradient-to-r from-[#FF71CE] via-[#FFF152] via-[#00F5A0] via-[#7FD8FF] to-[#FF9D00] hover:opacity-90 text-white shadow-md transition-all duration-300"
                asChild
              >
                <Link href="/garden">시작하기</Link>
              </Button>
              <Button
                variant="outline"
                className="rounded-[10px] border-[#39393D] text-[#39393D] hover:bg-[#39393D]/5 transition-all duration-300"
                asChild
              >
                <Link href="/contact">문의하기</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#F4F4F4] py-12">
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
