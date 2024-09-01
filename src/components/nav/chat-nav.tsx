"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";
import { Sun, Moon, MessageSquarePlus, List } from "lucide-react";
import { cn } from "@/lib/utils";

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
              <MessageSquarePlus className="size-4" />
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
      <Header toggleSidebar={() => setShowSidebar(!showSidebar)} />
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
