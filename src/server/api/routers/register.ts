import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { users, passwords } from "@/server/db/schema";

export const registerRouter = createTRPCRouter({
  email: publicProcedure
    .input(
      z.object({
        name: z.string().max(100),
        email: z.string().email(),
        password: z.string().min(8),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // const { name, email, password } = input;

      const exist = await ctx.db.query.users.findFirst({
        where: (users, { eq }) => {
          return eq(users.email, input.email);
        },
      });

      if (exist) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        });
      }

      await ctx.db.transaction(async (trx) => {
        const newUser = await trx
          .insert(users)
          .values({
            name: input.name,
            email: input.email,
          })
          .returning({ id: users.id })
          .execute();

        const newUserId = newUser[0].id;

        await trx
          .insert(passwords)
          .values({
            userId: newUserId,
            hash: input.password,
          })
          .execute();
      });

      return {
        status: 201,
        message: "User registered",
        result: input.email,
      };
    }),
});
