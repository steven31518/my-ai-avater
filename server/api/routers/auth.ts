import {
  compileActivationTemplate,
  compileRestPassTemplate,
  sendMail,
} from "@/lib/mail";
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
        name: z.string(),
        email: z.string(),
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
          code: "METHOD_NOT_SUPPORTED",
          message: "User already exists.",
        });

      const result = await ctx.prisma.user.create({
        data: { ...input, password: await bcrypt.hash(input.password, 10) },
      });

      const jwtUserId = signJwt({ id: result.id });

      const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`;

      const body = compileActivationTemplate(result.name, activationUrl);

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
      try {
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
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unspecified error occurred.",
        });
      }
    }),
  forgotPassword: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input,
        },
      });
      if (!user)
        throw new TRPCError({
          code: "METHOD_NOT_SUPPORTED",
          message: "User not found.",
        });
      const jwtUserId = signJwt({ id: user.id });
      const resetPassUrl = `${process.env.NEXTAUTH_URL}/auth/resetPass/${jwtUserId}`;
      const body = compileRestPassTemplate(user.name, resetPassUrl);

      await sendMail({
        to: user.email,
        subject: "Reset password request",
        body,
      });
      return `Reset password link has been sent to ${user.email}.`;
    }),
  resetPassValidation: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      try {
        const payload = verifyJwt(input);
        if (!payload) return "URLIsNotValid";
        const userId = payload?.id;
        const user = await ctx.prisma.user.findUnique({
          where: {
            id: userId,
          },
        });
        if (!user) return "userNotExist";
        return "validURL";
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unspecified error occurred.",
        });
      }
    }),
  resetPassword: publicProcedure
    .input(z.object({ password: z.string(), jwt: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const payload = verifyJwt(input.jwt);
      if (!payload)
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
      const userId = payload?.id;
      const user = ctx.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user)
        throw new TRPCError({
          code: "METHOD_NOT_SUPPORTED",
          message: "User not found.",
        });
      const result = await ctx.prisma.user.update({
        where: { id: userId },
        data: { password: await bcrypt.hash(input.password, 10) },
      });
      if (result) return "Password has been reset successfully.";
    }),
});
