import { api } from "@/trpc/server";

export default async function Page() {
  const chats = await api.chat.getAllChats();
  const chatMessages = await api.chat.getChatMessages({ chatId: 1 });

  return (
    <div>
      <h1>Page</h1>
      {chats.map((chat) => (
        <div key={chat.id}>
          <h2>{chat.name}</h2>
        </div>
      ))}
    </div>
  );
}
