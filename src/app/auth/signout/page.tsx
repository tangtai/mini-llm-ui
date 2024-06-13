"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter">Mini LLM</h1>
          <p className="text-gray-500 dark:text-gray-400">
            yo sure want to sign out?
          </p>
          <button
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
            type="submit"
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
