import { publicProcedure, createTRPCRouter } from "../trpc";
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
      const user = await ctx.prisma.user.create({
        data: { ...input, password: await bcrypt.hash(input.password, 10) },
      });
    }),
});
