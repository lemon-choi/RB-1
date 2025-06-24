'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Book, Users, User, Target } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    href: "/",
    icon: Home,
    label: "홈"
  },
  {
    href: "/dictionary",
    icon: Book,
    label: "용어사전"
  },
  {
    href: "/identity-quiz",
    icon: Target,
    label: "테스트"
  },
  {
    href: "/board",
    icon: Users,
    label: "게시판"
  },
  {
    href: "/profile",
    icon: User,
    label: "프로필"
  }
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg md:hidden">
      <div className="flex">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-2 px-1 transition-colors",
                isActive 
                  ? "text-[#FF71CE]" 
                  : "text-gray-600 hover:text-[#FF71CE]"
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}