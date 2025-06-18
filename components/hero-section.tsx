import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RainbowText } from "@/components/rainbow-text"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Rainbow gradient top border */}
      <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500"></div>

      <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <RainbowText>Rainbow Buddy</RainbowText>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-slate-700 mb-6">
            띵동과 성소수자 청소년을 이어주는 무지개길
          </h2>
          <p className="text-slate-600 mb-8 text-lg">
            안전한 디지털 공간에서 자신을 탐색하고, 다양한 정체성에 대해 배우며, 필요할 때 전문적인 도움을 받을 수
            있어요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
            >
              <Link href="/garden">시작하기</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-violet-500 text-violet-700 hover:bg-violet-50">
              <Link href="/about">더 알아보기</Link>
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="relative h-[400px] w-full">
            <Image
              src="/placeholder.svg?key=ktrcl"
              alt="Rainbow Buddy 서비스 이미지"
              fill
              className="object-contain rounded-lg shadow-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
