"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { Navigation } from "./navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface RootLayoutProps {
  children: React.ReactNode
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex-1">
      {children}
    </div>
  )
} 