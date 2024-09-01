"use server";

import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";
import Header from "@/components/nav/header";
import { Button } from "@/components/ui/button";
import { Smile } from "lucide-react";

export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <main className="flex flex-col pt-12">
      <Header />
      <div className="container mx-auto flex h-[calc(100vh-4rem)] flex-grow flex-col ">
        {/* <div className="flex w-96 flex-col gap-3 bg-red-400 p-4 font-mono">
          <Link href="/simplechat" className="underline">
            to Simple Chat
          </Link>
          <Link href="/posts-client" className="underline">
            to Posts Client
          </Link>
          <Link href="/posts-server-action" className="underline">
            to Posts Server Action
          </Link>
          <Link href="/chat-ssr" className="underline">
            chat ssr
          </Link>
        </div> */}
        <div className="basis-1/6"></div>
        <div className="flex flex-1 flex-col items-center text-center">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Welcome to my little APP
              </h1>
              <Smile className="size-12 rotate-45 duration-500" />
            </div>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
              It is just something I've hacked together with my choices of
              techstack for a fullstack web application.
            </p>
          </div>
          <Button
            asChild
            className="mt-32 inline-flex h-12 animate-bounce items-center justify-center gap-4 rounded-3xl px-8 text-lg font-medium hover:animate-none"
          >
            <Link href="/auth/signin">Get Started</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
