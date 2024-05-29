"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChatContext } from "@/hooks/chat-context";
import { useContext } from "react";

export default function Page() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  const { messages, message, loading, setMessage, submitMessage } = context;

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-grow mx-auto container flex flex-col justify-between">
        <div className="p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-md ${
                message.role === "user" ? "bg-acent" : "bg-secondary"
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="self-end w-full mb-6 rounded-md bg-secondary">
          <div className="flex m-4">
            <Textarea
              className="rounded-md mr-4 flex-auto"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here"
            />
            <Button
              className="gap-2 self-end"
              size="tall"
              onClick={submitMessage}
              disabled={loading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
              Send message
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
