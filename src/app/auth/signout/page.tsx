"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignOut() {
  return (
    <div className="flex min-h-[80dvh] items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <p className="mb-12 bg-background text-4xl font-bold text-foreground">
            👋 Thanks for visiting.
          </p>
          <Button
            className="rounded-full px-8"
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
            type="button"
          >
            Bye bye
          </Button>
        </div>
      </div>
    </div>
  );
}
