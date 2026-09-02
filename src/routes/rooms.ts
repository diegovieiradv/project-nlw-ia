import { eq } from 'drizzle-orm';
import type { FastifyInstance } from 'fastify';
import { db } from '../db/connection.ts';
import { rooms } from '../db/schema/index.ts';

export async function roomsRoutes(app: FastifyInstance) {
  app.post('/rooms', async (request, reply) => {
    const { name, description } = request.body as {
      name: string;
      description?: string;
    };

    const [room] = await db
      .insert(rooms)
      .values({ name, description })
      .returning();

    return reply.status(201).send(room);
  });

  app.get('/rooms', async () => {
    const allRooms = await db.select().from(rooms);
    return allRooms;
  });

  app.get('/rooms/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const [room] = await db.select().from(rooms).where(eq(rooms.id, id));

    if (!room) {
      return reply.status(404).send({ error: 'Room not found' });
    }

    return room;
  });
}
