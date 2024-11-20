"use client"

import * as React from "react"
import { ThemeProvider, ThemeToggle } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Menu, History, Settings } from "lucide-react"

interface RootLayoutProps {
  children: React.ReactNode
  className?: string
}

export function RootLayout({ children, className }: RootLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="bg-purple-600 text-white">
          <div className="container flex h-14 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Menu className="h-5 w-5 cursor-pointer" />
              <h1 className="text-xl font-bold">Your App Name</h1>
            </div>
            <div className="flex items-center space-x-4">
              <History className="h-5 w-5 cursor-pointer" />
              <Settings className="h-5 w-5 cursor-pointer" />
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>
      <main className="container mx-auto py-6 px-4">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          {children}
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-end space-x-4 px-4">
          {/* Add your action buttons here */}
        </div>
      </div>
    </div>
  )
} 