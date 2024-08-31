"use client";

import { deleteChat } from "@/server/actions/chat-actions";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { cn } from "@/lib/utils";

type Props = {
  chatId: number;
  className?: string;
};

export default function ChatDeleteButton({ chatId, className }: Props) {
  const { execute, status, result } = useAction(deleteChat);
  return (
    <Button
      variant={"ghost"}
      className={cn("text-xs", className)}
      size={"sm"}
      disabled={status === "executing"}
      onClick={async () => {
        await execute({
          chatId: chatId,
        });
      }}
    >
      Delete
    </Button>
  );
}
