"use client"

import * as React from "react"
import { Send, Save, Clock, Copy, Check, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { CollectionDialog } from "./collections/collection-dialog"
import { HistoryDialog } from "./history/history-dialog"
import { SettingsDialog } from "./settings/settings-dialog"
import { HistoryItem } from "@/types"

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

  const methods: Method[] = ["GET", "POST", "PUT", "DELETE", "PATCH"]

  const handleSend = async () => {
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
    } catch (error: any) {
      setResponse({
        error: error.message,
        status: 0,
        statusText: "Error",
        headers: {},
        data: null
      })
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
        <div className="flex space-x-2">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as Method)}
            className="w-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {methods.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter request URL"
            className="flex-1"
          />
        </div>

        <Tabs defaultValue="headers" className="w-full">
          <TabsList>
            <TabsTrigger value="headers">Headers</TabsTrigger>
            <TabsTrigger value="body">Body</TabsTrigger>
          </TabsList>
          <TabsContent value="headers" className="space-y-4">
            {headers.map((header, index) => (
              <div key={index} className="flex space-x-2">
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
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setHeaders(headers.filter((_, i) => i !== index))
                  }}
                >
                  ×
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => setHeaders([...headers, { key: "", value: "" }])}
            >
              Add Header
            </Button>
          </TabsContent>
          <TabsContent value="body">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Enter request body (JSON)"
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Response Section */}
      {response && (
        <div className="rounded-lg border bg-card">
          <div className="border-b p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className={cn("rounded-full px-3 py-1 text-sm font-medium", getStatusColor(response.status))}>
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
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="mt-4 rounded-md bg-muted p-4">
              <pre className="text-sm">
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
      <div className="flex space-x-2">
        <Button onClick={handleSend} className="flex-1">
          <Send className="mr-2 h-4 w-4" />
          Send Request
        </Button>
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
  )
} 