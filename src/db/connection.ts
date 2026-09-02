import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '../env.ts';
import * as schema from './schema/index.ts';

const connectionString =
  env.DATABASE_URL ?? 'postgresql://localhost:5432/placeholder';

const client = postgres(connectionString);

export const db = drizzle(client, { schema });
