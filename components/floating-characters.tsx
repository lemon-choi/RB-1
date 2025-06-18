"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface FloatingCharacter {
  id: number
  x: number
  y: number
  image: string
  scale: number
  delay: number
}

export function FloatingCharacters() {
  const [characters, setCharacters] = useState<FloatingCharacter[]>([])

  useEffect(() => {
    // Generate random characters
    const newCharacters = [
      {
        id: 1,
        x: 10,
        y: 20,
        image: "/characters/muji1.png",
        scale: 0.5,
        delay: 0,
      },
      {
        id: 2,
        x: 80,
        y: 60,
        image: "/characters/muji2.png",
        scale: 0.4,
        delay: 1,
      },
      {
        id: 3,
        x: 30,
        y: 80,
        image: "/characters/muji3.png",
        scale: 0.6,
        delay: 2,
      },
    ]
    setCharacters(newCharacters)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {characters.map((char) => (
        <motion.div
          key={char.id}
          className="absolute"
          style={{
            left: `${char.x}%`,
            top: `${char.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.7,
            scale: char.scale,
            y: [0, -20, 0],
          }}
          transition={{
            delay: char.delay,
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <div className="relative h-20 w-20">
            <Image src={char.image || "/placeholder.svg"} alt="Floating character" fill className="object-contain" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
