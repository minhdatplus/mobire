import OpenAI from 'openai'
import { NLPRequest, ParsedRequest } from '@/types/ai'

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

export async function parseNaturalLanguage(request: NLPRequest): Promise<ParsedRequest> {
  try {
    const prompt = generatePrompt(request)
    
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 500,
    })

    return JSON.parse(completion.choices[0].message.content || '{}') as ParsedRequest
  } catch (error) {
    console.error('Error parsing natural language:', error)
    throw new Error('Failed to parse natural language request')
  }
}

function generatePrompt(request: NLPRequest): string {
  return `
    You are an advanced API request parser. Your task is to convert the following natural language input into a structured API request.
    Consider the context of previous requests if provided. Ensure the output is accurate and reliable.
    
    Input: ${request.input}
    ${request.context ? `Context: ${JSON.stringify(request.context)}` : ''}
    
    Respond with a JSON object containing:
    - method: The HTTP method to use
    - endpoint: The API endpoint
    - headers: Any required headers
    - params: URL parameters if needed
    - body: Request body if needed
    - confidence: Your confidence score (0-1)
    - suggestions: Array of related suggestions
    
    Only respond with valid JSON. If unsure, provide the best guess with a lower confidence score.
  `
} 