"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChatBox } from "@/components/ui/chatbox";
import { ChatContext } from "@/hooks/chat-context";
import { useContext, useRef, useEffect, useCallback } from "react";
import { api } from "@/trpc/react";

export default function Page() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }

  const {
    messages,
    message,
    loading,
    setMessage,
    submitMessage,
    clearAllMessages,
  } = context;
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading, error } = api.post.getLatest.useQuery();

  const scrollToBottom = useCallback(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatContainerRef]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSubmit = useCallback(() => {
    if (loading || message === "") return;
    submitMessage();
    scrollToBottom();
    setMessage("");
  }, [submitMessage, scrollToBottom, setMessage, loading, message]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "Enter") {
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSubmit]);

  return (
    <main className="relative flex min-h-screen flex-col">
      <div className="container mx-auto flex flex-grow flex-col justify-between">
        <div className="col-span-5 flex flex-col gap-4 py-4">
          <p>{JSON.stringify(data)}</p>
          <div className="h-12" ref={chatContainerRef}></div>
          {messages.map((message, index) => {
            return <ChatBox key={index} message={message} />;
          })}
          {loading && (
            <ChatBox
              message={{
                role: "assistant",
                content: "",
              }}
              assistantTyping={loading}
            />
          )}
          <div className="h-20" ref={chatContainerRef}></div>
        </div>
        <div className="fixed bottom-0 mb-6 w-8/12 self-center rounded-md bg-gray-50 shadow-md">
          <div className="m-1 flex gap-2">
            <Textarea
              className="w-full rounded-md bg-white"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here"
            />
            <div className="group flex flex-1 flex-row gap-1">
              <Button
                className="hidden bg-red-500 hover:bg-red-400 group-hover:flex"
                size="tall"
                onClick={clearAllMessages}
                disabled={loading || messages.length === 0}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </Button>
              <Button size="tall" onClick={handleSubmit} disabled={loading}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
