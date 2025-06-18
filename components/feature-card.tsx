"use client"

import Link from "next/link"
import { ArrowRight, Heart, BookOpen, Gamepad, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface FeatureCardProps {
  icon: "heart" | "book" | "gamepad" | "message-square"
  title: string
  description: string
  href: string
  color: "pink" | "yellow" | "green" | "orange"
}

export function FeatureCard({ icon, title, description, href, color }: FeatureCardProps) {
  // 2020년대 스타일의 색상 클래스
  const colorClasses = {
    pink: "group-hover:text-[#FF71CE] group-hover:border-[#FF71CE] group-hover:bg-[#FFF5F9]",
    yellow: "group-hover:text-[#FFF152] group-hover:border-[#FFF152] group-hover:bg-[#FFFEF0]",
    green: "group-hover:text-[#00F5A0] group-hover:border-[#00F5A0] group-hover:bg-[#F0FFF5]",
    orange: "group-hover:text-[#FF9D00] group-hover:border-[#FF9D00] group-hover:bg-[#FFF9F0]",
  }

  const iconMap = {
    heart: <Heart className="h-6 w-6" />,
    book: <BookOpen className="h-6 w-6" />,
    gamepad: <Gamepad className="h-6 w-6" />,
    "message-square": <MessageSquare className="h-6 w-6" />,
  }

  // 아이콘 색상 클래스
  const iconColorClasses = {
    pink: "text-[#FF71CE]",
    yellow: "text-[#FFF152]",
    green: "text-[#00F5A0]",
    orange: "text-[#FF9D00]",
  }

  // 배경 색상 클래스
  const bgColorClasses = {
    pink: "bg-[#FFF5F9]",
    yellow: "bg-[#FFFEF0]",
    green: "bg-[#F0FFF5]",
    orange: "bg-[#FFF9F0]",
  }

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        className={cn(
          "group flex flex-col h-full rounded-[10px] border border-gray-100 bg-white p-6 transition-all duration-200",
          "hover:border-transparent",
          colorClasses[color],
        )}
      >
        <div
          className={cn(
            "mb-4 flex items-center justify-center w-12 h-12 rounded-[10px]",
            bgColorClasses[color],
            iconColorClasses[color],
          )}
        >
          {iconMap[icon]}
        </div>
        <h3 className="mb-2 text-xl font-semibold text-[#333333]">{title}</h3>
        <p className="mb-6 flex-1 text-[#555555]">{description}</p>
        <div className="mt-auto flex items-center text-[#777777] group-hover:text-current">
          <span>자세히 보기</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </motion.div>
    </Link>
  )
}
