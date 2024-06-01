import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container mx-auto flex flex-grow flex-col items-center justify-center bg-background">
        <div className="flex w-96 flex-col gap-3 font-mono">
          <Link href="/simplechat" className="underline">
            to Simple Chat
          </Link>
          <Link href="/posts" className="underline">
            to Posts
          </Link>
        </div>
      </div>
    </main>
  );
}
