import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./account";
import { z } from "zod";
const roleEnum = z.enum(["user", "assistant"]);

export const createTable = pgTableCreator((name) => `mini-llm-db_${name}`);

export const chats = createTable("chat", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  createdById: varchar("createdById", { length: 255 })
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }),
});

export const chatMessages = createTable("chat_message", {
  id: serial("id").primaryKey(),
  role: varchar("role", { length: 9 }).notNull(),
  content: text("content"),
  createdById: varchar("createdById", { length: 255 })
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  chatId: integer("chat_id")
    .notNull()
    .references(() => chats.id),
});

export const usersChatsRelations = relations(users, ({ many }) => ({
  chats: many(chats),
  chatMessages: many(chatMessages),
}));

export const chatsRelations = relations(chats, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [chats.createdById],
    references: [users.id],
  }),
  messages: many(chatMessages),
}));

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  chat: one(chats, {
    fields: [chatMessages.chatId],
    references: [chats.id],
  }),
  createdBy: one(users, {
    fields: [chatMessages.createdById],
    references: [users.id],
  }),
}));
