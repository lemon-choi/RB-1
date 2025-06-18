import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface RainbowGradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export const RainbowGradientButton = forwardRef<HTMLButtonElement, RainbowGradientButtonProps>(
  ({ className, size = "default", ...props }, ref) => {
    return (
      <Button
        className={cn(
          "rounded-full bg-gradient-to-r from-[#FF71CE] via-[#FFF152] to-[#01CDFE] hover:opacity-90 text-white shadow-md transition-all duration-300",
          className,
        )}
        size={size}
        ref={ref}
        {...props}
      />
    )
  },
)

RainbowGradientButton.displayName = "RainbowGradientButton"
