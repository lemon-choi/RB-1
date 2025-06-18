"use client"

import { useRef } from "react"
import Image from "next/image"

interface GardenCanvasProps {
  avatarCustomizations: {
    character: string
    accessory: string | null
    outfit: string | null
  }
  gardenCustomizations: {
    theme: string
    items: string[]
    background: string
  }
}

export function GardenCanvas({ avatarCustomizations, gardenCustomizations }: GardenCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 배경 이미지 선택
  const getBackgroundImage = () => {
    switch (gardenCustomizations.background) {
      case "sunset":
        return "/backgrounds/sunset.png"
      case "night":
        return "/backgrounds/night.png"
      default:
        return "/backgrounds/day.png"
    }
  }

  // 캐릭터 이미지 선택
  const getCharacterImage = () => {
    return avatarCustomizations.character || "/characters/muji1.png"
  }

  return (
    <div className="relative w-full h-[500px] rounded-3xl overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <Image
          src={getBackgroundImage() || "/placeholder.svg"}
          alt="Garden background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* 아이템들 */}
      {gardenCustomizations.items.includes("tree") && (
        <div className="absolute left-1/4 bottom-[20%]">
          <div className="relative w-20 h-32">
            {/* 나무 줄기 */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-16 bg-[#8B4513] rounded-sm"></div>
            {/* 나무 잎 */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-[#4CAF50] rounded-full"></div>
          </div>
        </div>
      )}

      {gardenCustomizations.items.includes("bench") && (
        <div className="absolute right-1/4 bottom-[22%]">
          <div className="relative w-24 h-12">
            {/* 벤치 다리 */}
            <div className="absolute bottom-0 left-1 w-2 h-6 bg-[#A1887F]"></div>
            <div className="absolute bottom-0 right-1 w-2 h-6 bg-[#A1887F]"></div>
            {/* 벤치 좌석 */}
            <div className="absolute bottom-6 left-0 w-24 h-2 bg-[#A1887F]"></div>
          </div>
        </div>
      )}

      {/* 캐릭터 */}
      <div className="absolute left-1/2 bottom-[25%] transform -translate-x-1/2">
        <div className="relative h-32 w-32">
          <Image src={getCharacterImage() || "/placeholder.svg"} alt="Character" fill className="object-contain" />
        </div>
      </div>
    </div>
  )
}
