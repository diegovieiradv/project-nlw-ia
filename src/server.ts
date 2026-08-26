
import { fastify } from "fastify";
import {
    serializerCompiler,
    validatorCompiler,
   type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { fastifyCors } from "@fastify/cors";
import { env } from "./env.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/health', () => {
    return { status: 'ok', timestamp: new Date().toISOString() }
});

app.listen({ port: env.PORT })