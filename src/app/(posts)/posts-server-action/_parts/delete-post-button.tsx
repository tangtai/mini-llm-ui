"use client";

import { deletePost } from "@/server/actions/post-actions";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";

type Props = {
  id: number;
};

export default function DeletePostButton({ id }: Props) {
  const { execute, status, result } = useAction(deletePost);
  return (
    <Button
      size={"sm"}
      className="self-end"
      disabled={status === "executing"}
      onClick={async () => {
        await execute({
          id: id,
        });
      }}
    >
      {status === "executing" ? "Deleting ..." : "Delete"}
    </Button>
  );
}
