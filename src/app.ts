import { fastifyCors } from '@fastify/cors';
import { fastify } from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { messagesRoutes } from './routes/messages.ts';
import { roomsRoutes } from './routes/rooms.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/api/health', () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

app.register(roomsRoutes, { prefix: '/api' });
app.register(messagesRoutes, { prefix: '/api' });

export { app };
