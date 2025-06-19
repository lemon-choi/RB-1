"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Calendar, Eye } from "lucide-react"
import Image from "next/image"
import { MainNav } from "@/components/main-nav"

// 게시글 타입 정의
interface Post {
  id: string
  title: string
  content: string
  category: "공지" | "정보" | "칼럼" | "자료" 
  author: string
  date: string
  views: number
  isOfficial?: boolean
  isCounselor?: boolean
  images?: string[]
  relatedLinks?: {
    title: string
    url: string
  }[]
}

export default function PostDetailPage() {
  const params = useParams()
  const postId = params.id as string
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // localStorage에서 게시글 데이터 가져오기
  useEffect(() => {
    const loadPost = () => {
      try {
        const storedPosts = localStorage.getItem("boardPosts");
        if (storedPosts) {
          const posts = JSON.parse(storedPosts);
          const foundPost = posts.find((p: Post) => p.id === postId);
          
          if (foundPost) {
            // 조회수 증가
            const updatedPosts = posts.map((p: Post) => 
              p.id === postId ? { ...p, views: (p.views || 0) + 1 } : p
            );
            localStorage.setItem("boardPosts", JSON.stringify(updatedPosts));
            
            // 조회수가 증가된 게시글로 설정
            setPost({ ...foundPost, views: (foundPost.views || 0) + 1 });
          } else {
            setPost(null);
          }
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("게시글 로드 오류:", error);
        setPost(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [postId]);

  // 로딩 중
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#FEF9F2]">
        <MainNav />
        <main className="flex-1 pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-20">
              <h1 className="text-xl font-medium mb-4">게시글 로딩 중...</h1>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // 샘플 게시글 데이터 (fallback용)
  const samplePosts: Record<string, Post> = {
    sample1: {
      id: "sample1",
      title: "[공지] 6월 서울퀴어퍼레이드 안내",
      content: `6월 14일에 열리는 제 26회 서울퀴어퍼레이드에 여러분을 초대합니다. 다양한 부스와 무대 공연, 행진이 준비되어 있으니 많은 참여 부탁드립니다.

**행사 개요**
\n
- 일시: 2025년 6월 14일 (토)
\n
- 장소: 서울시 남대문로 및 우정국로 일대
\n
- 대상: 퀴어 문화축제를 즐기고 싶은 누구나
\n\n


더 자세한 정보는 서울퀴어문화축제 공식 웹사이트 및 인스타그램 계정을 참고해 주세요.
\n
공식 웹사이트: www.sqcf.org/link
\n
인스타그램: @sqcforg`,
      category: "공지",
      author: "명동 상담사",
      date: "2023-05-20",
      views: 342,
      isOfficial: true,
      isCounselor: true,
      images: ["/sqcforg.jpg"],
    },
    sample2: {
      id: "sample2",
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
    sample3: {
      id: "sample3",
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
    sample4: {
      id: "sample4",
      title: "처음으로 커밍아웃했던 날",
      content: `오늘은 제가 처음으로 친구에게 커밍아웃했던 경험을 나누고 싶습니다. 많은 고민과 두려움이 있었지만...

**결심의 순간**
고등학교 2학년 때였습니다. 더 이상 혼자서 이 무거운 비밀을 안고 살 수 없다는 생각이 들었어요. 가장 가까운 친구 한 명에게라도 진실을 말하고 싶었습니다.

**대화의 시작**
"너에게 말하고 싶은 게 있어"라고 시작했습니다. 심장이 터질 것 같았지만, 용기를 내어 제 성향에 대해 이야기했어요.

**친구의 반응**
다행히 친구는 저를 받아들여 주었습니다. "그래서 뭐? 너는 여전히 내 소중한 친구야"라고 말해줘서 정말 감사했어요.

**그 이후**
커밍아웃 후 마음이 한결 가벼워졌습니다. 물론 모든 사람에게 말할 필요는 없지만, 믿을 수 있는 사람 한 명이라도 있다는 것이 큰 힘이 되었습니다.`,
      category: "칼럼",
      author: "레인보우 청년",
      date: "2023-05-12",
      views: 156,
    },
  }

  // localStorage에서 찾지 못한 경우 샘플 데이터에서 찾기
  const finalPost = post || samplePosts[postId];

  // 게시글이 없는 경우
  if (!finalPost) {
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
    칼럼: "bg-[#F7F5FC] text-[#A091E6] hover:bg-[#F0EDFA] rounded-full",
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
                    <Badge className={categoryColors[finalPost.category]}>{finalPost.category}</Badge>
                    {finalPost.isOfficial && (
                      <Badge variant="outline" className="text-[#E8D595] border-[#F5EDD5] rounded-full">
                        공식 자료
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">{finalPost.title}</h1>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage
                          src={`/abstract-avatar.png?key=8t0x6&height=40&width=40&query=abstract avatar ${finalPost.author}`}
                        />
                        <AvatarFallback>{finalPost.author[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {finalPost.author}
                        {finalPost.isCounselor && (
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
                        <span>{finalPost.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{finalPost.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="py-6">
                <div className="prose max-w-none">
                  {finalPost.content.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph.split('**').map((part, idx) => 
                        idx % 2 === 1 ? <strong key={idx} className="font-semibold text-gray-900">{part}</strong> : part
                      )}
                    </p>
                  ))}
                </div>

                {/* 이미지 섹션 */}
                {finalPost.images && finalPost.images.length > 0 && (
                  <div className="mt-6 space-y-4">
                    {finalPost.images.map((imageSrc, index) => (
                      <div key={index} className="relative w-full rounded-2xl overflow-hidden">
                        <Image
                          src={imageSrc}
                          alt={`게시글 이미지 ${index + 1}`}
                          width={800}
                          height={400}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {finalPost.relatedLinks && finalPost.relatedLinks.length > 0 && (
                  <div className="mt-8 bg-[#F5F9FD] p-4 rounded-2xl">
                    <h3 className="font-semibold text-[#7EAED9] mb-2">관련 링크</h3>
                    <ul className="space-y-2">
                      {finalPost.relatedLinks.map((link, index) => (
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
