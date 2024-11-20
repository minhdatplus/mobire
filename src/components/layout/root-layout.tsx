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
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="relative min-h-screen flex flex-col dark:bg-background">
        {/* Navigation - Responsive for both mobile and desktop */}
        <Navigation />

        {/* Main Content */}
        <ScrollArea className="flex-1">
          <main className={cn(
            "flex-1 p-4 md:p-6",
            "container relative",
            "prose prose-gray dark:prose-invert max-w-none",
            "focus:outline-none"
          )}>
            {children}
          </main>
        </ScrollArea>

        {/* Footer */}
        <footer className="border-t bg-background/95 backdrop-blur">
          <div className="container flex h-14 items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Built with Next.js and Shadcn UI
            </p>
          </div>
        </footer>
      </div>
      
      <Toaster 
        position="bottom-right"
        toastOptions={{
          className: 'rounded-lg shadow-lg',
          duration: 3000
        }} 
      />
    </ThemeProvider>
  )
} 