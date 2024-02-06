import { compileActivationTemplate, sendMail } from "@/lib/mail";
import { publicProcedure, createTRPCRouter } from "../trpc";
import { TRPCError } from "@trpc/server";
import * as bcrypt from "bcrypt";
import { z } from "zod";
import { signJwt } from "@/lib/jwt";
import { verifyJwt } from "@/lib/jwt";

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

      const jwtUserId = signJwt({ id: result.id });

      const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`;

      const body = compileActivationTemplate(result.firstName, activationUrl);

      await sendMail({
        to: result.email,
        subject: "Activate your account",
        body,
      });

      return result;
    }),

  emailValidation: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const payload = verifyJwt(input);
      const userId = payload?.id;
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) return "userNotExist";

      if (user.emailVerified) return "alreadyActivated";

      const result = await ctx.prisma.user.update({
        where: { id: userId },
        data: { emailVerified: new Date() },
      });
      return `Your Account: ${result.email} has been activated successfully.`;
    }),
});
