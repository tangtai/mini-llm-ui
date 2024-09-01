"use client";

import { deleteChat } from "@/server/actions/chat-actions";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

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
      size={"icon"}
      disabled={status === "executing"}
      onClick={async () => {
        await execute({
          chatId: chatId,
        });
      }}
    >
      <Trash2 className="size-4" />
    </Button>
  );
}
