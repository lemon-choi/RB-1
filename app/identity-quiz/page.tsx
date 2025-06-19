"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { RainbowText } from "@/components/rainbow-text"

// 퀴즈 데이터 import
import { Question, quizQuestions } from "@/lib/quiz-data"
import { Result, quizResults } from "@/lib/quiz-results"

export default function IdentityQuizPage() {
  // 퀴즈 상태
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({
    gender_alignment: 0,
    romantic_attraction: 0,
    sexual_attraction: 0,
    relationship_openness: 0,
    romantic_target: 0,
  })
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [result, setResult] = useState<Result | null>(null)

  // 퀴즈 질문 사용
  const questions = quizQuestions

  // 샘플 결과 데이터
  const results = quizResults

  // 다음 질문으로 이동
  const handleNextQuestion = (optionId: string) => {
    const currentQuestion = questions[currentQuestionIndex]
    const selectedOption = currentQuestion.options.find((option) => option.id === optionId)

    if (selectedOption) {
      // 점수 업데이트
      const newScores = { ...scores }
      selectedOption.scores.forEach((score) => {
        newScores[score.category] = (newScores[score.category] || 0) + score.value
      })
      setScores(newScores)

      // 다음 질문으로 이동 또는 결과 계산
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        calculateResult(newScores)
      }
    }
  }

  // 결과 계산
  const calculateResult = (finalScores: Record<string, number>) => {
    // 어떤 선택지를 선택하든 항상 팬섹슈얼 결과가 나오도록 설정
    const resultId = "FAXP_팬섹슈얼"

    // 팬섹슈얼 결과 찾기
    const matchedResult = results.find((r) => r.id === resultId)
    setResult(matchedResult || results[0])
    setQuizCompleted(true)
  }

  // 퀴즈 재시작
  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setScores({
      gender_alignment: 0,
      romantic_attraction: 0,
      sexual_attraction: 0,
      relationship_openness: 0,
      romantic_target: 0,
    })
    setQuizCompleted(false)
    setResult(null)
  }

  // 현재 질문
  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

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
              <RainbowText>정체성 테스트</RainbowText>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              나에게 맞는 벨을 띵동- 울려보아요 🔔 <br/> 테스트에 응답하여 나의 성 정체성과 지향성은 어떤 벨을 울릴지 찾아볼까요? 🤔
            </p>
          </div>

          {!quizCompleted ? (
            <div className="max-w-2xl mx-auto">
              <Card className="rounded-3xl border-gray-200 shadow-sm">
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm text-gray-500">
                      질문 {currentQuestionIndex + 1}/{questions.length}
                    </div>
                  </div>
                  <Progress value={progress} className="h-2 mb-4" />
                  <CardTitle className="text-xl text-gray-900">{currentQuestion.text}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentQuestion.options.map((option) => (
                    <Button
                      key={option.id}
                      variant="outline"
                      className="w-full justify-start text-left p-4 rounded-xl border-gray-200 hover:border-[#A091E6] hover:bg-[#F7F5FC] transition-colors"
                      onClick={() => handleNextQuestion(option.id)}
                    >
                      {option.text}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>
                  이 퀴즈는 자신을 탐색하는 데 도움을 주기 위한 것이며, 전문적인 진단이나 레이블링을 위한 것이 아닙니다.
                  모든 정체성은 유효하며 시간에 따라 변할 수 있습니다.
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <Card className="rounded-3xl border-gray-200 shadow-sm overflow-hidden">
                <div className="relative h-64 w-full mt-8">
                  <Image
                    src={result?.imageUrl || "/placeholder.svg"}
                    alt={result?.title || ""}
                    fill
                    className="object-contain"
                  />
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-gray-900 mb-6">{result?.title}</CardTitle>
                  
                  {/* Subtitle 알파벳 표시 */}
                  {result?.subtitle && (
                    <div className="mb-8">
                      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                        {result.subtitle.split('').map((letter, index) => {
                          const meanings = {
                            'F': 'Gender-Fluid',
                            'C': 'Cisgender', 
                            'A': 'Aromantic',
                            'R': 'Romantic',
                            'X': 'Asexual',
                            'S': 'Sexual',
                            'P': 'Poly-amorous',
                            'M': 'Monogamous'
                          }
                          return (
                            <div key={index} className="text-center">
                              <div className="text-3xl font-bold text-[#A091E6] border-b-2 border-[#A091E6] pb-1 mb-2">
                                {letter}
                              </div>
                              <div className="text-xs text-gray-600 font-medium">
                                {meanings[letter as keyof typeof meanings] || letter}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                  
                  <CardDescription className="text-lg mb-6">{result?.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-gray-600">
                      {result?.details?.split('\n').map((line, index) => {
                        // **텍스트** 형태를 <strong>텍스트</strong>로 변환
                        const processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        // 빈 줄은 간격을 위한 <br/>로 처리
                        if (line.trim() === '') {
                          return <br key={index} />
                        }
                        return (
                          <div key={index} dangerouslySetInnerHTML={{ __html: processedLine }} />
                        )
                      })}
                    </div>
                    <div className="bg-[#F5F9FD] p-4 rounded-2xl">
                      <h3 className="font-semibold text-[#7EAED9] mb-2">참고 자료</h3>
                      <ul className="space-y-2">
                        {result?.resources.map((resource, index) => (
                          <li key={index}>
                            <Link href={resource.url} className="text-[#7EAED9] hover:underline">
                              {resource.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={restartQuiz} className="rounded-full">
                    퀴즈 다시 시작하기
                  </Button>
                  <Button className="rounded-full bg-[#A091E6] hover:bg-[#8A7DD1] text-white" asChild>
                    <Link href="/dictionary">용어사전 살펴보기</Link>
                  </Button>
                </CardFooter>
              </Card>

              <div className="mt-8 bg-white rounded-3xl shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">중요 안내</h2>
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 text-center">관련 컨텐츠</h3>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
                        <Image
                          src="/heartstopper.jpg"
                          alt="하트스토퍼"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">하트스토퍼 (Heartstopper)</h3>
                      <p className="text-gray-600 text-sm mb-3">
                        성 소수자 청소년들의 사랑과 우정, 성장을 다룬 넷플릭스 오리지널 시리즈입니다.
                        앨리스 오스먼의 동명 그래픽 노블을 원작으로 하며, 다양한 성 정체성과 성적 지향을 가진
                        캐릭터들의 이야기를 섬세하게 그려냅니다.
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">시청 가능:</span>
                        <a href="https://www.netflix.com/title/81059939" target="_blank" rel="noopener noreferrer" className="text-[#E50914] hover:underline flex items-center">
                          넷플릭스
                        </a>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">주요 정보</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li><span className="font-medium">장르:</span> 청소년 드라마, 로맨스, LGBTQ+</li>
                        <li><span className="font-medium">시즌:</span> 시즌 1 (2022), 시즌 2 (2023), 시즌 3 (2024)</li>
                        <li><span className="font-medium">에피소드:</span> 시즌당 8편</li>
                        <li><span className="font-medium">주요 출연:</span> 키트 코너, 조 로크, 야스민 피네이</li>
                        <li><span className="font-medium">특징:</span>
                          다양한 성 정체성(게이, 레즈비언, 트랜스젠더, 바이섹슈얼, 에이섹슈얼 등)과
                          다양한 인종적 배경을 가진 캐릭터들이 등장하며, 청소년들의 성 정체성 탐색 과정을
                          긍정적으로 표현합니다.
                        </li>
                        <li><span className="font-medium">수상:</span> 에미상, BAFTA TV 어워드 등 다수</li>
                      </ul>
                      <div className="mt-4">
                        <Link href="/dictionary/representation" className="text-[#7EAED9] hover:underline text-sm">
                          미디어에서의 퀴어 재현에 대해 더 알아보기 →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6 text-center">
                  <p className="text-gray-600 mb-4">
                    이 퀴즈 결과는 참고용일 뿐이며, 여러분의 정체성을 정의하지 않습니다. 자신의 정체성을 탐색하는 것은
                    개인적인 여정이며, 시간이 걸릴 수 있습니다.
                  </p>
                  <p className="text-gray-600">더 깊은 대화나 지원이 필요하시면, 전문 상담사와의 상담을 고려해보세요.</p>
                  <div className="mt-6">
                    <Button className="rounded-full bg-[#39393D] hover:bg-[#39393D]/90 text-white" asChild>
                      <Link href="/lever">🎯 레버당기기</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
