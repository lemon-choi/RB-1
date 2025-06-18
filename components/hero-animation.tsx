"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export function HeroAnimation() {
  const [currentImage, setCurrentImage] = useState(0)
  const [currentBackground, setCurrentBackground] = useState(0)
  const images = ["/characters/muji1.png", "/characters/muji2.png", "/characters/muji3.png"]
  const backgrounds = ["/backgrounds/day.png", "/backgrounds/sunset.png", "/backgrounds/night.png"]
  const backgroundLabels = ["낮", "노을", "밤"]

  useEffect(() => {
    // 캐릭터 이미지 변경 인터벌
    const characterInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3000)

    // 배경 이미지 변경 인터벌
    const backgroundInterval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgrounds.length)
    }, 7000)

    return () => {
      clearInterval(characterInterval)
      clearInterval(backgroundInterval)
    }
  }, [images.length, backgrounds.length])

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden rounded-3xl">
      {/* 배경 이미지 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentBackground}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={backgrounds[currentBackground] || "/placeholder.svg"}
            alt={`${backgroundLabels[currentBackground]} 배경`}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* 무지개 테두리 효과 */}
      <div className="absolute inset-0 rounded-3xl p-0.5 bg-gradient-to-r from-[#FF71CE] via-[#FFF152] via-[#00F5A0] via-[#7FD8FF] to-[#FF9D00] opacity-40"></div>

      {/* 캐릭터 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative h-64 w-64 z-10"
        >
          <Image
            src={images[currentImage] || "/placeholder.svg"}
            alt="Rainbow Buddy 캐릭터"
            fill
            className="object-contain"
          />
        </motion.div>
      </AnimatePresence>

      {/* 배경 인디케이터 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {backgrounds.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentBackground ? "bg-white w-6" : "bg-white/50"
            }`}
            onClick={() => setCurrentBackground(index)}
            aria-label={`${backgroundLabels[index]} 배경으로 변경`}
          />
        ))}
      </div>
    </div>
  )
}
