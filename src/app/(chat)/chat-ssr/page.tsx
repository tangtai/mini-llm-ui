import { Suspense } from "react";
// import ChatMessages from "./_parts/chat-messages";
// import NewMessage from "./_parts/new-message";
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
        {/* <ChatMessages
          chatId={
            searchParams?.chat_id
              ? parseInt(searchParams.chat_id as string)
              : undefined
          }
        /> */}
        <CurrentChat
          chatId={
            searchParams?.chat_id
              ? parseInt(searchParams.chat_id as string)
              : undefined
          }
        />
      </Suspense>
      {/* <div className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-center ">
        <div className="h-20 w-2/5 self-center rounded-t-sm bg-secondary p-2">z
          <NewMessage />
        </div>
      </div> */}
    </div>
  );
}
