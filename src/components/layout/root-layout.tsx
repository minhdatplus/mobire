"use client"

import * as React from "react"
import { ThemeProvider, ThemeToggle } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Menu, History, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RootLayoutProps {
  children: React.ReactNode
  className?: string
}

export function RootLayout({ children, className }: RootLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="bg-primary text-primary-foreground">
          <div className="container flex h-14 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10">
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold">API Tester</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10">
                <History className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10">
                <Settings className="h-5 w-5" />
              </Button>
              <div className="ml-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main className="container mx-auto py-6 px-4">
        <div className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
          {children}
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <span className="text-sm text-muted-foreground">
            Made with ❤️ using Next.js & Shadcn
          </span>
          <div className="flex items-center space-x-4">
            {/* Add your footer content */}
          </div>
        </div>
      </footer>
    </div>
  )
} 