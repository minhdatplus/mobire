"use client";

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes"

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
}

type Theme = "dark" | "light" | "system"

export function ThemeProvider({ 
  children, 
  defaultTheme = "system",
  storageKey = "theme",
  ...props 
}: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// Export useTheme hook để các component khác có thể sử dụng
export function useTheme() {
  const { theme, setTheme } = useNextTheme()
  
  return {
    theme: theme as Theme,
    setTheme,
  }
}