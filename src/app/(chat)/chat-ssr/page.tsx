import { Suspense } from "react";
import ChatMessages from "./_parts/chat-messages";
import NewMessage from "./_parts/new-message";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="flex bg-background">
      <Suspense fallback={<p>laoding</p>}>
        <ChatMessages
          chatId={
            searchParams?.chat_id
              ? parseInt(searchParams.chat_id as string)
              : undefined
          }
        />
      </Suspense>
      <div className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-center ">
        <div className="h-20 w-2/5 self-center rounded-t-sm bg-secondary p-2">
          <NewMessage />
        </div>
      </div>
    </div>
  );
}
