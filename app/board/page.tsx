"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Search, AlertCircle, PenSquare } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { RainbowText } from "@/components/rainbow-text"

// 게시글 타입 정의
interface Post {
  id: string
  title: string
  content: string
  category: "정보" | "경험" | "자료" | "공지"
  author: string
  date: string
  views: number
  isOfficial?: boolean
  isCounselor?: boolean
}

export default function BoardPage() {
  // 샘플 게시글 데이터
  const posts: Post[] = [
    {
      id: "post1",
      title: "성 정체성과 성적 지향의 차이점 알아보기",
      content:
        "성 정체성은 자신이 어떤 성별인지에 대한 내적 인식이고, 성적 지향은 어떤 성별에 감정적, 로맨틱, 성적으로 끌리는지를 의미합니다. 이 두 개념은 서로 다르며 독립적입니다.",
      category: "정보",
      author: "명동 상담사",
      date: "2023-05-15",
      views: 245,
      isCounselor: true,
    },
    {
      id: "post2",
      title: "청소년 성소수자를 위한 안전한 공간 찾기",
      content:
        "청소년 성소수자들이 안전하게 자신을 표현하고 지원받을 수 있는 공간과 커뮤니티를 소개합니다. 온라인 커뮤니티부터 오프라인 모임까지 다양한 옵션이 있습니다.",
      category: "자료",
      author: "무지개 지원단",
      date: "2023-05-18",
      views: 189,
      isOfficial: true,
    },
    {
      id: "post3",
      title: "[공지] 6월 청소년 퀴어 축제 안내",
      content:
        "6월 17일에 열리는 청소년 퀴어 축제에 여러분을 초대합니다. 다양한 워크샵과 문화 행사가 준비되어 있으니 많은 참여 부탁드립니다. 자세한 내용은 본문을 참고해주세요.",
      category: "공지",
      author: "명동 상담사",
      date: "2023-05-20",
      views: 342,
      isOfficial: true,
      isCounselor: true,
    },
    {
      id: "post4",
      title: "학교에서 차별을 경험했을 때 대처하는 방법",
      content:
        "학교에서 성 정체성이나 성적 지향으로 인한 차별을 경험할 때 도움이 될 수 있는 대처 방법과 자원을 소개합니다. 교사, 상담사, 그리고 지원 단체에 도움을 요청하는 방법을 알아보세요.",
      category: "정보",
      author: "교육 전문가",
      date: "2023-05-22",
      views: 276,
    },
    {
      id: "post5",
      title: "성소수자 청소년의 정신 건강 관리하기",
      content:
        "성소수자 청소년들이 경험할 수 있는 정신 건강 문제와 이를 관리하는 방법에 대해 알아봅니다. 자기 돌봄, 지원 네트워크 구축, 그리고 전문적인 도움을 구하는 방법을 소개합니다.",
      category: "자료",
      author: "건강 상담사",
      date: "2023-05-25",
      views: 215,
      isCounselor: true,
    },
    {
      id: "post6",
      title: "논바이너리로서의 경험 이야기",
      content:
        "논바이너리 정체성을 가진 청소년의 경험담입니다. 자신의 정체성을 발견하고 받아들이는 과정, 그리고 주변 사람들과 소통하는 방법에 대한 이야기를 공유합니다.",
      category: "경험",
      author: "별빛",
      date: "2023-05-28",
      views: 198,
    },
    {
      id: "post7",
      title: "성소수자 청소년을 위한 추천 도서 및 미디어",
      content:
        "성소수자 청소년들에게 도움이 될 수 있는 책, 영화, 드라마, 웹툰 등의 미디어 콘텐츠를 소개합니다. 다양한 정체성과 경험을 다루는 작품들을 만나보세요.",
      category: "자료",
      author: "문화 큐레이터",
      date: "2023-05-19",
      views: 267,
    },
  ]

  // 상태 관리
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // 게시글 필터링
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && post.category === activeTab
  })

  // 카테고리별 배지 색상
  const categoryColors = {
    정보: "bg-[#F5F9FD] text-[#7EAED9] hover:bg-[#E6F3FA] rounded-full",
    경험: "bg-[#F7F5FC] text-[#A091E6] hover:bg-[#F0EDFA] rounded-full",
    자료: "bg-[#FDFBF5] text-[#E8D595] hover:bg-[#F9F6E8] rounded-full",
    공지: "bg-[#FEF6F2] text-[#F3B391] hover:bg-[#FDEEE7] rounded-full",
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
            <Link href="/board/create">
              <Button className="flex items-center bg-[#A091E6] hover:bg-[#8A7DD1] text-white rounded-full">
                <PenSquare className="mr-2 h-4 w-4" />
                게시글 작성
              </Button>
            </Link>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              <RainbowText>정보 게시판</RainbowText>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              성 정체성과 성적 지향에 관한 유용한 정보, 자료, 그리고 경험담을 살펴보세요. 여러분의 여정에 도움이 될 수
              있는 다양한 콘텐츠를 제공합니다.
            </p>
          </div>

          {/* 검색 */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="게시글 검색..."
              className="pl-10 bg-white border-gray-200 focus:border-[#A091E6] rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* 카테고리 탭 */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-5 gap-2">
              <TabsTrigger value="all" className="rounded-full">
                전체
              </TabsTrigger>
              <TabsTrigger value="정보" className="rounded-full">
                정보
              </TabsTrigger>
              <TabsTrigger value="경험" className="rounded-full">
                경험담
              </TabsTrigger>
              <TabsTrigger value="자료" className="rounded-full">
                자료
              </TabsTrigger>
              <TabsTrigger value="공지" className="rounded-full">
                공지
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* 게시글 목록 */}
          <div className="space-y-4 mb-10">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Link href={`/board/${post.id}`} key={post.id}>
                  <Card className="hover:shadow-md transition-shadow rounded-3xl border-gray-200 cursor-pointer">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg text-gray-900">{post.title}</CardTitle>
                          <div className="flex items-center mt-1 space-x-2">
                            <Badge className={categoryColors[post.category]}>{post.category}</Badge>
                            {post.isOfficial && (
                              <Badge variant="outline" className="text-[#E8D595] border-[#F5EDD5] rounded-full">
                                공식 자료
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-gray-600 line-clamp-3">{post.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage
                              src={`/abstract-avatar.png?key=8t0x6&height=40&width=40&query=abstract avatar ${post.author}`}
                            />
                            <AvatarFallback>{post.author[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">
                            {post.author}
                            {post.isCounselor && (
                              <Badge
                                variant="outline"
                                className="ml-1 text-[#7EAED9] border-[#D0E3F2] text-xs rounded-full"
                              >
                                상담사
                              </Badge>
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        <span>조회 {post.views}</span>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="text-center py-10 bg-white rounded-3xl shadow-sm">
                <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">검색 결과가 없습니다</h3>
                <p className="text-gray-500">다른 검색어를 입력하거나 필터를 변경해보세요.</p>
              </div>
            )}
          </div>

          {/* 게시판 이용 안내 */}
          <div className="bg-white rounded-3xl shadow-sm p-8 max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">게시판 이용 안내</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <span className="font-medium">정보 제공 목적:</span> 이 게시판은 성소수자 청소년과 앨라이들을 위한
                정보와 자료를 제공하는 공간입니다. 모든 게시글은 관리자와 전문가에 의해 작성되었습니다.
              </p>
              <p>
                <span className="font-medium">상호작용 불가:</span> 현재 게시판은 정보 제공 목적으로만 운영되며,
                댓글이나 게시글 작성 기능은 제공되지 않습니다. 질문이나 상담이 필요하시면 1:1 상담을 이용해주세요.
              </p>
              <p>
                <span className="font-medium">전문가 자료:</span> 게시판의 많은 자료는 전문 상담사와 교육자들에 의해
                검증되었습니다. 더 깊은 상담이 필요한 경우 1:1 상담을 신청해주세요.
              </p>
            </div>
            <div className="mt-6 flex justify-center">
              <Button className="rounded-full bg-[#A091E6] hover:bg-[#8A7DD1] text-white">
                <Link href="/lever">🎯 레버당기기</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
