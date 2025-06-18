import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface RainbowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export const RainbowButton = forwardRef<HTMLButtonElement, RainbowButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <Button
        className={cn(
          variant === "default"
            ? "bg-gradient-to-r from-[#FF71CE] via-[#FFF152] to-[#01CDFE] hover:opacity-90 text-white shadow-md"
            : "bg-white border-2 border-transparent bg-clip-padding hover:bg-gradient-to-r hover:from-[#FF71CE] hover:via-[#FFF152] hover:to-[#01CDFE] hover:text-white",
          "relative rounded-full transition-all duration-300 before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-[#FF71CE] before:via-[#FFF152] before:to-[#01CDFE] before:p-0.5 before:-z-10",
          className,
        )}
        size={size}
        ref={ref}
        {...props}
      />
    )
  },
)

RainbowButton.displayName = "RainbowButton"
