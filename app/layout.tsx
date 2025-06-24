import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PageTransition } from "@/components/page-transition"
import { PWAInstall } from "@/components/pwa-install"
import { BottomNav } from "@/components/bottom-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rainbow Buddy",
  description: "청소년 성소수자를 위한 안전하고 친근한 디지털 공간",
  generator: 'v0.dev',
  manifest: '/manifest.json',
  themeColor: '#FF71CE',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Rainbow Buddy'
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: 'website',
    siteName: 'Rainbow Buddy',
    title: 'Rainbow Buddy',
    description: '청소년 성소수자를 위한 안전하고 친근한 디지털 공간',
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <PWAInstall />
          <div className="pb-16 md:pb-0">
            <PageTransition>{children}</PageTransition>
          </div>
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  )
}
