"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { action } from "@/lib/safe-action";
import { api } from "@/trpc/server";

const CreatePostSchema = z.object({
  name: z.string(),
});

export const createPost = action(CreatePostSchema, async ({ name }) => {
  const res = await api.post.create({ name });
  revalidatePath("/posts-server-action");
  return res;
});

const DeletePostSchema = z.object({
  id: z.number(),
});

export const deletePost = action(DeletePostSchema, async ({ id }) => {
  console.log("delete post", id);
  const res = await api.post.delete({ id });
  revalidatePath("/posts-server-action");
  return res;
});
