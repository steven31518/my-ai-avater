import { publicProcedure, createTRPCRouter } from "../trpc";
import { TRPCError } from "@trpc/server";
import * as bcrypt from "bcrypt";
import { z } from "zod";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phoneNumber: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (user)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User already exists.",
        });
      await ctx.prisma.user.create({
        data: { ...input, password: await bcrypt.hash(input.password, 10) },
      });
      return "User created successfully.";
    }),
});
