import postgres from 'postgres';
import { env } from '../env.ts';

export const client = postgres(env.DATABASE_URL);
