"use server";

import { api } from "@/trpc/server";

export default async function ChatMessages({ chatId }: { chatId?: number }) {
  if (chatId === undefined) {
    return <p>You can start a new conversation.</p>;
  }

  const chat = await api.chat.getChatMessages({ chatId });

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-2">
        {chat &&
          chat.messages.map((message) => (
            <div key={message.id} className="flex gap-4 ">
              <p className="basis-1/5	 text-sm font-bold">{message.role}</p>
              <p className="basis-4/5 rounded-md bg-muted p-2 text-sm">
                {message.content}
              </p>
            </div>
          ))}
        <div className="h-28" />
      </div>
    </div>
  );
}
