"use client";

import { useState, useEffect } from "react";
import { doConversation } from "@/server/actions/chats-actions";
import { readStreamableValue } from "ai/rsc";
import { ChatMessage } from "@/types/types";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  UserChatBubble,
  AssistantChatBubble,
} from "@/components/ui/chat-bubble";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;

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

    if (result?.data) {
      if (chatId === undefined) {
        router.push(`/chat-ssr?chat_id=${result.data.chatId}`);
      }

      for await (const content of readStreamableValue(result.data.textStream)) {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: content as string,
          },
        ]);
      }
    }
  };

  return (
    <div className="w-full">
      <ScrollArea className="h-[calc(100vh-9rem)] p-4">
        {chatId === undefined && (
          <div className="text-center text-lg">
            Start a new conversation by typing...
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i}>
            {m.role === "user" ? (
              <UserChatBubble message={m.content as string} />
            ) : (
              <AssistantChatBubble message={m.content as string} />
            )}
          </div>
        ))}
        <div className="h-44" />
      </ScrollArea>

      <div className="flex w-full items-center justify-center bg-green-400">
        <div className="m-2 w-full rounded-md bg-secondary p-2 sm:w-3/5">
          <form className="flex space-x-2" onSubmit={handleSubmit}>
            <Textarea
              className="resize-none border-0 bg-background text-foreground"
              value={input}
              placeholder="Say something..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button size="tall" type="submit" disabled={status == "executing"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
