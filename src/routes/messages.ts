import { eq, sql } from 'drizzle-orm';
import type { FastifyInstance } from 'fastify';
import { db } from '../db/connection.ts';
import { messages, rooms } from '../db/schema/index.ts';
import { chat, generateEmbedding } from '../services/groq.ts';

export async function messagesRoutes(app: FastifyInstance) {
  app.post('/rooms/:roomId/messages', async (request, reply) => {
    const { roomId } = request.params as { roomId: string };
    const { content, role = 'user' } = request.body as {
      content: string;
      role?: 'user' | 'assistant';
    };

    const [room] = await db.select().from(rooms).where(eq(rooms.id, roomId));
    if (!room) {
      return reply.status(404).send({ error: 'Room not found' });
    }

    const embedding = await generateEmbedding(content);

    const [message] = await db
      .insert(messages)
      .values({ roomId, content, role, embedding: JSON.stringify(embedding) })
      .returning();

    return reply.status(201).send(message);
  });

  app.get('/rooms/:roomId/messages', async (request, reply) => {
    const { roomId } = request.params as { roomId: string };

    const [room] = await db.select().from(rooms).where(eq(rooms.id, roomId));
    if (!room) {
      return reply.status(404).send({ error: 'Room not found' });
    }

    const roomMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.roomId, roomId))
      .orderBy(messages.createdAt);

    return roomMessages;
  });

  app.post('/rooms/:roomId/questions', async (request, reply) => {
    const { roomId } = request.params as { roomId: string };
    const { question } = request.body as { question: string };

    const [room] = await db.select().from(rooms).where(eq(rooms.id, roomId));
    if (!room) {
      return reply.status(404).send({ error: 'Room not found' });
    }

    const questionEmbedding = await generateEmbedding(question);

    const similarMessages = await db.execute(sql`
      SELECT content, role,
        1 - (embedding::jsonb::text::vector <=> ${JSON.stringify(questionEmbedding)}::vector) AS similarity
      FROM messages
      WHERE room_id = ${roomId}
        AND embedding IS NOT NULL
      ORDER BY similarity DESC
      LIMIT 5
    `);

    const rows = similarMessages as unknown as Array<{
      role: string;
      content: string;
      similarity: number;
    }>;

    const context = rows.map((m) => `${m.role}: ${m.content}`).join('\n');

    const answer = await chat([
      {
        role: 'system',
        content: `Você é um assistente útil. Responda com base no contexto da sala de conversa abaixo. Se a pergunta não puder ser respondida com o contexto diga que não há informações suficientes.\n\nContexto:\n${context}`,
      },
      { role: 'user', content: question },
    ]);

    const [assistantMessage] = await db
      .insert(messages)
      .values({ roomId, content: answer ?? '', role: 'assistant' })
      .returning();

    return { answer: assistantMessage.content, relatedMessages: rows };
  });
}
