"use client";

import { useState } from "react";
import { api, RouterOutputs } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function PostClientPage() {
  const { data, isLoading, error } = api.post.getAll.useQuery();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100">
      <h1 className="py-8 text-2xl font-bold">client rendering</h1>

      <div className="flex gap-6">
        <Link href="/posts-server-action" className="underline">
          server action
        </Link>
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <div className="flex h-[800px] flex-col gap-2 overflow-auto">
              {data?.map((post) => <PostCard post={post} key={post.id} />)}
            </div>
          )}
        </div>
        <div>
          <PostCreate />
        </div>
      </div>
    </main>
  );
}

interface PostCardPorps {
  post: RouterOutputs["post"]["getAll"][number];
}

const PostCard: React.FC<PostCardPorps> = ({ post }) => {
  const utils = api.useUtils();
  const { mutate, isPending } = api.post.delete.useMutation({
    onSuccess: () => {
      utils.post.getAll.invalidate();
    },
  });

  return (
    <div className="flex w-96 items-center justify-between gap-2 rounded-md bg-background px-4 py-2 text-foreground">
      <div className="flex flex-col">
        <p className="line-clamp-1 text-sm">{post.name}</p>
        <p className="text-xs text-gray-400">{post.createdAt.toDateString()}</p>
      </div>
      <Button
        size={"sm"}
        className="self-end"
        onClick={() => {
          mutate({ id: post.id });
        }}
      >
        {isPending ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
};

const PostCreate: React.FC = () => {
  const [name, setName] = useState("");
  const utils = api.useUtils();

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      utils.post.getAll.invalidate();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ name });
      }}
      className="flex flex-col rounded-md bg-background p-2"
    >
      <Input
        type="text"
        placeholder="enter post"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-md px-2 py-2"
      />
      <Button type="submit" className="mt-2" disabled={createPost.isPending}>
        {createPost.isPending ? "Creating..." : "Create with client"}
      </Button>
    </form>
  );
};
