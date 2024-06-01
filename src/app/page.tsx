import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container mx-auto flex flex-grow flex-col items-center justify-center">
        <Link href="/simplechat">Simple Chat</Link>
      </div>
    </main>
  );
}
