import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface RainbowTextProps {
  children: ReactNode
  className?: string
  animate?: boolean
}

export function RainbowText({ children, className, animate = true }: RainbowTextProps) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r from-[#FF71CE] via-[#FFF152] via-[#00F5A0] via-[#7FD8FF] to-[#FF9D00]",
        animate && "animate-gradient-x",
        className,
      )}
      style={{
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundSize: "400% 400%",
        fontWeight: "bold",
      }}
    >
      {children}
    </span>
  )
}
