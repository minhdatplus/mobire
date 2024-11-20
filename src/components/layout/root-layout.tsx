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
      <div className="min-h-screen flex flex-col antialiased bg-background">
        <Navigation />
        
        {/* Main Container */}
        <div className="flex-1 flex items-center justify-center px-4 py-6 md:py-8 lg:py-12">
          <div className="w-full max-w-[1200px] mx-auto rounded-lg border bg-card shadow-sm">
            <ScrollArea className="h-full">
              <main className={cn(
                "p-4 md:p-6 lg:p-8",
                "prose prose-gray dark:prose-invert max-w-none",
                "focus:outline-none"
              )}>
                {children}
              </main>
            </ScrollArea>
          </div>
        </div>

        <footer className="w-full border-t py-6 md:py-0">
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