"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { PANTONE_COLORS, ThemeColor } from "@/lib/themes"

interface ThemeContextType {
  activeColor: ThemeColor
  setActiveColor: (color: ThemeColor) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeColor, setActiveColor] = useState<ThemeColor>(PANTONE_COLORS[0])

  const applyThemeColor = (color: ThemeColor) => {
    const root = document.documentElement
    
    // Convert HSL string to separate values
    const convertHSLToValues = (hslString: string) => {
      const match = hslString.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)
      if (match) {
        return `${match[1]} ${match[2]}% ${match[3]}%`
      }
      return hslString
    }

    const properties = {
      '--primary': convertHSLToValues(color.primary),
      '--secondary': convertHSLToValues(color.secondary),
      '--accent': convertHSLToValues(color.accent),
      '--muted': convertHSLToValues(color.muted),
    }

    Object.entries(properties).forEach(([property, value]) => {
      root.style.setProperty(property, value)
    })

    // Update ring color to match primary
    root.style.setProperty('--ring', convertHSLToValues(color.primary))
  }

  useEffect(() => {
    applyThemeColor(activeColor)
  }, [activeColor])

  return (
    <ThemeContext.Provider value={{ activeColor, setActiveColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider')
  }
  return context
} 