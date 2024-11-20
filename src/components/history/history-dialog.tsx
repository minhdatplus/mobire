"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { History } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface HistoryItem {
  id: string
  timestamp: number
  method: string
  url: string
  status?: number
}

interface HistoryDialogProps {
  history: HistoryItem[]
  onSelect: (item: HistoryItem) => void
}

export function HistoryDialog({ history, onSelect }: HistoryDialogProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (item: HistoryItem) => {
    onSelect(item)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <History className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request History</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] mt-4">
          <div className="space-y-2">
            {history.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className="flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer"
              >
                <div>
                  <div className="font-medium">{item.method} {item.url}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(item.timestamp).toLocaleString()}
                  </div>
                </div>
                {item.status && (
                  <div className={`text-sm ${
                    item.status < 400 ? "text-green-600" : "text-red-600"
                  }`}>
                    {item.status}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
} 