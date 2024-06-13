"use server";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Error() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter">Mini LLM</h1>
          <p className="text-gray-500 dark:text-gray-400">An error occurred.</p>
          <Link href="/">
            <Button>Back to login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
