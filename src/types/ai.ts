export interface NLPRequest {
  input: string
  context?: RequestContext
}

export interface RequestContext {
  previousRequests: HistoricalRequest[]
  activeCollection?: string
  environment?: string
}

export interface ParsedRequest {
  method: string
  endpoint: string
  headers?: Record<string, string>
  body?: any
}

export interface HistoryParsedRequest extends ParsedRequest {
  id: string
  timestamp: number
  status: number
  confidence: number
}

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface HistoricalRequest {
  method: HTTPMethod
  endpoint: string
  timestamp: number
  success: boolean
} 