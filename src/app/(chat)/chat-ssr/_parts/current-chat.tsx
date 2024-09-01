"use client";

import { useState, useEffect } from "react";
import { doConversation } from "@/server/actions/chats-actions";
import { readStreamableValue } from "ai/rsc";
import { ChatMessage } from "@/types/types";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
// import { type CoreMessage } from "ai";

interface CurrentChatProps {
  chatId?: number;
}

export default function CurrentChat({ chatId }: CurrentChatProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  const { data, isLoading, error, refetch } = api.chat.getChatMessages.useQuery(
    { chatId: chatId as number },
    {
      enabled: false,
    },
  );

  useEffect(() => {
    if (chatId !== undefined) {
      refetch();
    } else {
      setMessages([]);
    }
  }, [chatId, refetch]);

  useEffect(() => {
    if (data) {
      const _msg = data.messages.map((m) => ({
        role: m.role,
        content: m.content ?? "",
      }));
      setMessages(_msg);
    }
  }, [data]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {messages.map((m, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content as string}
        </div>
      ))}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const newMessages: ChatMessage[] = [
            ...messages,
            { content: input, role: "user" },
          ];

          setMessages(newMessages);
          setInput("");

          const result = await doConversation({
            chatId: chatId ?? null,
            mesaages: newMessages,
          });

          console.log("result", result);

          if (result?.data) {
            if (chatId === undefined) {
              router.push(`/chat-ssr?chat_id=${result.data.chatId}`);
            }

            for await (const content of readStreamableValue(
              result.data.textStream,
            )) {
              setMessages([
                ...newMessages,
                {
                  role: "assistant",
                  content: content as string,
                },
              ]);
            }
          }
        }}
      >
        <input
          className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}
