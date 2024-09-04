"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChatContext } from "@/hooks/chat-context";
import { useContext, useRef, useEffect, useCallback } from "react";

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

  return (
    <main className="relative flex min-h-screen flex-col">
      <pre>{JSON.stringify(messages, null, 2)}</pre>
    </main>
  );
}
