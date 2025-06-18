"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Trash2, Search, RefreshCw } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { RainbowText } from "@/components/rainbow-text"

interface Post {
  id: string;
  title: string;
  category: string;
  author: {
    username: string;
    role: string;
  };
  createdAt: string;
  views: number;
  isOfficial: boolean;
}

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export default function ManageBoardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState<Post[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)


  // 사용자 정보 로드
  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 가져오기
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      // 로그인 페이지로 리다이렉트
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      // 관리자가 아니면 접근 불가
      if (parsedUser.role !== 'admin') {
        router.push("/board");
        return;
      }
      
      setIsAdmin(true);
      
      // API 호출하여 게시글 목록 가져오기
      fetchPosts(token);
    } catch (error) {
      console.error("Failed to parse user data:", error);
      router.push("/login");
    }
  }, [router]);

  // 게시글 목록 가져오기
  const fetchPosts = async (token: string) => {
    setIsLoading(true);
    try {
      // 로컬 스토리지에서 게시글 가져오기
      const storedPosts = localStorage.getItem("boardPosts");
      if (storedPosts) {
        const parsedPosts = JSON.parse(storedPosts);
        // 관리 페이지용 데이터 형식으로 변환
        const managePosts = parsedPosts.map((post: any) => ({
          id: post.id,
          title: post.title,
          category: post.category,
          author: {
            username: post.author,
            role: post.isCounselor ? "counselor" : (post.isOfficial ? "admin" : "user")
          },
          createdAt: post.date + "T12:00:00Z",
          views: post.views,
          isOfficial: post.isOfficial || false
        }));
        setPosts(managePosts);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error("게시글 목록 로드 오류:", error);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 게시글 삭제
  const handleDeletePost = async (postId: string) => {
    if (!confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      return;
    }
    
    try {
      // 로컬 스토리지에서 게시글 삭제
      const storedPosts = localStorage.getItem("boardPosts");
      if (storedPosts) {
        const parsedPosts = JSON.parse(storedPosts);
        const updatedPosts = parsedPosts.filter((post: any) => post.id !== postId);
        localStorage.setItem("boardPosts", JSON.stringify(updatedPosts));
      }
      
      // 현재 화면에서도 삭제
      setPosts(posts.filter(post => post.id !== postId));
      alert("게시글이 성공적으로 삭제되었습니다.");
      
    } catch (error) {
      console.error("게시글 삭제 오류:", error);
      alert("게시글 삭제 중 오류가 발생했습니다.");
    }
  };

  // 게시글 검색
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <Button 
              className="flex items-center text-gray-600"
              variant="outline"
              onClick={() => fetchPosts(localStorage.getItem("token") || "")}
              disabled={isLoading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              새로고침
            </Button>
          </div>

          <Card className="rounded-3xl shadow-md border-gray-200 mb-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                <RainbowText>게시판 관리</RainbowText>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative max-w-md mx-auto mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="게시글 검색..."
                  className="pl-10 bg-white border-gray-200 focus:border-[#A091E6] rounded-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="rounded-xl overflow-hidden border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[400px]">제목</TableHead>
                      <TableHead>카테고리</TableHead>
                      <TableHead>작성자</TableHead>
                      <TableHead>작성일</TableHead>
                      <TableHead>조회수</TableHead>
                      <TableHead className="text-right">관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPosts.length > 0 ? (
                      filteredPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">
                            {post.title}
                            {post.isOfficial && (
                              <Badge variant="outline" className="ml-2 text-[#E8D595] border-[#F5EDD5] rounded-full">
                                공식 자료
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                post.category === "정보"
                                  ? "bg-[#F5F9FD] text-[#7EAED9]"
                                  : post.category === "경험"
                                  ? "bg-[#F7F5FC] text-[#A091E6]"
                                  : post.category === "자료"
                                  ? "bg-[#FDFBF5] text-[#E8D595]"
                                  : "bg-[#FEF6F2] text-[#F3B391]"
                              }
                            >
                              {post.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {post.author.username}
                            {post.author.role === "counselor" && (
                              <Badge
                                variant="outline"
                                className="ml-1 text-[#7EAED9] border-[#D0E3F2] text-xs rounded-full"
                              >
                                상담사
                              </Badge>
                            )}
                            {post.author.role === "admin" && (
                              <Badge
                                variant="outline"
                                className="ml-1 text-[#F3B391] border-[#FDEEE7] text-xs rounded-full"
                              >
                                관리자
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>{post.views}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleDeletePost(post.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6">
                          {isLoading ? "게시글 로딩 중..." : "게시글이 없습니다."}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Link href="/board/create">
              <Button className="flex items-center bg-[#A091E6] hover:bg-[#8A7DD1] text-white rounded-full">
                새 게시글 작성
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}