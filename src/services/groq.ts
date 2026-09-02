import OpenAI from 'openai';
import { env } from '../env.ts';

// Groq — chat completions (llama-3.3-70b-versatile)
export const groq = new OpenAI({
  apiKey: env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

// OpenAI — embeddings (Groq não suporta modelos de embedding)
const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return response.data[0].embedding;
}

export async function chat(
  messages: { role: 'user' | 'system'; content: string }[]
) {
  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages,
  });
  return response.choices[0].message.content;
}
