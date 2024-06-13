"use server";

import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";
import RegisterButton from "@/components/RegisterButton";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col">
      <div className="container mx-auto flex flex-grow flex-col items-center justify-center bg-background">
        <div className="flex w-96 flex-col gap-3 p-4 font-mono">
          <Link href="/simplechat" className="underline">
            to Simple Chat
          </Link>
          <Link href="/posts-client" className="underline">
            to Posts Client
          </Link>
          <Link href="/posts-server-action" className="underline">
            to Posts Server Action
          </Link>
        </div>
        <Link
          href={"/api/auth/signin"}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          {"Sign in"}
        </Link>
        <Link
          href={"/api/auth/signout"}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          {"Sign out"}
        </Link>
        <RegisterButton />
        <pre className="w-44">
          <code>{JSON.stringify(session, null, 2)}</code>
        </pre>
      </div>
    </main>
  );
}
