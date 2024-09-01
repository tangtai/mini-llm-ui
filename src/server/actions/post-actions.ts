"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { api } from "@/trpc/server";

const CreatePostSchema = z.object({
  name: z.string(),
});

export const createPost = actionClient
  .schema(CreatePostSchema)
  .action(async ({ parsedInput: { name } }) => {
    const res = await api.post.create({ name });
    revalidatePath("/posts-server-action");
    return res;
  });

const DeletePostSchema = z.object({
  id: z.number(),
});

export const deletePost = actionClient
  .schema(DeletePostSchema)
  .action(async ({ parsedInput: { id } }) => {
    console.log("delete post", id);
    const res = await api.post.delete({ id });
    revalidatePath("/posts-server-action");
    return res;
  });
