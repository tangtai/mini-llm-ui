"use client";

import { ChatProvider } from "@/hooks/chat-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <ChatProvider>{children}</ChatProvider>
    </section>
  );
}
