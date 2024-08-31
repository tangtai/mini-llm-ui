import { api, RouterOutputs } from "@/trpc/server";
import Link from "next/link";
import ChatDeleteButton from "./chat-delete-button";

export default async function ListChats() {
  const chats = await api.chat.getAllChats();

  return (
    <div className="flex flex-1 flex-col gap-1">
      {chats.map((chat) => (
        <ListItem chat={chat} key={chat.id} />
      ))}
    </div>
  );
}

interface ListItemProps {
  chat: RouterOutputs["chat"]["getAllChats"][number];
}

function ListItem({ chat }: ListItemProps) {
  return (
    <div
      key={chat.id}
      className="group flex w-full justify-between rounded-sm bg-background px-2 py-1 text-sm text-foreground opacity-70 hover:opacity-100"
    >
      <Link
        href={`/chat-ssr?chat_id=${chat.id}`}
        className="flex h-8 flex-1 items-center"
      >
        <p className="overflow-hidden text-ellipsis">{chat.name}</p>
      </Link>
      <ChatDeleteButton
        className="hidden bg-red-400 group-hover:flex"
        chatId={chat.id}
      />
    </div>
  );
}
