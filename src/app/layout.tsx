import * as React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { ThemeContextProvider } from '@/components/theme/theme-context'
import { Navigation } from '@/components/layout/navigation'
import { RootLayout } from '@/components/layout/root-layout'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MobireST',
  description: 'REST API Testing Tool',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeContextProvider>
            <div className="flex min-h-screen flex-col">
              <Navigation />
              <main className="flex-1 container py-6">
                <RootLayout>{children}</RootLayout>
              </main>
            </div>
            <Toaster position="top-right" />
          </ThemeContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}