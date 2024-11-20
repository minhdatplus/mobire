"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Wand2, Loader2 } from "lucide-react"
import { parseNaturalLanguage } from "@/lib/services/ai-service"
import { ParsedRequest } from "@/types/ai"
import { toast } from "sonner"

interface NLInputProps {
  onRequestParsed: (request: ParsedRequest) => void
  isLoading?: boolean
}

export function NLInput({ onRequestParsed, isLoading }: NLInputProps) {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!input.trim()) {
      toast.error("Please enter a request description")
      return
    }

    setLoading(true)
    try {
      const parsed = await parseNaturalLanguage({ input })
      onRequestParsed(parsed)
      
      toast.success(`Request parsed with confidence: ${parsed.confidence}`, {
        description: parsed.suggestions?.join('\n')
      })
    } catch (error) {
      toast.error("Failed to parse request", {
        description: "Please try rephrasing your input"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe your API request... (e.g., 'Get all users')"
        className="flex-1"
      />
      <Button type="submit" disabled={loading}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
        Parse
      </Button>
    </form>
  )
} 