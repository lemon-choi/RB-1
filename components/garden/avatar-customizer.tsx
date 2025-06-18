"use client"

import type React from "react"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

interface AvatarCustomizerProps {
  customizations: {
    character: string
    accessory: string | null
    outfit: string | null
  }
  setCustomizations: React.Dispatch<
    React.SetStateAction<{
      character: string
      accessory: string | null
      outfit: string | null
    }>
  >
}

export function AvatarCustomizer({ customizations, setCustomizations }: AvatarCustomizerProps) {
  const characters = [
    { value: "/characters/muji1.png", label: "무지 1" },
    { value: "/characters/muji2.png", label: "무지 2" },
    { value: "/characters/muji3.png", label: "무지 3" },
  ]

  const accessories = [
    { value: null, label: "없음" },
    // Add accessories when available
  ]

  const outfits = [
    { value: null, label: "없음" },
    // Add outfits when available
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>캐릭터 선택</Label>
        <div className="grid grid-cols-3 gap-4">
          {characters.map((character) => (
            <motion.div
              key={character.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                cursor-pointer rounded-xl p-2 border-2 transition-all
                ${
                  customizations.character === character.value
                    ? "border-[#FF71CE] bg-pink-50"
                    : "border-gray-200 hover:border-gray-300"
                }
              `}
              onClick={() => setCustomizations((prev) => ({ ...prev, character: character.value }))}
            >
              <div className="relative h-24 w-full">
                <Image
                  src={character.value || "/placeholder.svg"}
                  alt={character.label}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-center mt-2 text-sm">{character.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>액세서리</Label>
        <div className="p-4 rounded-xl bg-gray-50 text-center">
          <p className="text-gray-500">액세서리는 준비 중입니다!</p>
          <p className="text-sm text-gray-400">곧 다양한 액세서리가 추가될 예정이에요.</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label>의상</Label>
        <div className="p-4 rounded-xl bg-gray-50 text-center">
          <p className="text-gray-500">의상은 준비 중입니다!</p>
          <p className="text-sm text-gray-400">곧 다양한 의상이 추가될 예정이에요.</p>
        </div>
      </div>
    </div>
  )
}
