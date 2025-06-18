"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Search, Star } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { RainbowText } from "@/components/rainbow-text"

// 용어 데이터 타입 정의
interface Term {
  id: string
  title: string
  titleEn: string
  description: string
  example: string
  category: string
  isFeatured?: boolean
  imageUrl: string
  relatedTerms: string[]
}

export default function DictionaryPage() {
  // 샘플 용어 데이터
  const terms: Term[] = [
    {
      id: "lgbtq",
      title: "LGBTQ+",
      titleEn: "LGBTQ+",
      description:
        "레즈비언(Lesbian), 게이(Gay), 바이섹슈얼(Bisexual), 트랜스젠더(Transgender), 퀴어/퀘스쳐닝(Queer/Questioning)의 약자로, 다양한 성적 지향과 성 정체성을 포괄하는 용어입니다. '+'는 이외의 다양한 정체성을 포함함을 의미합니다.",
      example: "LGBTQ+ 커뮤니티는 다양한 정체성을 가진 사람들이 서로 지지하고 연대하는 공간입니다.",
      category: "기본 용어",
      isFeatured: true,
      imageUrl: "/abstract-lgbtq-minimalist.png",
      relatedTerms: ["queer", "ally"],
    },
    {
      id: "queer",
      title: "퀴어",
      titleEn: "Queer",
      description:
        "전통적인 성별이나 성적 지향의 규범에 부합하지 않는 모든 사람을 포괄하는 용어입니다. 과거에는 비하적인 의미로 사용되었으나, 현재는 많은 사람들이 자신의 정체성을 긍정적으로 표현하기 위해 이 용어를 사용합니다.",
      example: "그들은 자신을 퀴어라고 정의하며, 기존의 성별 이분법에 도전하는 삶을 살고 있습니다.",
      category: "기본 용어",
      imageUrl: "/abstract-queer-minimalist.png",
      relatedTerms: ["lgbtq", "genderqueer"],
    },
    {
      id: "ally",
      title: "앨라이",
      titleEn: "Ally",
      description:
        "LGBTQ+ 커뮤니티의 일원은 아니지만, 이들의 권리와 평등을 지지하고 옹호하는 사람을 의미합니다. 앨라이는 LGBTQ+ 커뮤니티의 투쟁에 연대하고 지지함으로써 중요한 역할을 합니다.",
      example:
        "그녀는 LGBTQ+ 권리 운동에 적극적으로 참여하는 앨라이로서, 학교에서 성소수자 학생들을 위한 안전한 공간을 만드는 데 기여했습니다.",
      category: "기본 용어",
      imageUrl: "/pride-allies.png",
      relatedTerms: ["lgbtq"],
    },
    {
      id: "gender-identity",
      title: "성 정체성",
      titleEn: "Gender Identity",
      description:
        "개인이 내적으로 경험하고 정의하는 자신의 성별에 대한 인식입니다. 이는 출생 시 지정된 성별과 일치할 수도, 다를 수도 있습니다.",
      example: "많은 사람들이 자신의 성 정체성을 탐색하는 과정을 거치며, 이는 평생에 걸친 여정일 수 있습니다.",
      category: "정체성",
      isFeatured: true,
      imageUrl: "/abstract-gender-diversity.png",
      relatedTerms: ["transgender", "non-binary"],
    },
    {
      id: "sexual-orientation",
      title: "성적 지향",
      titleEn: "Sexual Orientation",
      description:
        "특정 성별에 대한 지속적인 감정적, 로맨틱, 성적 끌림을 의미합니다. 이는 레즈비언, 게이, 바이섹슈얼, 판섹슈얼, 아섹슈얼 등 다양한 형태로 나타날 수 있습니다.",
      example: "성적 지향은 유동적일 수 있으며, 시간이 지남에 따라 변화할 수 있습니다.",
      category: "정체성",
      imageUrl: "/pride-hearts.png",
      relatedTerms: ["bisexual", "pansexual", "asexual"],
    },
    {
      id: "asexual",
      title: "에이섹슈얼",
      titleEn: "Asexual",
      description:
        "다른 사람에게 성적 끌림을 거의 또는 전혀 느끼지 않는 성적 지향입니다. 에이섹슈얼 스펙트럼에는 다양한 정체성이 존재하며, 에이섹슈얼이라고 해서 반드시 로맨틱한 끌림을 느끼지 않는 것은 아닙니다. 많은 에이섹슈얼 사람들은 친밀한 관계와 정서적 연결을 원합니다.",
      example: "그는 자신을 에이섹슈얼로 정의하며, 로맨틱한 관계는 원하지만 성적 끌림은 거의 느끼지 않는다고 설명했습니다.",
      category: "성적 지향",
      isFeatured: true,
      imageUrl: "/abstract-queer-minimalist.png",
      relatedTerms: ["aromantic", "demisexual", "sexual-orientation"],
    },
    {
      id: "aromantic",
      title: "에이로맨틱",
      titleEn: "Aromantic",
      description:
        "다른 사람에게 로맨틱한 끌림을 거의 또는 전혀 느끼지 않는 로맨틱 지향입니다. 에이로맨틱 사람들은 여전히 성적, 미적, 플라토닉 등 다른 형태의 끌림을 경험할 수 있으며, 깊은 우정이나 가족 같은 관계를 소중히 여길 수 있습니다.",
      example: "그녀는 에이로맨틱으로서 연인 관계보다는 친구들과의 깊은 우정을 더 중요하게 생각합니다.",
      category: "성적 지향",
      imageUrl: "/abstract-queer-minimalist.png",
      relatedTerms: ["asexual", "platonic", "sexual-orientation"],
    },
    {
      id: "demisexual",
      title: "데미섹슈얼",
      titleEn: "Demisexual",
      description:
        "깊은 정서적 유대감이 형성된 후에만 성적 끌림을 느끼는 성적 지향입니다. 데미섹슈얼은 에이섹슈얼 스펙트럼의 일부로 여겨지며, 먼저 강한 감정적 연결이 있어야 성적 매력을 느낄 수 있습니다.",
      example: "그는 데미섹슈얼로서 누군가와 깊은 신뢰 관계를 쌓은 후에야 성적 끌림을 느끼게 됩니다.",
      category: "성적 지향",
      imageUrl: "/abstract-queer-minimalist.png",
      relatedTerms: ["asexual", "sexual-orientation"],
    },
  ]

  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // 검색 및 필터링 로직
  const filteredTerms = terms.filter((term) => {
    if (!searchTerm.trim()) {
      // 검색어가 없으면 모든 항목 표시
      if (activeTab === "all") return true
      if (activeTab === "featured") return term.isFeatured
      return term.category === activeTab
    }

    const lowerSearchTerm = searchTerm.toLowerCase().trim()
    
    // 정확한 제목 매칭을 우선으로 하고, 부분 매칭도 허용
    const exactTitleMatch = 
      term.title.toLowerCase() === lowerSearchTerm ||
      term.titleEn.toLowerCase() === lowerSearchTerm
    
    // 제목에서 단어 경계를 고려한 매칭 (정확한 단어 매칭)
    const wordBoundaryMatch = 
      new RegExp(`\\b${lowerSearchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(term.title) ||
      new RegExp(`\\b${lowerSearchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(term.titleEn)
    
    // 설명에서도 단어 경계 매칭 적용 (정확한 단어만 매칭)
    const descriptionMatch = new RegExp(`\\b${lowerSearchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(term.description)
    
    const matchesSearch = exactTitleMatch || wordBoundaryMatch || descriptionMatch

    if (activeTab === "all") return matchesSearch
    if (activeTab === "featured") return matchesSearch && term.isFeatured
    return matchesSearch && term.category === activeTab
  })

  // 카테고리 목록 생성
  const categories = ["all", "featured", ...Array.from(new Set(terms.map((term) => term.category)))]

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
              <RainbowText>LGBTQ+ 용어사전</RainbowText>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              다양한 성적 지향과 성 정체성에 관한 용어들을 쉽고 친절하게 알아보세요. 이해를 통해 더 포용적인 세상을
              만들어갑니다.
            </p>
          </div>

          {/* 검색 바 */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="용어 검색하기..."
              className="pl-10 bg-white border-gray-200 focus:border-[#E8D595] rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* 카테고리 탭 */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 p-1 overflow-x-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize rounded-full py-2 px-4">
                  {category === "all" ? (
                    "전체"
                  ) : category === "featured" ? (
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-[#E8D595]" />
                      이주의 용어
                    </div>
                  ) : (
                    category
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* 용어 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredTerms.length > 0 ? (
              filteredTerms.map((term) => (
                <Card
                  key={term.id}
                  className="overflow-hidden hover:shadow-md transition-shadow rounded-3xl border-gray-200"
                >
                  <div className="relative h-48 w-full">
                    <Image src={term.imageUrl || "/placeholder.svg"} alt={term.title} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-gray-900">{term.title}</CardTitle>
                        <CardDescription>{term.titleEn}</CardDescription>
                      </div>
                      {term.isFeatured && (
                        <Badge className="bg-[#FDFBF5] text-[#E8D595] hover:bg-[#F9F6E8] rounded-full">
                          <Star className="h-3 w-3 mr-1 text-[#E8D595]" />
                          이주의 용어
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{term.description}</p>
                    <div className="bg-[#F5F9FD] p-3 rounded-2xl">
                      <p className="text-[#7EAED9] text-sm italic">{term.example}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="w-full">
                      <p className="text-xs text-gray-500 mb-2">관련 용어:</p>
                      <div className="flex flex-wrap gap-2">
                        {term.relatedTerms.map((relatedTerm) => (
                          <Badge key={relatedTerm} variant="outline" className="text-[#A091E6] rounded-full">
                            {terms.find((t) => t.id === relatedTerm)?.title || relatedTerm}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">검색 결과가 없습니다</h3>
                <p className="text-gray-500">다른 검색어를 입력하거나 필터를 변경해보세요.</p>
              </div>
            )}
          </div>

          {/* 추가 정보 섹션 */}
          <div className="bg-white rounded-3xl shadow-sm p-8 max-w-3xl mx-auto text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">더 많은 용어를 알고 싶으신가요?</h2>
            <p className="text-gray-600 mb-6">
              매주 새로운 용어가 업데이트됩니다. 용어에 대한 제안이나 수정 사항이 있으시면 게시판에 남겨주세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="rounded-full bg-[#E8D595] hover:bg-[#E0C980] text-white">
                <Link href="/board">게시판으로 이동하기</Link>
              </Button>
              <Button className="rounded-full bg-[#39393D] hover:bg-[#39393D]/90 text-white">
                <Link href="/lever">🎯 레버당기기</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
