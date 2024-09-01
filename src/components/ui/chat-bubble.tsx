"use client";

import React from "react";
import Markdown from "react-markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound, Bot } from "lucide-react";

interface ChatBubbleProps {
  message: string;
}

export function UserChatBubble(props: ChatBubbleProps) {
  return (
    <div className="mb-2 flex justify-end">
      <div className="max-w-[90%] rounded-t-3xl rounded-bl-3xl rounded-br-sm bg-primary px-4 py-2 text-primary-foreground sm:max-w-[70%]">
        {props.message}
      </div>
      <div className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-primary-foreground">
        <UserRound className="size-4" />
      </div>
    </div>
  );
}

export function AssistantChatBubble(props: ChatBubbleProps) {
  return (
    <div className="mb-6 flex justify-start">
      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
        <Bot className="size-5" />
      </div>
      <div className="max-w-[90%] rounded-lg rounded-b-3xl rounded-tl-sm rounded-tr-3xl  bg-secondary px-8 py-4 sm:max-w-[80%]">
        <Markdown
          components={{
            pre: ({ children }) => (
              <div className="my-4 rounded-md bg-zinc-800 px-4 py-6 text-sm text-zinc-200">
                {children}
              </div>
            ),
          }}
        >
          {props.message}
        </Markdown>
      </div>
    </div>
  );
}
