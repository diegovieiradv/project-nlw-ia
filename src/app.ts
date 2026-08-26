
import { fastify } from "fastify";
import {
    serializerCompiler,
    validatorCompiler,
   type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { fastifyCors } from "@fastify/cors";
import { roomsRoutes } from "./routes/rooms.ts";
import { messagesRoutes } from "./routes/messages.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/health', () => {
    return { status: 'ok', timestamp: new Date().toISOString() }
});

app.register(roomsRoutes)
app.register(messagesRoutes)

export { app }
