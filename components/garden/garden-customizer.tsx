"use client"

import type React from "react"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Lock } from "lucide-react"
import { motion } from "framer-motion"

interface GardenCustomizerProps {
  customizations: {
    theme: string
    items: string[]
    background: string
  }
  setCustomizations: React.Dispatch<
    React.SetStateAction<{
      theme: string
      items: string[]
      background: string
    }>
  >
  level: number
}

export function GardenCustomizer({ customizations, setCustomizations, level }: GardenCustomizerProps) {
  const backgrounds = [
    { value: "day", label: "낮", image: "/backgrounds/day.png", minLevel: 1 },
    { value: "sunset", label: "노을", image: "/backgrounds/sunset.png", minLevel: 2 },
    { value: "night", label: "밤", image: "/backgrounds/night.png", minLevel: 3 },
  ]

  const items = [
    { value: "tree", label: "나무", minLevel: 1 },
    { value: "bench", label: "벤치", minLevel: 1 },
    { value: "flowers", label: "꽃", minLevel: 2 },
    { value: "pond", label: "연못", minLevel: 3 },
    { value: "swing", label: "그네", minLevel: 4 },
    { value: "rainbow", label: "무지개", minLevel: 5 },
  ]

  const toggleItem = (item: string) => {
    setCustomizations((prev) => {
      if (prev.items.includes(item)) {
        return { ...prev, items: prev.items.filter((i) => i !== item) }
      } else {
        return { ...prev, items: [...prev.items, item] }
      }
    })
  }

  const isItemLocked = (minLevel: number) => {
    return level < minLevel
  }

  const handleBackgroundChange = (background: string, image: string) => {
    setCustomizations((prev) => ({
      ...prev,
      theme: background,
      background: image,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>배경</Label>
        <div className="grid grid-cols-3 gap-4">
          {backgrounds.map((bg) => (
            <motion.div
              key={bg.value}
              whileHover={{ scale: isItemLocked(bg.minLevel) ? 1 : 1.05 }}
              whileTap={{ scale: isItemLocked(bg.minLevel) ? 1 : 0.95 }}
              className={`
                relative rounded-xl overflow-hidden border-2 transition-all
                ${isItemLocked(bg.minLevel) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                ${customizations.theme === bg.value ? "border-[#01CDFE] ring-2 ring-blue-100" : "border-gray-200"}
              `}
              onClick={() => !isItemLocked(bg.minLevel) && handleBackgroundChange(bg.value, bg.image)}
            >
              <div className="relative h-24 w-full">
                <Image src={bg.image || "/placeholder.svg"} alt={bg.label} fill className="object-cover" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                {isItemLocked(bg.minLevel) && (
                  <div className="bg-black/50 text-white p-2 rounded-full">
                    <Lock className="h-5 w-5" />
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-1 text-center">
                {bg.label}
                {isItemLocked(bg.minLevel) && <span className="text-xs block">레벨 {bg.minLevel} 필요</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>아이템</Label>
        <div className="grid grid-cols-2 gap-2">
          {items.map((item) => (
            <div
              key={item.value}
              className={`
                border rounded-md p-3 flex items-center space-x-2 transition-all
                ${customizations.items.includes(item.value) ? "border-[#01CDFE] bg-blue-50" : "border-gray-200"}
                ${isItemLocked(item.minLevel) ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-[#01CDFE] hover:bg-blue-50"}
              `}
              onClick={() => !isItemLocked(item.minLevel) && toggleItem(item.value)}
            >
              <input
                type="checkbox"
                checked={customizations.items.includes(item.value)}
                onChange={() => {}}
                disabled={isItemLocked(item.minLevel)}
                className="rounded text-[#01CDFE] focus:ring-[#01CDFE]"
              />
              <span className="flex-1">{item.label}</span>
              {isItemLocked(item.minLevel) && (
                <Badge variant="outline" className="ml-auto">
                  <Lock className="h-3 w-3 mr-1" />
                  레벨 {item.minLevel}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
