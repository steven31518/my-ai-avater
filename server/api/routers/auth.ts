import { compileActivationTemplate, sendMail } from "@/lib/mail";
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

      const result = await ctx.prisma.user.create({
        data: { ...input, password: await bcrypt.hash(input.password, 10) },
      });

      const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${result.id}`;

      const body = compileActivationTemplate(input.firstName, activationUrl);

      await sendMail({
        to: input.email,
        subject: "Activate your account",
        body,
      });

      return result;
    }),
});
