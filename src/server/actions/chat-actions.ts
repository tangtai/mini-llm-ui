"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { api } from "@/trpc/server";

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
