"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Calendar, Eye } from "lucide-react"
import { MainNav } from "@/components/main-nav"

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
  relatedLinks?: {
    title: string
    url: string
  }[]
}

export default function PostDetailPage() {
  const params = useParams()
  const postId = params.id as string

  // 샘플 게시글 데이터 (실제로는 API에서 가져올 것)
  const posts: Record<string, Post> = {
    post1: {
      id: "post1",
      title: "성 정체성과 성적 지향의 차이점 알아보기",
      content: `성 정체성과 성적 지향은 종종 혼동되는 개념이지만, 실제로는 매우 다른 의미를 가지고 있습니다.

**성 정체성(Gender Identity)**은 자신이 어떤 성별인지에 대한 내적인 인식입니다. 이는 출생 시 지정된 성별과 일치할 수도 있고, 다를 수도 있습니다. 시스젠더는 출생 시 지정된 성별과 성 정체성이 일치하는 경우를 말하며, 트랜스젠더는 출생 시 지정된 성별과 성 정체성이 다른 경우를 말합니다. 또한 논바이너리, 젠더퀴어, 젠더플루이드 등 이분법적인 성별 구분에 속하지 않는 다양한 성 정체성이 있습니다.

**성적 지향(Sexual Orientation)**은 어떤 성별에 감정적, 로맨틱, 성적으로 끌리는지를 의미합니다. 이는 이성애, 동성애, 양성애, 범성애, 무성애 등 다양한 형태로 나타날 수 있습니다.

중요한 점은 성 정체성과 성적 지향은 서로 독립적이라는 것입니다. 예를 들어, 트랜스젠더 여성(출생 시 남성으로 지정되었지만 여성으로 정체화하는 사람)은 여성에게 끌릴 수도, 남성에게 끌릴 수도, 모든 성별에게 끌릴 수도 있습니다.

자신의 성 정체성과 성적 지향을 탐색하는 것은 개인적인 여정이며, 시간이 걸릴 수 있습니다. 중요한 것은 자신을 있는 그대로 받아들이고, 자신에게 맞는 레이블을 찾는 것이 아니라 자신을 이해하는 것입니다.`,
      category: "정보",
      author: "명동 상담사",
      date: "2023-05-15",
      views: 245,
      isCounselor: true,
      relatedLinks: [
        {
          title: "성 정체성에 대한 더 자세한 정보",
          url: "/dictionary/gender-identity",
        },
        {
          title: "성적 지향에 대한 더 자세한 정보",
          url: "/dictionary/sexual-orientation",
        },
      ],
    },
    post2: {
      id: "post2",
      title: "청소년 성소수자를 위한 안전한 공간 찾기",
      content: `청소년 성소수자들이 안전하게 자신을 표현하고 지원받을 수 있는 공간을 찾는 것은 매우 중요합니다. 이 글에서는 다양한 안전한 공간과 커뮤니티를 소개합니다.

**온라인 커뮤니티**
- 청소년 성소수자 온라인 포럼: 비슷한 경험을 가진 또래들과 소통할 수 있는 안전한 온라인 공간입니다.
- 소셜 미디어 그룹: 인스타그램, 페이스북 등에서 청소년 성소수자를 위한 비공개 그룹이 있습니다.
- 디스코드 서버: 다양한 주제로 대화할 수 있는 음성 및 텍스트 채팅 공간입니다.

**오프라인 모임**
- 청소년 센터: 많은 지역 청소년 센터에서 LGBTQ+ 청소년을 위한 프로그램을 운영합니다.
- 학교 GSA(Gender and Sexuality Alliance): 일부 학교에서는 성소수자와 앨라이를 위한 동아리가 있습니다.
- 지역 LGBTQ+ 센터: 대도시에는 성소수자를 위한 전용 센터가 있을 수 있습니다.

**안전한 공간을 찾을 때 고려할 점**
1. 비밀 보장: 참여하는 공간이 개인 정보와 비밀을 보장하는지 확인하세요.
2. 포용성: 다양한 정체성을 존중하고 포용하는 공간인지 확인하세요.
3. 전문적 지원: 필요할 때 전문가의 도움을 받을 수 있는 공간인지 확인하세요.

안전한 공간을 찾는 것이 어렵다면, 온라인 자원부터 시작하는 것이 좋습니다. 점차 자신감이 생기면 오프라인 모임에도 참여해볼 수 있습니다.`,
      category: "자료",
      author: "무지개 지원단",
      date: "2023-05-18",
      views: 189,
      isOfficial: true,
      relatedLinks: [
        {
          title: "청소년 성소수자 지원 단체 목록",
          url: "/resources/support-organizations",
        },
        {
          title: "안전한 온라인 커뮤니티 가이드",
          url: "/resources/online-communities",
        },
      ],
    },
    post3: {
      id: "post3",
      title: "[공지] 6월 청소년 퀴어 축제 안내",
      content: `6월 17일에 열리는 청소년 퀴어 축제에 여러분을 초대합니다. 다양한 워크샵과 문화 행사가 준비되어 있으니 많은 참여 부탁드립니다.

**행사 개요**
- 일시: 2023년 6월 17일 (토) 13:00 - 18:00
- 장소: 서울시 중구 청소년센터 다목적홀
- 대상: 만 13세 - 24세 청소년 (성인 동반 가능)
- 참가비: 무료

**주요 프로그램**
1. 정체성 탐색 워크샵 (13:30 - 14:30)
2. 청소년 성소수자 인권 강연 (15:00 - 16:00)
3. 문화 공연 및 교류회 (16:30 - 18:00)

**참가 신청 방법**
아래 링크를 통해 사전 등록해주세요. 사전 등록자에게는 기념품이 제공됩니다.
[사전 등록 링크: www.youthqueerfestival.org/register]

**안전 및 비밀 보장**
- 모든 참가자의 개인정보는 철저히 보호됩니다.
- 행사 중 촬영은 제한되며, 모든 사진 촬영은 동의를 받은 후에만 가능합니다.
- 행사장 입구에서 신분 확인 없이 입장 가능합니다.

더 자세한 정보는 공식 웹사이트를 참고해주세요. 궁금한 점이 있으시면 이메일로 문의해주세요: info@youthqueerfestival.org`,
      category: "공지",
      author: "명동 상담사",
      date: "2023-05-20",
      views: 342,
      isOfficial: true,
      isCounselor: true,
    },
  }

  const post = posts[postId]

  // 게시글이 없는 경우
  if (!post) {
    return (
      <div className="flex min-h-screen flex-col bg-[#FEF9F2]">
        <MainNav />
        <main className="flex-1 pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-20">
              <h1 className="text-2xl font-bold mb-4">게시글을 찾을 수 없습니다</h1>
              <p className="text-gray-600 mb-8">요청하신 게시글이 존재하지 않거나 삭제되었습니다.</p>
              <Button asChild>
                <Link href="/board">게시판으로 돌아가기</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

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
            <Link href="/board">
              <Button variant="ghost" className="flex items-center text-gray-600">
                <ArrowLeft className="mr-2 h-4 w-4" />
                게시판으로 돌아가기
              </Button>
            </Link>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="rounded-3xl border-gray-200 shadow-sm overflow-hidden">
              <CardHeader className="pb-2 border-b">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge className={categoryColors[post.category]}>{post.category}</Badge>
                    {post.isOfficial && (
                      <Badge variant="outline" className="text-[#E8D595] border-[#F5EDD5] rounded-full">
                        공식 자료
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage
                          src={`/abstract-avatar.png?key=8t0x6&height=40&width=40&query=abstract avatar ${post.author}`}
                        />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {post.author}
                        {post.isCounselor && (
                          <Badge
                            variant="outline"
                            className="ml-2 text-[#7EAED9] border-[#D0E3F2] text-xs rounded-full"
                          >
                            상담사
                          </Badge>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="py-6">
                <div className="prose max-w-none">
                  {post.content.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {post.relatedLinks && post.relatedLinks.length > 0 && (
                  <div className="mt-8 bg-[#F5F9FD] p-4 rounded-2xl">
                    <h3 className="font-semibold text-[#7EAED9] mb-2">관련 링크</h3>
                    <ul className="space-y-2">
                      {post.relatedLinks.map((link, index) => (
                        <li key={index}>
                          <Link href={link.url} className="text-[#7EAED9] hover:underline">
                            {link.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="w-full flex justify-between items-center">
                  <span className="text-sm text-gray-500">이 정보가 도움이 되셨나요?</span>
                  <Button className="rounded-full bg-[#A091E6] hover:bg-[#8A7DD1] text-white" asChild>
                    <Link href="/lever">🎯 레버당기기</Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <div className="mt-8 flex justify-center">
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/board">목록으로 돌아가기</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
