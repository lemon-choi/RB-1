"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Trophy } from "lucide-react"
import { RainbowText } from "@/components/rainbow-text"
import confetti from "canvas-confetti"

// 정체성 카드 타입 정의
interface IdentityCard {
  id: string
  title: string
  description: string
  imageUrl: string
}

export default function IdentityWorldcupPage() {
  // 샘플 정체성 카드 데이터
  const allCards: IdentityCard[] = [
    {
      id: "lesbian",
      title: "레즈비언",
      description: "여성으로서 여성에게 감정적, 로맨틱, 성적으로 끌리는 사람",
      imageUrl: "/placeholder.svg?height=400&width=300&query=lesbian pride flag with abstract female figures",
    },
    {
      id: "gay",
      title: "게이",
      description: "남성으로서 남성에게 감정적, 로맨틱, 성적으로 끌리는 사람",
      imageUrl: "/placeholder.svg?height=400&width=300&query=gay pride flag with abstract male figures",
    },
    {
      id: "bisexual",
      title: "바이섹슈얼",
      description: "둘 이상의 성별에 감정적, 로맨틱, 성적으로 끌리는 사람",
      imageUrl: "/placeholder.svg?height=400&width=300&query=bisexual pride flag with abstract figures",
    },
    {
      id: "pansexual",
      title: "판섹슈얼",
      description: "모든 성별에 감정적, 로맨틱, 성적으로 끌릴 수 있는 사람",
      imageUrl: "/placeholder.svg?height=400&width=300&query=pansexual pride flag with abstract diverse figures",
    },
    {
      id: "asexual",
      title: "아섹슈얼",
      description: "성적 끌림을 거의 또는 전혀 경험하지 않는 사람",
      imageUrl: "/placeholder.svg?height=400&width=300&query=asexual pride flag with abstract figures",
    },
    {
      id: "transgender",
      title: "트랜스젠더",
      description: "출생 시 지정된 성별과 다른 성별 정체성을 가진 사람",
      imageUrl: "/placeholder.svg?height=400&width=300&query=transgender pride flag with abstract figures",
    },
    {
      id: "non-binary",
      title: "논바이너리",
      description: "남성이나 여성의 이분법적 성별 범주에 속하지 않는 사람",
      imageUrl: "/placeholder.svg?height=400&width=300&query=non-binary pride flag with abstract figures",
    },
    {
      id: "genderfluid",
      title: "젠더플루이드",
      description: "성별 정체성이 시간에 따라 변화하는 사람",
      imageUrl:
        "/placeholder.svg?height=400&width=300&query=genderfluid pride flag with abstract figures showing transition",
    },
    {
      id: "questioning",
      title: "퀘스쳐닝",
      description: "자신의 성적 지향이나 성별 정체성을 탐색 중인 사람",
      imageUrl:
        "/placeholder.svg?height=400&width=300&query=questioning identity with question marks and rainbow elements",
    },
    {
      id: "queer",
      title: "퀴어",
      description: "전통적인 성별이나 성적 지향의 규범에 부합하지 않는 사람",
      imageUrl: "/placeholder.svg?height=400&width=300&query=queer pride flag with diverse abstract figures",
    },
    {
      id: "ally",
      title: "앨라이",
      description: "LGBTQ+ 커뮤니티를 지지하고 옹호하는 비성소수자",
      imageUrl: "/placeholder.svg?height=400&width=300&query=ally flag with supportive figures and rainbow elements",
    },
    {
      id: "demisexual",
      title: "데미섹슈얼",
      description: "강한 감정적 유대가 형성된 후에만 성적 끌림을 느끼는 사람",
      imageUrl:
        "/placeholder.svg?height=400&width=300&query=demisexual pride flag with abstract figures showing emotional connection",
    },
    {
      id: "aromantic",
      title: "아로맨틱",
      description: "로맨틱한 끌림을 거의 또는 전혀 경험하지 않는 사람",
      imageUrl: "/placeholder.svg?height=400&width=300&query=aromantic pride flag with abstract figures",
    },
    {
      id: "agender",
      title: "에이젠더",
      description: "특정 성별 정체성을 갖지 않거나 성별이 없다고 느끼는 사람",
      imageUrl: "/placeholder.svg?height=400&width=300&query=agender pride flag with abstract neutral figures",
    },
    {
      id: "intersex",
      title: "인터섹스",
      description: "남성 또는 여성의 전형적인 생물학적 특성에 완전히 부합하지 않는 사람",
      imageUrl: "/placeholder.svg?height=400&width=300&query=intersex pride flag with abstract figures",
    },
    {
      id: "polyamorous",
      title: "폴리아모러스",
      description: "여러 사람과 동시에 윤리적이고 합의된 관계를 맺는 것을 선호하는 사람",
      imageUrl: "/placeholder.svg?height=400&width=300&query=polyamorous symbol with multiple connected hearts",
    },
  ]

  // 게임 상태 관리
  const [gameStarted, setGameStarted] = useState(false)
  const [currentRound, setCurrentRound] = useState(0)
  const [roundCards, setRoundCards] = useState<IdentityCard[]>([])
  const [winners, setWinners] = useState<IdentityCard[]>([])
  const [finalWinner, setFinalWinner] = useState<IdentityCard | null>(null)
  const [gameHistory, setGameHistory] = useState<IdentityCard[]>([])
  const [totalRounds, setTotalRounds] = useState(0)

  // 게임 시작 함수
  const startGame = () => {
    // 카드 섞기
    const shuffledCards = [...allCards].sort(() => Math.random() - 0.5)
    // 16강으로 시작 (16개 카드)
    const selectedCards = shuffledCards.slice(0, 16)
    setWinners(selectedCards)
    setCurrentRound(0)
    setGameStarted(true)
    setFinalWinner(null)
    setGameHistory([])
    setTotalRounds(Math.log2(selectedCards.length))
  }

  // 다음 라운드 준비
  useEffect(() => {
    if (!gameStarted || winners.length === 0) return

    if (winners.length === 1) {
      // 우승자 결정
      setFinalWinner(winners[0])
      // 축하 효과
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
      return
    }

    // 다음 라운드의 대결 카드 설정
    setRoundCards([winners[0], winners[1]])
  }, [winners, gameStarted])

  // 카드 선택 처리
  const selectCard = (selectedCard: IdentityCard) => {
    // 선택한 카드를 게임 히스토리에 추가
    setGameHistory((prev) => [...prev, selectedCard])

    // 현재 라운드의 승자 처리
    const newWinners = [...winners]
    newWinners.splice(0, 2) // 현재 대결의 두 카드 제거

    if (newWinners.length === 0 && winners.length === 2) {
      // 결승전인 경우
      setWinners([selectedCard])
    } else {
      // 다음 라운드를 위해 승자 추가
      setWinners([...newWinners, selectedCard])
      setCurrentRound(currentRound + 1)
    }
  }

  // 현재 라운드 표시 (8강, 4강 등)
  const getRoundName = () => {
    const remainingCards = winners.length
    if (remainingCards === 16) return "16강"
    if (remainingCards === 8) return "8강"
    if (remainingCards === 4) return "4강"
    if (remainingCards === 2) return "결승"
    return `${remainingCards}강`
  }

  // 진행률 계산
  const getProgress = () => {
    if (!gameStarted) return 0
    if (finalWinner) return 100

    const totalMatches = Math.pow(2, totalRounds) - 1 // 총 경기 수
    const completedMatches = gameHistory.length // 완료된 경기 수
    return (completedMatches / totalMatches) * 100
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Link href="/games">
            <Button variant="ghost" className="flex items-center text-pink-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              게임 목록으로
            </Button>
          </Link>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <RainbowText>정체성 월드컵</RainbowText>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            다양한 정체성 카드 중에서 나와 가장 가까운 것을 선택하며 나를 발견하는 여정을 떠나보세요.
          </p>
        </div>

        {!gameStarted && !finalWinner && (
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-8 text-center">
            <Image
              src="/placeholder.svg?height=200&width=200&query=colorful tournament bracket with LGBTQ+ symbols"
              alt="정체성 월드컵"
              width={200}
              height={200}
              className="mx-auto mb-6"
            />
            <h2 className="text-2xl font-bold mb-4">게임 방법</h2>
            <p className="text-slate-600 mb-6">
              두 개의 정체성 카드 중에서 나와 더 가깝다고 느끼는 것을 선택하세요. 최종 우승 카드는 현재 나의 정체성에
              대한 힌트가 될 수 있어요.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              onClick={startGame}
            >
              게임 시작하기
            </Button>
          </div>
        )}

        {gameStarted && !finalWinner && roundCards.length === 2 && (
          <>
            <div className="mb-8 text-center">
              <div className="inline-block bg-white rounded-full px-4 py-2 shadow-sm">
                <span className="font-medium">{getRoundName()}</span>
                <div className="w-40 h-2 bg-slate-100 rounded-full mt-1">
                  <div
                    className="h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                    style={{ width: `${getProgress()}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center max-w-4xl mx-auto">
              {roundCards.map((card) => (
                <div key={card.id} className="w-full md:w-1/2 max-w-xs" onClick={() => selectCard(card)}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer">
                    <div className="relative h-80 w-full">
                      <Image src={card.imageUrl || "/placeholder.svg"} alt={card.title} fill className="object-cover" />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                      <p className="text-slate-600 text-sm">{card.description}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-slate-500">더 끌리는 정체성을 선택하세요</p>
            </div>
          </>
        )}

        {finalWinner && (
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <Trophy className="h-16 w-16 text-amber-500" />
                <div className="absolute -top-2 -right-2 animate-ping h-4 w-4 rounded-full bg-amber-400 opacity-75"></div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">
              당신의 선택은 <RainbowText>{finalWinner.title}</RainbowText>
            </h2>

            <div className="relative h-60 w-full mb-6 rounded-lg overflow-hidden">
              <Image
                src={finalWinner.imageUrl || "/placeholder.svg"}
                alt={finalWinner.title}
                fill
                className="object-cover"
              />
            </div>

            <p className="text-slate-600 mb-6">{finalWinner.description}</p>

            <p className="text-sm text-slate-500 italic mb-8">
              이 결과는 단순한 게임일 뿐이며, 정체성은 복잡하고 유동적일 수 있습니다. 자신의 정체성을 탐색하는 여정은
              계속됩니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="border-pink-500 text-pink-700 hover:bg-pink-50" onClick={startGame}>
                다시 플레이
              </Button>
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                <Link href="/dictionary">용어사전에서 더 알아보기</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
