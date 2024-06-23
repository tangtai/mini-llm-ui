"use client";

import { useState } from "react";
import { createPost } from "@/server/actions/post-actions";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { Input } from "@/components/ui/input";

export default function CreatePostForm() {
  const [postName, setPostName] = useState("");
  const { execute, status, result } = useAction(createPost, {
    onSuccess: () => {
      setPostName("");
    },
  });

  return (
    <div className="flex flex-col rounded-md border bg-background p-2">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await execute({
            name: postName,
          });
        }}
      >
        <Input
          placeholder="enter post"
          value={postName}
          onChange={(e) => setPostName(e.target.value)}
        />
        <Button
          type="submit"
          className="mt-2 w-full"
          disabled={status === "executing"}
        >
          Create with server
        </Button>
      </form>
    </div>
  );
}
