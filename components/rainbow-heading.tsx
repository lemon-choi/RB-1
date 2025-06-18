import type React from "react"
import { cn } from "@/lib/utils"

interface RainbowHeadingProps {
  children: React.ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p"
}

export function RainbowHeading({ children, className, as = "h2" }: RainbowHeadingProps) {
  const Component = as

  return (
    <Component
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r from-[#FF71CE] via-[#FFF152] via-[#00F5A0] via-[#7FD8FF] to-[#FF9D00] animate-gradient-x",
        className,
      )}
      style={{
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
    </Component>
  )
}
