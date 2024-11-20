"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun, Palette } from "lucide-react"
import { useTheme } from "next-themes"
import { PANTONE_COLORS, ThemeColor } from "@/lib/themes"
import { useEffect, useState } from "react"
import { useThemeContext } from "./theme-context"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const { activeColor, setActiveColor } = useThemeContext()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9"
          style={{ 
            '--theme-primary': activeColor.primary 
          } as React.CSSProperties}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {PANTONE_COLORS.map((color) => (
          <DropdownMenuItem
            key={color.year}
            onClick={() => setActiveColor(color)}
            className="flex items-center gap-2"
          >
            <div 
              className="h-4 w-4 rounded-full" 
              style={{ backgroundColor: color.primary }}
            />
            <span>{color.name} ({color.year})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 