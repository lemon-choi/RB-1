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

// 퀴즈 질문 타입 정의
interface Question {
  id: number
  text: string
  options: {
    id: string
    text: string
    scores: {
      category: string
      value: number
    }[]
  }[]
}

// 결과 타입 정의
interface Result {
  id: string
  title: string
  description: string
  imageUrl: string
  details: string
  resources: {
    title: string
    url: string
  }[]
}

export default function IdentityQuizPage() {
  // 퀴즈 상태
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({
    gender_identity: 0,
    sexual_orientation: 0,
    romantic_orientation: 0,
    expression: 0,
    authenticity: 0,
    adaptability: 0,
    conformity: 0,
    exploration: 0,
    heterosexual: 0,
    homosexual: 0,
    pansexual: 0,
    aromantic: 0,
    cisgender: 0,
    gender_fluid: 0,
    transgender: 0,
    non_binary: 0,
  })
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [result, setResult] = useState<Result | null>(null)

  // 샘플 퀴즈 질문
  const questions: Question[] = [
    {
      id: 1,
      text: "친구들과 함께 있을 때, 당신은...",
      options: [
        {
          id: "a",
          text: "자연스럽게 내 모습 그대로 행동한다",
          scores: [{ category: "authenticity", value: 3 }],
        },
        {
          id: "b",
          text: "상황에 맞춰 조금씩 다른 모습을 보인다",
          scores: [{ category: "adaptability", value: 3 }],
        },
        {
          id: "c",
          text: "다른 사람들이 기대하는 모습으로 행동한다",
          scores: [{ category: "conformity", value: 3 }],
        },
        {
          id: "d",
          text: "때로는 진짜 나를 숨기고 싶어진다",
          scores: [{ category: "exploration", value: 3 }],
        },
      ],
    },
    {
      id: 2,
      text: "드라마나 영화에서 로맨스 장면을 볼 때...",
      options: [
        {
          id: "a",
          text: "남녀 커플의 로맨스에 가장 몰입된다",
          scores: [{ category: "heterosexual", value: 4 }],
        },
        {
          id: "b",
          text: "같은 성별 커플의 로맨스가 더 와닿는다",
          scores: [{ category: "homosexual", value: 4 }],
        },
        {
          id: "c",
          text: "성별보다는 두 사람의 케미스트리에 집중한다",
          scores: [{ category: "pansexual", value: 4 }],
        },
        {
          id: "d",
          text: "로맨스보다는 우정이나 다른 관계가 더 흥미롭다",
          scores: [{ category: "aromantic", value: 4 }],
        },
      ],
    },
    {
      id: 3,
      text: "거울을 보며 옷을 입을 때, 가장 중요한 것은...",
      options: [
        {
          id: "a",
          text: "내 성별에 '어울린다'고 여겨지는 스타일",
          scores: [{ category: "cisgender", value: 3 }],
        },
        {
          id: "b",
          text: "성별 구분 없이 내가 좋아하는 스타일",
          scores: [{ category: "gender_fluid", value: 3 }],
        },
        {
          id: "c",
          text: "반대 성별의 옷이 더 편하고 자연스럽다",
          scores: [{ category: "transgender", value: 4 }],
        },
        {
          id: "d",
          text: "성별을 드러내지 않는 중성적인 스타일",
          scores: [{ category: "non_binary", value: 4 }],
        },
      ],
    },
    {
      id: 4,
      text: "새로운 사람을 만났을 때, 당신은...",
      options: [
        {
          id: "a",
          text: "상대방의 성별이 가장 먼저 눈에 들어온다",
          scores: [
            { category: "heterosexual", value: 2 },
            { category: "homosexual", value: 2 },
          ],
        },
        {
          id: "b",
          text: "외모보다는 성격이나 분위기를 먼저 파악하려 한다",
          scores: [{ category: "pansexual", value: 3 }],
        },
        {
          id: "c",
          text: "그 사람이 어떤 사람인지 알아가는 것 자체가 즐겁다",
          scores: [{ category: "exploration", value: 4 }],
        },
        {
          id: "d",
          text: "새로운 만남 자체가 부담스럽고 피하고 싶다",
          scores: [{ category: "aromantic", value: 3 }],
        },
      ],
    },
    {
      id: 5,
      text: "당신이 생각하는 '사랑'이란...",
      options: [
        {
          id: "a",
          text: "헌신과 책임감이 따르는 관계",
          scores: [{ category: "conformity", value: 2 }],
        },
        {
          id: "b",
          text: "서로에게 영감을 주는 관계",
          scores: [{ category: "authenticity", value: 3 }],
        },
        {
          id: "c",
          text: "끊임없이 변화하고 발전하는 관계",
          scores: [{ category: "gender_fluid", value: 4 }],
        },
        {
          id: "d",
          text: "조건 없이 서로를 지지하는 관계",
          scores: [{ category: "pansexual", value: 3 }],
        },
      ],
    },
    {
      id: 6,
      text: "소셜 미디어 프로필을 설정할 때, 당신은...",
      options: [
        {
          id: "a",
          text: "내 성별을 명확하게 표시한다",
          scores: [{ category: "cisgender", value: 2 }],
        },
        {
          id: "b",
          text: "성별을 굳이 밝히지 않는다",
          scores: [{ category: "non_binary", value: 3 }],
        },
        {
          id: "c",
          text: "다양한 성별 관련 옵션을 활용하여 나를 표현한다",
          scores: [{ category: "gender_fluid", value: 4 }],
        },
        {
          id: "d",
          text: "개인 정보는 최소한으로만 공개한다",
          scores: [{ category: "exploration", value: 2 }],
        },
      ],
    },
    {
      id: 7,
      text: "만약 당신이 유명인이라면, 어떤 역할을 하고 싶나요?",
      options: [
        {
          id: "a",
          text: "전통적인 가치를 옹호하는 역할",
          scores: [{ category: "conformity", value: 3 }],
        },
        {
          id: "b",
          text: "사회적 편견에 맞서 싸우는 역할",
          scores: [{ category: "transgender", value: 4 }],
        },
        {
          id: "c",
          text: "나만의 개성을 자유롭게 표현하는 역할",
          scores: [{ category: "authenticity", value: 3 }],
        },
        {
          id: "d",
          text: "사람들에게 영감을 주는 긍정적인 역할",
          scores: [{ category: "adaptability", value: 2 }],
        },
      ],
    },
    {
      id: 8,
      text: "가장 좋아하는 영화 장르는 무엇인가요?",
      options: [
        {
          id: "a",
          text: "로맨틱 코미디",
          scores: [{ category: "heterosexual", value: 3 }],
        },
        {
          id: "b",
          text: "퀴어 영화",
          scores: [{ category: "homosexual", value: 4 }],
        },
        {
          id: "c",
          text: "다큐멘터리",
          scores: [{ category: "exploration", value: 3 }],
        },
        {
          id: "d",
          text: "SF/판타지",
          scores: [{ category: "non_binary", value: 2 }],
        },
      ],
    },
    {
      id: 9,
      text: "주말에 주로 무엇을 하나요?",
      options: [
        {
          id: "a",
          text: "친구들과 어울리거나 데이트를 한다",
          scores: [
            { category: "heterosexual", value: 2 },
            { category: "homosexual", value: 2 },
          ],
        },
        {
          id: "b",
          text: "혼자만의 시간을 보내며 취미를 즐긴다",
          scores: [{ category: "aromantic", value: 3 }],
        },
        {
          id: "c",
          text: "새로운 활동이나 장소를 탐험한다",
          scores: [{ category: "exploration", value: 4 }],
        },
        {
          id: "d",
          text: "집에서 휴식을 취하며 재충전한다",
          scores: [{ category: "adaptability", value: 2 }],
        },
      ],
    },
    {
      id: 10,
      text: "어떤 종류의 음악을 가장 좋아하나요?",
      options: [
        {
          id: "a",
          text: "대중적인 팝 음악",
          scores: [{ category: "conformity", value: 2 }],
        },
        {
          id: "b",
          text: "인디 음악",
          scores: [{ category: "authenticity", value: 3 }],
        },
        {
          id: "c",
          text: "클래식 음악",
          scores: [{ category: "cisgender", value: 2 }],
        },
        {
          id: "d",
          text: "다양한 장르를 섞어 듣는다",
          scores: [{ category: "gender_fluid", value: 4 }],
        },
      ],
    },
    {
      id: 11,
      text: "당신은 주로 어떤 스타일의 옷을 입나요?",
      options: [
        {
          id: "a",
          text: "유행을 따르는 스타일",
          scores: [{ category: "conformity", value: 3 }],
        },
        {
          id: "b",
          text: "편안하고 실용적인 스타일",
          scores: [{ category: "adaptability", value: 2 }],
        },
        {
          id: "c",
          text: "개성을 드러내는 독특한 스타일",
          scores: [{ category: "authenticity", value: 4 }],
        },
        {
          id: "d",
          text: "성별에 상관없이 좋아하는 옷을 입는다",
          scores: [{ category: "non_binary", value: 3 }],
        },
      ],
    },
    {
      id: 12,
      text: "가장 중요하다고 생각하는 가치는 무엇인가요?",
      options: [
        {
          id: "a",
          text: "정직",
          scores: [{ category: "authenticity", value: 3 }],
        },
        {
          id: "b",
          text: "안정",
          scores: [{ category: "conformity", value: 2 }],
        },
        {
          id: "c",
          text: "자유",
          scores: [{ category: "exploration", value: 4 }],
        },
        {
          id: "d",
          text: "공감",
          scores: [{ category: "pansexual", value: 3 }],
        },
      ],
    },
    {
      id: 13,
      text: "어떤 종류의 사람에게 끌리나요?",
      options: [
        {
          id: "a",
          text: "나와 비슷한 사람",
          scores: [{ category: "cisgender", value: 2 }],
        },
        {
          id: "b",
          text: "나와 반대되는 매력을 가진 사람",
          scores: [{ category: "exploration", value: 3 }],
        },
        {
          id: "c",
          text: "지적이고 유머 감각이 있는 사람",
          scores: [{ category: "pansexual", value: 4 }],
        },
        {
          id: "d",
          text: "따뜻하고 배려심이 깊은 사람",
          scores: [{ category: "adaptability", value: 2 }],
        },
      ],
    },
    {
      id: 14,
      text: "당신은 어떤 종류의 데이트를 선호하나요?",
      options: [
        {
          id: "a",
          text: "전통적인 데이트",
          scores: [{ category: "conformity", value: 2 }],
        },
        {
          id: "b",
          text: "새로운 경험을 할 수 있는 데이트",
          scores: [{ category: "exploration", value: 4 }],
        },
        {
          id: "c",
          text: "편안하고 캐주얼한 데이트",
          scores: [{ category: "adaptability", value: 3 }],
        },
        {
          id: "d",
          text: "둘만의 시간을 보낼 수 있는 조용한 데이트",
          scores: [{ category: "aromantic", value: 3 }],
        },
      ],
    },
    {
      id: 15,
      text: "당신은 어떤 방식으로 사랑을 표현하나요?",
      options: [
        {
          id: "a",
          text: "말로 표현한다",
          scores: [{ category: "authenticity", value: 3 }],
        },
        {
          id: "b",
          text: "선물을 준다",
          scores: [{ category: "conformity", value: 2 }],
        },
        {
          id: "c",
          text: "함께 시간을 보낸다",
          scores: [{ category: "adaptability", value: 3 }],
        },
        {
          id: "d",
          text: "스킨십을 한다",
          scores: [
            { category: "heterosexual", value: 2 },
            { category: "homosexual", value: 2 },
          ],
        },
      ],
    },
  ]

  // 샘플 결과 데이터
  const results: Result[] = [
    {
      id: "asexual",
      title: "에이섹슈얼(무성애자)",
      description: "당신은 다른 사람들에게 성적 끌림을 거의 또는 전혀 느끼지 않을 수 있습니다.",
      imageUrl: "/abstract-queer-minimalist.png",
      details:
        "에이섹슈얼(무성애)은 다른 사람에게 성적 끌림을 거의 또는 전혀 느끼지 않는 성적 지향입니다. 에이섹슈얼 스펙트럼에는 다양한 정체성이 존재합니다. 에이섹슈얼이라고 해서 반드시 로맨틱한 끌림을 느끼지 않는 것은 아니며, 많은 에이섹슈얼 사람들은 친밀한 관계와 정서적 연결을 원합니다.",
      resources: [
        {
          title: "에이섹슈얼 정체성 이해하기",
          url: "/dictionary/asexual",
        },
        {
          title: "에이로맨틱 스펙트럼 알아보기",
          url: "/dictionary/aromantic-spectrum",
        },
      ],
    },
    {
      id: "cisgender_heterosexual",
      title: "시스젠더 헤테로섹슈얼",
      description: "당신은 출생 시 지정된 성별에 편안함을 느끼며, 주로 다른 성별에게 끌림을 느끼는 경향이 있습니다.",
      imageUrl: "/abstract-gender-diversity.png",
      details:
        "시스젠더란 출생 시 지정된 성별과 성 정체성이 일치하는 것을 의미합니다. 헤테로섹슈얼은 다른 성별에게 성적/로맨틱한 끌림을 느끼는 것을 의미합니다. 이는 가장 흔한 조합이지만, 모든 정체성은 동등하게 가치 있고 존중받아야 합니다.",
      resources: [
        {
          title: "성 정체성과 성적 지향의 이해",
          url: "/dictionary/gender-identity",
        },
        {
          title: "앨라이(Ally)가 되는 방법",
          url: "/dictionary/ally",
        },
      ],
    },
    {
      id: "questioning",
      title: "퀘스쳐닝",
      description: "당신은 자신의 성 정체성이나 성적 지향에 대해 탐색하고 질문하는 과정에 있을 수 있습니다.",
      imageUrl: "/abstract-queer-minimalist.png",
      details:
        "퀘스쳐닝은 자신의 성 정체성이나 성적 지향에 대해 탐색하고 질문하는 과정을 의미합니다. 이는 많은 사람들이 경험하는 자연스러운 과정이며, 시간이 걸릴 수 있습니다. 자신을 탐색하는 여정에서 서두르지 않고 자신의 감정에 귀 기울이는 것이 중요합니다.",
      resources: [
        {
          title: "자신의 정체성 탐색하기",
          url: "/dictionary/questioning",
        },
        {
          title: "성 정체성과 성적 지향의 스펙트럼",
          url: "/dictionary/spectrum",
        },
      ],
    },
    {
      id: "non_binary",
      title: "논바이너리",
      description: "당신은 이분법적인 성별 구분에 속하지 않는 정체성을 가질 수 있습니다.",
      imageUrl: "/abstract-gender-diversity.png",
      details:
        "논바이너리는 남성이나 여성이라는 이분법적 성별 구분에 속하지 않는 성 정체성을 의미합니다. 논바이너리 정체성을 가진 사람들은 자신을 남성과 여성 사이의 어딘가에 위치하거나, 두 성별을 모두 포함하거나, 성별이 없거나, 유동적인 성별을 가진 것으로 느낄 수 있습니다.",
      resources: [
        {
          title: "논바이너리 정체성 이해하기",
          url: "/dictionary/non-binary",
        },
        {
          title: "젠더 표현과 정체성",
          url: "/dictionary/gender-expression",
        },
      ],
    },
    {
      id: "bisexual_pansexual",
      title: "바이섹슈얼/판섹슈얼",
      description: "당신은 여러 성별에게 끌림을 느끼거나, 성별에 상관없이 개인에게 끌림을 느낄 수 있습니다.",
      imageUrl: "/pride-hearts.png",
      details:
        "바이섹슈얼은 두 개 이상의 성별에게 끌림을 느끼는 것을 의미합니다. 판섹슈얼은 성별에 상관없이 개인의 성격, 특성, 에너지 등에 끌림을 느끼는 것을 의미합니다. 이 두 정체성은 유사하지만 개인에 따라 다르게 경험될 수 있습니다.",
      resources: [
        {
          title: "바이섹슈얼과 판섹슈얼의 이해",
          url: "/dictionary/bisexual-pansexual",
        },
        {
          title: "다양한 성적 지향 탐색하기",
          url: "/dictionary/sexual-orientation",
        },
      ],
    },
    {
      id: "aromantic",
      title: "에이로맨틱(무연애자)",
      description: "당신은 다른 사람들에게 로맨틱한 끌림을 거의 또는 전혀 느끼지 않을 수 있습니다.",
      imageUrl: "/abstract-queer-minimalist.png",
      details:
        "에이로맨틱은 다른 사람에게 로맨틱한 끌림을 거의 또는 전혀 느끼지 않는 로맨틱 지향입니다. 에이로맨틱 사람들은 여전히 성적, 미적, 플라토닉 등 다른 형태의 끌림을 경험할 수 있습니다.",
      resources: [
        {
          title: "에이로맨틱 정체성 이해하기",
          url: "/dictionary/aromantic",
        },
        {
          title: "다양한 유형의 끌림 알아보기",
          url: "/dictionary/attraction",
        },
      ],
    },
    {
      id: "gender_fluid",
      title: "젠더플루이드",
      description: "당신의 성별 정체성은 시간에 따라 변할 수 있습니다.",
      imageUrl: "/abstract-gender-diversity.png",
      details:
        "젠더플루이드는 시간에 따라 변하는 성별 정체성을 의미합니다. 젠더플루이드 사람은 때로는 남성, 여성, 또는 다른 성별 정체성으로 자신을 인식하거나, 여러 정체성의 조합으로 느낄 수 있습니다.",
      resources: [
        {
          title: "젠더플루이드 정체성 이해하기",
          url: "/dictionary/gender-fluid",
        },
        {
          title: "성별 정체성과 표현",
          url: "/dictionary/gender-identity",
        },
      ],
    },
  ]

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
    // 어떤 선택지를 선택하든 항상 에이섹슈얼 결과가 나오도록 설정
    const resultId = "asexual"

    // 에이섹슈얼 결과 찾기
    const matchedResult = results.find((r) => r.id === resultId)
    setResult(matchedResult || results[0])
    setQuizCompleted(true)
  }

  // 퀴즈 재시작
  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setScores({
      gender_identity: 0,
      sexual_orientation: 0,
      romantic_orientation: 0,
      expression: 0,
      authenticity: 0,
      adaptability: 0,
      conformity: 0,
      exploration: 0,
      heterosexual: 0,
      homosexual: 0,
      pansexual: 0,
      aromantic: 0,
      cisgender: 0,
      gender_fluid: 0,
      transgender: 0,
      non_binary: 0,
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
              <RainbowText>정체성 퀴즈</RainbowText>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              간단한 질문에 답하고 자신의 성 정체성과 성적 지향에 대해 탐색해보세요. 이 퀴즈는 참고용이며, 정확한 진단이
              아닙니다.
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
                <div className="relative h-64 w-full">
                  <Image
                    src={result?.imageUrl || "/placeholder.svg"}
                    alt={result?.title || ""}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">{result?.title}</CardTitle>
                  <CardDescription className="text-lg">{result?.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600">{result?.details}</p>
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

              <div className="mt-8 bg-white rounded-3xl shadow-sm p-8 text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-4">중요 안내</h2>
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
          )}
        </div>
      </main>
    </div>
  )
}
