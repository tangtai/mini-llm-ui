"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { api } from "@/trpc/server";

// const UserMsgSchema = z.object({
//   chatId: z.number(),
//   message: z.string(),
// });

// export const createUserNewMessage = action(
//   UserMsgSchema,
//   async ({ chatId, message }) => {
//     const res = await api.chat.newUserMessage({ chatId, message });
//     revalidatePath(`/chat-ssr?chat_id=${chatId}`);
//     return res;
//   },
// );

// const AssistantMsgSchema = z.object({
//   chatId: z.number(),
// });

// export const createAssistantNewMessage = action(
//   AssistantMsgSchema,
//   async ({ chatId }) => {
//     const res = await api.chat.newAssistantMessage({ chatId });
//     revalidatePath(`/chat-ssr?chat_id=${chatId}`);
//     return res;
//   },
// );

const DeleteChatSchema = z.object({
  chatId: z.number(),
});

export const deleteChat = actionClient
  .schema(DeleteChatSchema)
  .action(async ({ parsedInput: { chatId } }) => {
    const res = await api.chat.deleteChat({ chatId });
    revalidatePath("/chat-ssr");
    return res;
  });
