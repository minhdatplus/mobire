"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  LayoutDashboard, 
  FolderKanban,
  Settings,
  ChevronLeft
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "relative flex flex-col border-r bg-background",
        isCollapsed ? "w-16" : "w-64",
        "transition-all duration-300"
      )}
    >
      <div className="flex h-16 items-center justify-end border-b px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronLeft className={cn(
            "h-6 w-6 transition-all",
            isCollapsed && "rotate-180"
          )} />
        </Button>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-2 px-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                pathname === item.href ? "bg-accent" : "transparent",
                isCollapsed && "justify-center px-2"
              )}
            >
              <item.icon className="h-4 w-4" />
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
} 