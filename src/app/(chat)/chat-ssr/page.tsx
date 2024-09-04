import { Suspense } from "react";
import CurrentChat from "./_parts/current-chat";
import { api, RouterOutputs } from "@/trpc/server";

type ChatMessage = RouterOutputs["chat"]["getChatMessages"];

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  let chat: ChatMessage | null = null;

  if (searchParams?.chat_id) {
    const chatId = parseInt(searchParams.chat_id as string, 10);

    if (!isNaN(chatId)) {
      try {
        chat = await api.chat.getChatMessages({
          chatId: chatId,
        });
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    }
  }

  return (
    <div className="flex min-w-96">
      <Suspense fallback={<p>laoding</p>}>
        <CurrentChat
          chatId={
            searchParams?.chat_id
              ? parseInt(searchParams.chat_id as string)
              : undefined
          }
        />
      </Suspense>
    </div>
  );
}
