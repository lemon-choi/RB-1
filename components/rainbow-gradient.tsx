import { cn } from "@/lib/utils"

interface RainbowGradientProps {
  className?: string
}

export function RainbowGradient({ className }: RainbowGradientProps) {
  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)}>
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF71CE] via-[#FFF152] via-[#00F5A0] via-[#7FD8FF] to-[#FF9D00]"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#FF71CE]/20 rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-[#FFF152]/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-60 w-96 h-96 bg-[#00F5A0]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-40 w-96 h-96 bg-[#FF9D00]/20 rounded-full blur-3xl"></div>
    </div>
  )
}
