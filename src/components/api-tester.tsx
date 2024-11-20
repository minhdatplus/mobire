"use client"

import * as React from "react"
import { Send, Save, Clock, Copy, Check, Code, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { CollectionDialog } from "./collections/collection-dialog"
import { HistoryDialog } from "./history/history-dialog"
import { SettingsDialog } from "./settings/settings-dialog"
import { HistoryItem } from "@/types"
import { toast } from "sonner"

interface ApiTesterProps {
  className?: string
}

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
type ResponseData = {
  status: number
  statusText: string
  headers: Record<string, string>
  data: any
  error?: string
}

export function ApiTester({ className }: ApiTesterProps) {
  const [method, setMethod] = React.useState<Method>("GET")
  const [url, setUrl] = React.useState("")
  const [headers, setHeaders] = React.useState([
    { key: "Content-Type", value: "application/json" }
  ])
  const [body, setBody] = React.useState("")
  const [response, setResponse] = React.useState<ResponseData | null>(null)
  const [responseTime, setResponseTime] = React.useState<number | null>(null)
  const [copied, setCopied] = React.useState(false)
  const [history, setHistory] = React.useState<HistoryItem[]>([])
  const [settings, setSettings] = React.useState({
    autoFormat: true,
    saveHistory: true,
    maxHistoryItems: 50
  })
  const [isLoading, setIsLoading] = React.useState(false)

  const methods: Method[] = ["GET", "POST", "PUT", "DELETE", "PATCH"]

  const handleSend = async () => {
    if (!url) {
      toast.error("Please enter a URL")
      return
    }

    setIsLoading(true)
    try {
      const startTime = performance.now()
      setResponse(null)
      setResponseTime(null)

      const headerObj = headers.reduce((acc, h) => {
        if (h.key && h.value) acc[h.key] = h.value
        return acc
      }, {} as Record<string, string>)

      const options: RequestInit = {
        method,
        headers: headerObj,
      }

      if (method !== "GET" && body) {
        try {
          const parsedBody = JSON.parse(body)
          options.body = JSON.stringify(parsedBody)
        } catch (e) {
          options.body = body
        }
      }

      const res = await fetch(url, options)
      const data = await res.json()
      const endTime = performance.now()
      
      setResponseTime(Math.round(endTime - startTime))
      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data
      })

      if (settings.saveHistory) {
        const historyItem: HistoryItem = {
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          method,
          url,
          status: res.status
        }
        setHistory(prev => [historyItem, ...prev].slice(0, settings.maxHistoryItems))
      }

      toast.success("Request completed successfully")
    } catch (error: any) {
      toast.error(error.message || "An error occurred")
      setResponse({
        error: error.message,
        status: 0,
        statusText: "Error",
        headers: {},
        data: null
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response.data, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getStatusColor = (status: number) => {
    if (!status) return "bg-gray-100"
    if (status < 300) return "bg-green-100 text-green-800"
    if (status < 400) return "bg-blue-100 text-blue-800"
    if (status < 500) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Request Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as Method)}
            className="w-[100px] rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {methods.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter request URL"
            className="flex-1 rounded-lg transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        <Tabs defaultValue="headers" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto">
            <TabsTrigger 
              value="headers"
              className="rounded-none border-b-2 border-transparent px-4 py-2 hover:bg-accent/50 data-[state=active]:border-primary data-[state=active]:bg-accent"
            >
              Headers
            </TabsTrigger>
            <TabsTrigger 
              value="body"
              className="rounded-none border-b-2 border-transparent px-4 py-2 hover:bg-accent/50 data-[state=active]:border-primary data-[state=active]:bg-accent"
            >
              Body
            </TabsTrigger>
          </TabsList>

          <TabsContent value="headers" className="space-y-4 pt-4">
            {headers.map((header, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={header.key}
                  onChange={(e) => {
                    const newHeaders = [...headers]
                    newHeaders[index].key = e.target.value
                    setHeaders(newHeaders)
                  }}
                  placeholder="Key"
                  className="flex-1"
                />
                <Input
                  value={header.value}
                  onChange={(e) => {
                    const newHeaders = [...headers]
                    newHeaders[index].value = e.target.value
                    setHeaders(newHeaders)
                  }}
                  placeholder="Value"
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setHeaders(headers.filter((_, i) => i !== index))
                  }}
                  className="hover:bg-destructive/10 hover:text-destructive"
                >
                  ×
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => setHeaders([...headers, { key: "", value: "" }])}
              className="w-full justify-center hover:bg-accent"
            >
              Add Header
            </Button>
          </TabsContent>

          <TabsContent value="body" className="pt-4">
            <div className="relative">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="min-h-[200px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Enter request body (JSON)"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
                onClick={() => {
                  try {
                    const formatted = JSON.stringify(JSON.parse(body), null, 2)
                    setBody(formatted)
                  } catch (e) {
                    // Handle JSON parse error
                  }
                }}
              >
                <Code className="h-4 w-4" />
                <span className="ml-2">Format</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Response Section */}
      {response && (
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="border-b">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <span className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
                  getStatusColor(response.status)
                )}>
                  {response.status} {response.statusText}
                </span>
                {responseTime && (
                  <span className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {responseTime}ms
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyResponse}
                className="hover:bg-accent"
              >
                {copied ? 
                  <Check className="h-4 w-4 text-success" /> : 
                  <Copy className="h-4 w-4" />
                }
              </Button>
            </div>
            <div className="border-t bg-muted/50 p-4">
              <pre className="text-sm overflow-auto max-h-[400px] font-mono">
                {response.error ? (
                  <span className="text-destructive">{response.error}</span>
                ) : (
                  JSON.stringify(response.data, null, 2)
                )}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        <Button 
          onClick={handleSend}
          className="flex-1 bg-primary hover:bg-primary/90 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          {isLoading ? "Sending..." : "Send Request"}
        </Button>
        <div className="flex items-center space-x-2">
          <CollectionDialog
            onSave={(collection) => {
              // Handle save to collection
            }}
            method={method}
            url={url}
            headers={headers}
            body={body}
          />
          <HistoryDialog
            history={history}
            onSelect={(item) => {
              setMethod(item.method as Method)
              setUrl(item.url)
            }}
          />
          <SettingsDialog
            settings={settings}
            onSettingsChange={setSettings}
          />
        </div>
      </div>
    </div>
  )
} 