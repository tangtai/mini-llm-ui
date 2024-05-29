import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-grow mx-auto container flex flex-col justify-center items-center">
        <Link href="/simplechat">Simple Chat</Link>
      </div>
    </main>
  );
}
