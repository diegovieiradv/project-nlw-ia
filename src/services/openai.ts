import OpenAI from 'openai'
import { env } from '../env.ts'

export const openai = new OpenAI({
  apiKey: env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1',
})

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  })
  return response.data[0].embedding
}

export async function chat(messages: { role: 'user' | 'system'; content: string }[]) {
  const response = await openai.chat.completions.create({
    model: 'grok-3-mini',
    messages,
  })
  return response.choices[0].message.content
}
