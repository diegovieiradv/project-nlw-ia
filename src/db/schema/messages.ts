import { jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { rooms } from './rooms.ts'

export const messages = pgTable('messages', {
  id: uuid().primaryKey().defaultRandom(),
  roomId: uuid().references(() => rooms.id, { onDelete: 'cascade' }).notNull(),
  content: text().notNull(),
  role: text({ enum: ['user', 'assistant'] }).notNull(),
  embedding: jsonb('embedding'),
  createdAt: timestamp().defaultNow(),
})
