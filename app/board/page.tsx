"use client"

import { useState, useEffect } from "react"
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

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export default function BoardPage() {
  // 사용자 정보 상태
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCounselor, setIsCounselor] = useState(false);

  // 사용자 정보 로드
  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 가져오기
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAdmin(parsedUser.role === 'admin');
        setIsCounselor(parsedUser.role === 'counselor');
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  // 게시글 데이터 (로컬 스토리지에서 관리)
  const [posts, setPosts] = useState<Post[]>([])

  // 게시글 로드
  useEffect(() => {
    const storedPosts = localStorage.getItem("boardPosts");
    if (storedPosts) {
      try {
        setPosts(JSON.parse(storedPosts));
      } catch (error) {
        console.error("Failed to parse posts data:", error);
        setPosts([]);
      }
    }
  }, [])

  // 상태 관리
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // 게시글 필터링 및 정렬
  const filteredPosts = posts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())

      if (activeTab === "all") return matchesSearch
      return matchesSearch && post.category === activeTab
    })
    .sort((a, b) => {
      // 날짜순으로 내림차순 정렬 (최신 게시글이 맨 위)
      return new Date(b.date).getTime() - new Date(a.date).getTime()
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
            {/* 관리자 또는 상담사만 게시글 작성 가능 */}
            {(isAdmin || isCounselor) && (
              <div className="flex space-x-2">
                <Link href="/board/create">
                  <Button className="flex items-center bg-[#A091E6] hover:bg-[#8A7DD1] text-white rounded-full">
                    <PenSquare className="mr-2 h-4 w-4" />
                    게시글 작성
                  </Button>
                </Link>
                {isAdmin && (
                  <Link href="/board/manage">
                    <Button className="flex items-center bg-[#F3B391] hover:bg-[#F09E78] text-white rounded-full">
                      관리자 페이지
                    </Button>
                  </Link>
                )}
              </div>
            )}
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
                <span className="font-medium">전문가 작성:</span> 현재 게시판은 전문가와 관리자에 의해 관리되며,
                모든 게시글은 검증된 정보를 제공합니다. 질문이나 상담이 필요하시면 1:1 상담을 이용해주세요.
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
