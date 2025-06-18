"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle, Gift } from "lucide-react"
import { motion } from "framer-motion"

interface DailyQuestProps {
  onComplete: (points: number) => void
}

export function DailyQuest({ onComplete }: DailyQuestProps) {
  const [quests, setQuests] = useState([
    {
      id: 1,
      title: "용어사전에서 3개의 용어 읽기",
      points: 20,
      completed: false,
    },
    {
      id: 2,
      title: "미니게임 1회 플레이하기",
      points: 30,
      completed: false,
    },
    {
      id: 3,
      title: "게시판에 글 읽기",
      points: 15,
      completed: false,
    },
  ])

  const completeQuest = (id: number) => {
    setQuests((prev) => prev.map((quest) => (quest.id === id ? { ...quest, completed: true } : quest)))

    const quest = quests.find((q) => q.id === id)
    if (quest && !quest.completed) {
      onComplete(quest.points)
    }
  }

  const completedCount = quests.filter((q) => q.completed).length
  const totalQuests = quests.length
  const progress = (completedCount / totalQuests) * 100

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">
          진행도: {completedCount}/{totalQuests}
        </span>
        <span className="text-sm font-medium">{progress.toFixed(0)}%</span>
      </div>
      <Progress
        value={progress}
        className="h-2 bg-gray-100"
        indicatorClassName="bg-gradient-to-r from-[#FF71CE] via-[#FFF152] via-[#01CDFE] to-[#B967FF]"
      />

      <div className="space-y-3 mt-4">
        {quests.map((quest) => (
          <motion.div
            key={quest.id}
            whileHover={{ scale: quest.completed ? 1 : 1.02 }}
            className={`
              flex items-center justify-between p-3 rounded-2xl border
              ${
                quest.completed
                  ? "bg-[#F5FDFF] border-[#CCF7FF]"
                  : "bg-white border-gray-200 hover:border-[#FFCCE8] hover:bg-[#FFF5FB]"
              }
              transition-colors
            `}
          >
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className={`p-0 h-auto mr-3 ${quest.completed ? "text-[#01CDFE]" : "text-gray-400"}`}
                onClick={() => completeQuest(quest.id)}
                disabled={quest.completed}
              >
                {quest.completed ? <CheckCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
              </Button>
              <span className={quest.completed ? "line-through text-gray-500" : "text-gray-700"}>{quest.title}</span>
            </div>
            <div className="flex items-center">
              <span className={`font-medium ${quest.completed ? "text-[#01CDFE]" : "text-[#FF71CE]"}`}>
                +{quest.points}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {completedCount === totalQuests && (
        <motion.div
          className="mt-4 p-4 bg-[#F5FDFF] border border-[#CCF7FF] rounded-2xl text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Gift className="h-8 w-8 text-[#01CDFE] mx-auto mb-2" />
          <p className="text-[#01CDFE] font-medium">모든 미션 완료!</p>
          <p className="text-sm text-[#01CDFE]/80">내일 새로운 미션이 기다려요.</p>
        </motion.div>
      )}
    </div>
  )
}
