"use client";

import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import ChatHeader from "./chat-header";

function SideBar({
  showSidebar,
  children,
}: {
  showSidebar: boolean;
  children: React.ReactNode;
}) {
  return (
    showSidebar && (
      <div
        className={cn(
          "mt-12 w-44 basis-full flex-col overflow-auto rounded-md bg-secondary pl-4 sm:basis-1/4",
        )}
      >
        <h2 className="pb-4 pt-6 text-xl font-semibold">Past chats</h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">{children}</ScrollArea>
      </div>
    )
  );
}

export default function ChatLayout({
  children,
  sidebarContent,
}: {
  children: React.ReactNode;
  sidebarContent: React.ReactNode;
}) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <section className="min-h-screen text-foreground">
      <ChatHeader toggleSidebar={() => setShowSidebar(!showSidebar)} />
      <main className="flex flex-grow md:container md:mx-auto">
        <SideBar showSidebar={showSidebar}>{sidebarContent}</SideBar>
        <section
          className={`w-full pt-12 ${showSidebar ? "hidden sm:block sm:basis-3/4" : "flex-1"}`}
        >
          {children}
        </section>
      </main>
    </section>
  );
}
