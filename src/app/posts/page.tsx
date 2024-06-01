"use client";

import { useState } from "react";
import { api, RouterOutputs } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  const { data, isLoading, error } = api.post.getAll.useQuery();

  return (
    <main className="relative min-h-screen font-mono">
      <div className="container mx-auto flex h-dvh items-center justify-center bg-gray-200">
        <div className="flex flex-col gap-2 p-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <ul>
              {data?.map((post) => (
                <li key={post.id}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
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
  const deletePost = api.post.delete.useMutation({
    onSuccess: () => {
      utils.post.getAll.invalidate();
    },
  });

  return (
    <div className="m-1 flex items-center gap-2 rounded-md bg-gray-100 px-4 py-2">
      <div className="w-64">
        <p className="line-clamp-1 text-sm">{post.name}</p>
        <p className="text-xs text-gray-400">{post.createdAt.toDateString()}</p>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="hover:bg-red-500 hover:text-white"
        onClick={() => {
          deletePost.mutate({ id: post.id });
        }}
      >
        <TrashIcon />
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
      className="flex flex-col gap-2 rounded-md bg-gray-300 p-2"
    >
      <input
        type="text"
        placeholder=""
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-md px-2 py-2"
      />
      <Button type="submit" disabled={createPost.isPending}>
        {createPost.isPending ? "Creating..." : "Create Post"}
      </Button>
    </form>
  );
};
