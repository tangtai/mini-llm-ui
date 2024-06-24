import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { posts } from "@/server/db/schema/account";
import { desc, eq } from "drizzle-orm";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      // await new Promise((resolve) => setTimeout(resolve, 500));
      await ctx.db.insert(posts).values({
        name: input.name,
        createdById: ctx.session.user.id,
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.posts.findMany({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      limit: 100,
    });
    // await new Promise((resolve) => setTimeout(resolve, 500));
    return res;
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      await ctx.db.delete(posts).where(eq(posts.id, input.id));
    }),

  getProtected: protectedProcedure.query(({ ctx }) => {
    return {
      message: "Hello from protected post api",
      user: ctx.session.user,
    };
  }),
});
