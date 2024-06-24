import { api, RouterOutputs } from "@/trpc/server";
import Link from "next/link";

export default async function ListChats() {
  const chats = await api.chat.getAllChats();

  const last = chats[chats.length - 1];

  return (
    <div className="flex w-full flex-col gap-1">
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
      className="w-full rounded-sm bg-background px-2 py-1 text-sm text-foreground opacity-70 hover:opacity-100"
    >
      <Link href={`/chat-ssr?chat_id=${chat.id}`}>
        <p className="overflow-hidden text-ellipsis">{chat.name}</p>
      </Link>
    </div>
  );
}
