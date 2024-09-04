"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { api } from "@/trpc/server";
import { createStreamableValue } from "ai/rsc";
import { CoreMessage, streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function continueConversation(messages: CoreMessage[]) {
  console.log("messages from actions", messages);
  const result = await streamText({
    model: openai.chat("gpt-4o-mini"),
    messages,
    onFinish({ text }: { text: string }) {
      console.log("stream finished.", text);
    },
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}

const ConversationSchema = z.object({
  chatId: z.nullable(z.number()),
  mesaages: z.array(z.object({ role: z.string(), content: z.string() })),
});

export const doConversation = actionClient
  .schema(ConversationSchema)
  .action(async ({ parsedInput: { chatId, mesaages } }) => {
    console.log("messages from actions", mesaages);

    let _chatId;

    const resAddUserMessage = await api.chat.addUserMessage({
      chatId: chatId,
      message: mesaages[mesaages.length - 1].content,
    });

    if (!chatId) {
      _chatId = resAddUserMessage.data.chatId;
      revalidatePath("/chat-ssr");
    } else {
      _chatId = chatId;
    }

    console.log("chat id is ", _chatId);

    const result = await streamText({
      model: openai.chat("gpt-4o-mini"),
      messages: mesaages as CoreMessage[],
      onFinish({ text }: { text: string }) {
        api.chat.addNewAssistantMessage({
          chatId: _chatId,
          message: text,
        });
      },
    });

    const stream = createStreamableValue(result.textStream);
    return {
      chatId: _chatId,
      textStream: stream.value,
    };
  });
