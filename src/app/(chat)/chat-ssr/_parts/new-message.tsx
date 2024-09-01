// TODO: Deprecated

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSearchParams, useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
// import {
//   createUserNewMessage,
//   createAssistantNewMessage,
// } from "@/server/actions/chat-actions";
import { doConversation } from "@/server/actions/chats-actions";

export default function NewMessage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState("");

  // const { execute, status, result } = useAction(createUserNewMessage, {
  //   onSuccess: async ({ data }) => {
  //     setMessage("");

  //     const urlChatId = searchParams.get("chat_id");
  //     const dataChatId = data.chatId;

  //     await new Promise((resolve) => setTimeout(resolve, 100));
  //     executeAssistant({ chatId: Number(searchParams.get("chat_id")) });

  //     if (urlChatId !== dataChatId.toString()) {
  //       const _url = `/chat-ssr?chat_id=${dataChatId}`;
  //       router.push(_url);
  //     }
  //   },
  // });

  // const {
  //   execute: executeAssistant,
  //   status: statusAssistant,
  //   result: resultAssistant,
  // } = useAction(createAssistantNewMessage, {
  //   onSuccess: () => {
  //     console.log("Assistant message sent");
  //   },
  // });

  const { execute, status, result } = useAction(doConversation, {});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message.trim()) return;
    const chatId = searchParams.get("chat_id");
    // execute({ chatId: Number(chatId), message });
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Textarea
        className="resize-none bg-background text-foreground"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            // handleSubmit(e);
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
  );
}
