"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, X } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { RainbowText } from "@/components/rainbow-text"

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export default function CreatePostPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isCounselor, setIsCounselor] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "정보",
    isOfficial: false,
  })

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
      setIsAdmin(parsedUser.role === 'admin');
      setIsCounselor(parsedUser.role === 'counselor');
      
      // 관리자나 상담사가 아니면 접근 불가
      if (parsedUser.role !== 'admin' && parsedUser.role !== 'counselor') {
        router.push("/board");
      }
    } catch (error) {
      console.error("Failed to parse user data:", error);
      router.push("/login");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 새 게시글 생성
      const newPost = {
        id: `post_${Date.now()}`,
        title: formData.title,
        content: formData.content,
        category: formData.category as "정보" | "경험" | "자료" | "공지",
        author: user?.username || "익명",
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD 형식
        views: 0,
        isOfficial: isAdmin ? formData.isOfficial : false,
        isCounselor: isCounselor,
      };

      // 로컬 스토리지에서 기존 게시글 가져오기
      const storedPosts = localStorage.getItem("boardPosts");
      const posts = storedPosts ? JSON.parse(storedPosts) : [];
      
      // 새 게시글 추가
      posts.push(newPost);
      
      // 로컬 스토리지에 저장
      localStorage.setItem("boardPosts", JSON.stringify(posts));

      // 성공하면 게시판으로 리다이렉트
      router.push("/board");
    } catch (error) {
      console.error("게시글 작성 오류:", error);
      alert("게시글 작성 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

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

          <div className="max-w-2xl mx-auto">
            <Card className="rounded-3xl shadow-md border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  <RainbowText>게시글 작성</RainbowText>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">제목</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="게시글 제목을 입력하세요"
                      className="rounded-xl"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">카테고리</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="카테고리 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="정보">정보</SelectItem>
                        <SelectItem value="경험">경험담</SelectItem>
                        <SelectItem value="자료">자료</SelectItem>
                        {isAdmin && <SelectItem value="공지">공지</SelectItem>}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">내용</Label>
                    <Textarea
                      id="content"
                      name="content"
                      placeholder="게시글 내용을 입력하세요"
                      className="min-h-[200px] rounded-xl resize-y"
                      value={formData.content}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {isAdmin && (
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isOfficial"
                        checked={formData.isOfficial}
                        onCheckedChange={(checked) => handleSwitchChange("isOfficial", checked)}
                      />
                      <Label htmlFor="isOfficial" className="font-medium">공식 자료로 표시</Label>
                    </div>
                  )}
                </form>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => router.push("/board")}
                  disabled={isLoading}
                >
                  <X className="mr-2 h-4 w-4" />
                  취소
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl bg-[#A091E6] hover:bg-[#8A7DD1] text-white"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "저장 중..." : "저장"}
                </Button>
              </CardFooter>
            </Card>

            <div className="mt-8 bg-white rounded-3xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">게시글 작성 안내</h2>
              <div className="space-y-4 text-gray-600 text-sm">
                <p>
                  <span className="font-medium">정보 제공:</span> 게시글은 성소수자 청소년들에게 유용한 정보와 자료를 제공하는 목적으로 작성해주세요.
                </p>
                <p>
                  <span className="font-medium">내용 검증:</span> 모든 게시글은 관리자에 의해 검토될 수 있으며, 부적절한 내용은 삭제될 수 있습니다.
                </p>
                <p>
                  <span className="font-medium">책임감 있는 글쓰기:</span> 정확하고 검증된 정보를 제공하고, 다양한 의견을 존중하는 글쓰기를 지향해주세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}