"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Gamepad, Trophy, Star } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { RainbowText } from "@/components/rainbow-text"

// 게임 데이터 타입 정의
interface Game {
  id: string
  title: string
  description: string
  imageUrl: string
  difficulty: "쉬움" | "보통" | "어려움"
  estimatedTime: string
  category: string
  isNew?: boolean
  isPopular?: boolean
  hasVideo?: boolean
}

export default function GamesPage() {
  // 샘플 게임 데이터
  const games: Game[] = [
    {
      id: "identity-worldcup",
      title: "정체성 월드컵",
      description: "다양한 정체성 카드 중에서 나와 가장 가까운 것을 선택하며 나를 발견하는 게임입니다.",
      imageUrl: "/korean-lgbtq-tournament-ids.png",
      difficulty: "쉬움",
      estimatedTime: "5분",
      category: "자기 탐색",
      isNew: true,
      isPopular: true,
      hasVideo: true,
    },
    {
      id: "empathy-bridge",
      title: "공감의 다리 놓기",
      description: "다양한 상황에서 타인의 입장을 이해하고 공감하는 능력을 키우는 퍼즐 게임입니다.",
      imageUrl: "/korean-bridge-puzzle.png",
      difficulty: "보통",
      estimatedTime: "10분",
      category: "공감 능력",
      isPopular: true,
      hasVideo: true,
    },
    {
      id: "queer-adventure",
      title: "퀴어 모험 게임",
      description: "LGBTQ+ 역사와 인물들을 만나며 퀴즈를 풀고 모험을 떠나는 게임입니다.",
      imageUrl: "/korean-lgbtq-adventure.png",
      difficulty: "보통",
      estimatedTime: "15분",
      category: "역사 학습",
    },
    {
      id: "term-explorer",
      title: "용어 탐험 퀴즈",
      description: "LGBTQ+ 관련 용어를 재미있게 학습할 수 있는 4지선다형 퀴즈 게임입니다.",
      imageUrl: "/korean-lgbtq-quiz.png",
      difficulty: "쉬움",
      estimatedTime: "8분",
      category: "용어 학습",
      isNew: true,
    },
    {
      id: "coming-out-story",
      title: "커밍아웃 스토리 메이커",
      description: "다양한 시나리오에서 선택을 통해 자신만의 커밍아웃 이야기를 만들어보는 게임입니다.",
      imageUrl: "/korean-interactive-story.png",
      difficulty: "어려움",
      estimatedTime: "20분",
      category: "스토리텔링",
      hasVideo: true,
    },
    {
      id: "ally-training",
      title: "앨라이 트레이닝",
      description: "성소수자 친구를 지지하고 도울 수 있는 방법을 배우는 시뮬레이션 게임입니다.",
      imageUrl: "/korean-ally-training-sim.png",
      difficulty: "보통",
      estimatedTime: "12분",
      category: "앨라이 교육",
    },
  ]

  // 난이도에 따른 배지 색상
  const difficultyColors = {
    쉬움: "bg-[#F5F9FD] text-[#7EAED9] hover:bg-[#E6F3FA] rounded-full",
    보통: "bg-[#FDFBF5] text-[#E8D595] hover:bg-[#F9F6E8] rounded-full",
    어려움: "bg-[#FEF6F2] text-[#F3B391] hover:bg-[#FDEEE7] rounded-full",
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FEF9F2]">
      <MainNav />

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
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              <RainbowText>Rainbow Quest</RainbowText>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              재미있는 게임을 통해 다양성과 포용에 대해 배우고, 자신의 정체성을 탐색하며, 공감 능력을 키워보세요.
            </p>
          </div>

          {/* 인기 게임 섹션 */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Trophy className="h-6 w-6 text-[#E8D595] mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">인기 게임</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games
                .filter((game) => game.isPopular)
                .map((game) => (
                  <Card
                    key={game.id}
                    className="overflow-hidden hover:shadow-md transition-all rounded-[10px] border-gray-200"
                  >
                    <div className="relative h-48 w-full">
                      <Image src={game.imageUrl || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
                      {game.isNew && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-[#F7F5FC] text-[#A091E6] hover:bg-[#F0EDFA] rounded-full">
                            <Star className="h-3 w-3 mr-1" />
                            NEW
                          </Badge>
                        </div>
                      )}
                      {game.hasVideo && (
                        <div className="absolute bottom-3 right-3">
                          <Link href={`/games/${game.id}/video`}>
                            <Image
                              src="/play-button.png"
                              alt="게임 소개 영상"
                              width={40}
                              height={40}
                              className="hover:scale-110 transition-transform duration-300"
                            />
                          </Link>
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-gray-900">{game.title}</CardTitle>
                      <CardDescription>{game.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{game.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={difficultyColors[game.difficulty]}>{game.difficulty}</Badge>
                        <Badge variant="outline" className="text-gray-600 rounded-full">
                          {game.estimatedTime}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full rounded-[10px] bg-[#39393D] hover:bg-[#39393D]/90 text-white">
                        <Link href={`/games/${game.id}`} className="flex items-center justify-center w-full">
                          게임 시작하기 <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </section>

          {/* 모든 게임 섹션 */}
          <section>
            <div className="flex items-center mb-6">
              <Gamepad className="h-6 w-6 text-[#7EAED9] mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">모든 게임</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game) => (
                <Card
                  key={game.id}
                  className="overflow-hidden hover:shadow-md transition-all rounded-[10px] border-gray-200"
                >
                  <div className="relative h-48 w-full">
                    <Image src={game.imageUrl || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
                    {game.isNew && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-[#F7F5FC] text-[#A091E6] hover:bg-[#F0EDFA] rounded-full">
                          <Star className="h-3 w-3 mr-1" />
                          NEW
                        </Badge>
                      </div>
                    )}
                    {game.hasVideo && (
                      <div className="absolute bottom-3 right-3">
                        <Link href={`/games/${game.id}/video`}>
                          <Image
                            src="/play-button.png"
                            alt="게임 소개 영상"
                            width={40}
                            height={40}
                            className="hover:scale-110 transition-transform duration-300"
                          />
                        </Link>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-gray-900">{game.title}</CardTitle>
                    <CardDescription>{game.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{game.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={difficultyColors[game.difficulty]}>{game.difficulty}</Badge>
                      <Badge variant="outline" className="text-gray-600 rounded-full">
                        {game.estimatedTime}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full rounded-[10px] bg-[#39393D] hover:bg-[#39393D]/90 text-white">
                      <Link href={`/games/${game.id}`} className="flex items-center justify-center w-full">
                        게임 시작하기 <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* 게임 혜택 설명 섹션 */}
          <section className="mt-16 bg-white rounded-[10px] shadow-sm p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">게임을 통해 얻을 수 있는 것들</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-[#F5F9FD] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Gamepad className="h-8 w-8 text-[#7EAED9]" />
                </div>
                <h3 className="font-semibold mb-2 text-gray-900">재미있는 학습</h3>
                <p className="text-gray-600 text-sm">게임을 통해 즐겁게 LGBTQ+ 관련 지식을 배울 수 있어요.</p>
              </div>

              <div className="text-center">
                <div className="bg-[#F7F5FC] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#A091E6]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2 text-gray-900">공감 능력 향상</h3>
                <p className="text-gray-600 text-sm">
                  다양한 상황과 인물을 통해 타인의 경험을 이해하고 공감하는 능력을 키워요.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[#FDFBF5] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#E8D595]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2 text-gray-900">안전한 탐색</h3>
                <p className="text-gray-600 text-sm">
                  게임 속에서 안전하게 다양한 정체성과 상황을 탐색하고 경험할 수 있어요.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
