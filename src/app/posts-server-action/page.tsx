"use server";

import { api } from "@/trpc/server";
import { Suspense } from "react";
import Link from "next/link";
import CreatePostForm from "./_parts/create-post-form";
import DeletePostButton from "./_parts/delete-post-button";

export default async function PostsServerActionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100">
      <h1 className="py-8 text-2xl font-bold">Server Action rendering</h1>

      <div className="flex gap-6">
        <Link href="/posts-client" className="underline">
          client rendering
        </Link>
        <div>
          <Suspense fallback={<p>Loading posts</p>}>
            <PostList />
          </Suspense>
        </div>
        <div>
          <CreatePostForm />
        </div>
      </div>
    </main>
  );
}

async function PostList() {
  const posts = await api.post.getAll();
  return (
    <div className="flex h-[800px] flex-col gap-2 overflow-auto">
      {posts.map((post) => (
        <div
          className="flex w-96 items-center justify-between gap-2 rounded-md bg-background px-4 py-2 text-foreground"
          key={post.id}
        >
          <div className="flex flex-col">
            <p className="text- line-clamp-1 text-sm">{post.name}</p>
            <p className="text-xs text-gray-400">
              {post.createdAt.toDateString()}
            </p>
          </div>
          <DeletePostButton id={post.id} />
        </div>
      ))}
    </div>
  );
}
