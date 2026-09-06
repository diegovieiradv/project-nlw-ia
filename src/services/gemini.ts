import { GoogleGenAI } from '@google/genai';
import { env } from '../env.ts';

let aiInstance: GoogleGenAI | null = null;

function getAi(): GoogleGenAI {
  if (!aiInstance) {
    const key = env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY não está configurada');
    }
    aiInstance = new GoogleGenAI({ apiKey: key });
  }
  return aiInstance;
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const ai = getAi();
  const response = await ai.models.embedContent({
    model: 'gemini-embedding-001',
    contents: [text],
  });

  const values = response.embeddings?.[0]?.values;
  if (!values || values.length === 0) {
    throw new Error('Failed to generate embedding: empty response from Gemini');
  }
  return values;
}

export async function chat(
  messages: { role: 'user' | 'system'; content: string }[]
) {
  const ai = getAi();
  const systemMessage = messages.find((m) => m.role === 'system');
  const userMessages = messages.filter((m) => m.role !== 'system');

  const contents = userMessages.map((msg) => ({
    role: 'user' as const,
    parts: [{ text: msg.content }],
  }));

  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash-lite',
    contents,
    ...(systemMessage
      ? { config: { systemInstruction: systemMessage.content } }
      : {}),
  });

  return response.text;
}
