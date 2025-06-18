"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GardenCanvas } from "@/components/garden/garden-canvas"
import { AvatarCustomizer } from "@/components/garden/avatar-customizer"
import { GardenCustomizer } from "@/components/garden/garden-customizer"
import { DailyQuest } from "@/components/garden/daily-quest"
import { ArrowLeft, Save, Sparkles, Share2 } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { RainbowText } from "@/components/rainbow-text"
import { motion } from "framer-motion"

export default function GardenPage() {
  const [avatarCustomizations, setAvatarCustomizations] = useState({
    character: "/characters/muji1.png",
    accessory: null,
    outfit: null,
  })

  const [gardenCustomizations, setGardenCustomizations] = useState({
    theme: "day",
    items: ["tree", "bench"],
    background: "/backgrounds/day.png",
  })

  const [experience, setExperience] = useState(0)
  const [level, setLevel] = useState(1)
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false)

  // Calculate level based on experience
  useEffect(() => {
    const newLevel = Math.floor(experience / 100) + 1
    if (newLevel !== level) {
      setLevel(newLevel)
    }
  }, [experience, level])

  const completeQuest = (points: number) => {
    setExperience((prev) => prev + points)
  }

  const handleSave = () => {
    // In a real app, this would save to a database
    setShowSaveConfirmation(true)
    setTimeout(() => setShowSaveConfirmation(false), 3000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#F0FCFF] to-white">
      <MainNav />

      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <Link href="/">
              <Button variant="ghost" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                홈으로 돌아가기
              </Button>
            </Link>
            <div className="flex items-center gap-4 flex-wrap">
              <motion.div
                className="flex items-center rounded-full bg-white px-4 py-2 shadow-md min-w-[150px]"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="h-5 w-5 text-[#FFF152] mr-2 flex-shrink-0" />
                <span className="font-medium whitespace-nowrap">레벨 {level}</span>
                <div className="ml-2 bg-gray-100 rounded-full h-2 w-24 flex-shrink-0">
                  <div
                    className="bg-gradient-to-r from-[#FF71CE] via-[#FFF152] via-[#01CDFE] to-[#B967FF] h-2 rounded-full"
                    style={{ width: `${experience % 100}%` }}
                  ></div>
                </div>
              </motion.div>
              <div className="flex gap-2">
                <Button
                  className="rounded-full bg-gradient-to-r from-[#01CDFE] to-[#4FDFFF] hover:opacity-90 text-white shadow-md shadow-blue-200/30 transition-all duration-300"
                  onClick={() => {
                    // Share functionality would go here
                    alert("공유 기능은 준비 중입니다!")
                  }}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  공유하기
                </Button>
                <Button
                  className="rounded-full bg-gradient-to-r from-[#FF71CE] to-[#FF9DE6] hover:opacity-90 text-white shadow-md shadow-pink-200/30 transition-all duration-300"
                  onClick={handleSave}
                >
                  <Save className="mr-2 h-4 w-4" />
                  저장하기
                </Button>
              </div>
            </div>
          </div>

          {showSaveConfirmation && (
            <motion.div
              className="fixed top-20 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              저장되었습니다!
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                className="overflow-hidden rounded-3xl bg-white shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <GardenCanvas avatarCustomizations={avatarCustomizations} gardenCustomizations={gardenCustomizations} />
              </motion.div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <motion.div
                className="rounded-3xl bg-white p-6 shadow-xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  나만의 <RainbowText>무지개 동산</RainbowText>
                </h2>

                <Tabs defaultValue="avatar">
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="avatar" className="rounded-full">
                      아바타
                    </TabsTrigger>
                    <TabsTrigger value="garden" className="rounded-full">
                      동산
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="avatar">
                    <AvatarCustomizer
                      customizations={avatarCustomizations}
                      setCustomizations={setAvatarCustomizations}
                    />
                  </TabsContent>

                  <TabsContent value="garden">
                    <GardenCustomizer
                      customizations={gardenCustomizations}
                      setCustomizations={setGardenCustomizations}
                      level={level}
                    />
                  </TabsContent>
                </Tabs>
              </motion.div>

              <motion.div
                className="rounded-3xl bg-white p-6 shadow-xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">오늘의 미션</h3>
                <DailyQuest onComplete={completeQuest} />
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
