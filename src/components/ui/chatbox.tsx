"use client";

import * as React from "react";
import { ChatMessage } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import { Skeleton } from "./skeleton";

interface ChatBoxProps {
  message: ChatMessage;
  assistantTyping?: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  message,
  assistantTyping = false,
}) => {
  const { role, content } = message;

  const isAssistant = role === "assistant";
  const avatarUrl = !isAssistant
    ? "https://github.com/shadcn.png"
    : "https://avatars.githubusercontent.com/u/151674099?s=200&v=4";

  return (
    <div className="grid grid-cols-12">
      <div
        className={cn(
          "col-span-1 flex",
          isAssistant ? "order-1" : "order-3",
          isAssistant ? "justify-end" : "justify-start",
        )}
      >
        <Avatar className="mx-4 h-8 w-8 border border-gray-400">
          <AvatarImage src={avatarUrl} alt={role} />
          <AvatarFallback>{role}</AvatarFallback>
        </Avatar>
      </div>
      <div className="order-2 col-span-10">
        {role === "user" ? (
          <UserContent content={content} />
        ) : assistantTyping ? (
          <div className="mb-4 flex flex-col gap-2 rounded-xl px-4 py-2 text-sm">
            <Skeleton className="h-3 w-[250px]" />
            <Skeleton className="h-3 w-[200px]" />
          </div>
        ) : (
          <AssistantContent content={content} />
        )}
      </div>
      <div
        className={cn("col-span-1", isAssistant ? "order-3" : "order-1")}
      ></div>
    </div>
  );
};

const UserContent: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="flex justify-end">
      <div className="rounded-xl bg-accent px-4 py-2 text-sm">{content}</div>
    </div>
  );
};

type AssistantContentSection = {
  type: "text" | "code";
  section_content: string;
};

const AssistantContent: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="mb-4 flex flex-col gap-2 rounded-xl px-4 py-2 text-sm">
      <Markdown
        components={{
          pre: ({ children }) => (
            <div className="my-4 rounded-md bg-gray-200 p-4">{children}</div>
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
};

export { ChatBox };
