"use client"

import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { MainNav } from "./main-nav"

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[80%] max-w-[400px] pr-0">
        <MainNav className="flex flex-col items-start space-x-0 space-y-4" />
      </SheetContent>
    </Sheet>
  )
} 