import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { users } from "@/server/db/schema/account";
import { chats, chatMessages } from "@/server/db/schema/chat";
import { desc, eq, relations, asc } from "drizzle-orm";
import ollama from "ollama";

export const chatRouter = createTRPCRouter({
  getAllChats: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.chats.findMany({
      orderBy: (chats, { desc }) => [desc(chats.createdAt)],
      limit: 100,
    });
    return res;
  }),

  getChatMessages: protectedProcedure
    .input(z.object({ chatId: z.number() }))
    .query(async ({ ctx, input }) => {
      const chat = await ctx.db.query.chats.findFirst({
        where: eq(chats.id, input.chatId),
        with: {
          messages: {
            orderBy: (chatMessages, { desc }) => [desc(chatMessages.createdAt)],
          },
        },
      });
      return chat;
    }),

  addUserMessage: protectedProcedure
    .input(
      z.object({
        chatId: z.nullable(z.number()),
        message: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let _chatId;

      if (!input.chatId) {
        const newChatName = `${input.message.substring(0, 30)}...`;

        const newChat = await await ctx.db
          .insert(chats)
          .values({
            createdById: ctx.session.user.id,
            name: newChatName,
          })
          .returning({ id: chats.id });
        _chatId = newChat[0].id;
      } else {
        _chatId = input.chatId;
      }

      const newUserMessage = {
        chatId: _chatId,
        role: "user",
        content: input.message,
        createdById: ctx.session.user.id,
      };

      await ctx.db.insert(chatMessages).values(newUserMessage);

      return {
        success: true,
        message: "new user message added",
        data: { chatId: _chatId },
      };
    }),

  addNewAssistantMessage: protectedProcedure
    .input(
      z.object({
        chatId: z.number(),
        message: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newAssistantMessage = {
        chatId: input.chatId,
        role: "assistant",
        content: input.message,
        createdById: ctx.session.user.id,
      };

      await ctx.db.insert(chatMessages).values(newAssistantMessage);

      return {
        success: true,
        message: "new assistant message added",
        data: null,
      };
    }),

  newAssistantMessage: protectedProcedure
    .input(
      z.object({
        chatId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const messages = await ctx.db.query.chatMessages.findMany({
        where: eq(chatMessages.chatId, input.chatId),
        orderBy: (chatMessages, { asc }) => [asc(chatMessages.createdAt)],
      });

      const msg: ChatMessage[] = messages.map((m) => ({
        role: m.role,
        content: m.content ?? "",
      }));

      const assistantResponse = await getAssistantResponse(msg);

      const newAssistantMessage = {
        chatId: input.chatId,
        role: "assistant",
        content: assistantResponse.message.content,
        createdById: ctx.session.user.id,
      };

      await ctx.db.insert(chatMessages).values(newAssistantMessage);

      return {
        success: true,
        message: "new assistant message added",
        data: null,
      };
    }),

  deleteChat: protectedProcedure
    .input(z.object({ chatId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      console.log("delete chat", input.chatId);

      // delete chat and its messages
      await ctx.db
        .delete(chatMessages)
        .where(eq(chatMessages.chatId, input.chatId));
      await ctx.db.delete(chats).where(eq(chats.id, input.chatId));

      return {
        success: true,
        message: "chat deleted",
        data: null,
      };
    }),
});

type ChatMessage = {
  role: "assistant" | "user" | string;
  content: string;
};

const getAssistantResponse = async (messages: ChatMessage[]) => {
  const response = await ollama.chat({
    model: "llama3",
    messages: messages,
  });

  return response;
};
