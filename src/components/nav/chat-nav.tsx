"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";
import { Sun, Moon, MessageCirclePlus, List } from "lucide-react";

function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="container fixed left-0 right-0 top-0 mx-auto w-full px-8 backdrop-blur-sm">
      <div className="flex h-12 items-center justify-between">
        <div className="flex justify-between gap-2">
          <Button
            onClick={() => toggleSidebar()}
            variant={"outline"}
            size={"icon"}
          >
            <List className="size-4" />
          </Button>
          <Button variant={"outline"} size={"icon"}>
            <Link href="/chat-ssr">
              <MessageCirclePlus className="size-4" />
            </Link>
          </Button>
        </div>
        <div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}

function SideBar({
  showSidebar,
  children,
}: {
  showSidebar: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`mt-12 w-44 basis-1/4 flex-col overflow-auto rounded-md bg-secondary pl-4
         ${showSidebar ? "block" : "hidden"}`}
    >
      <h2 className="pb-2 pt-4 text-xl font-semibold">Past chats</h2>
      <ScrollArea className="h-[calc(100vh-8rem)]">{children}</ScrollArea>
    </div>
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
    <section className="min-h-screen bg-blue-200 text-foreground">
      <Header toggleSidebar={() => setShowSidebar(!showSidebar)} />
      <main className="flex flex-grow md:container md:mx-auto">
        <SideBar showSidebar={showSidebar}>{sidebarContent}</SideBar>
        <section
          className={`w-full pt-12 ${showSidebar ? "basis-3/4" : "flex-1"}`}
        >
          {children}
        </section>
      </main>
    </section>
  );
}
