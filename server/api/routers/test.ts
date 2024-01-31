import { prisma } from "./../../db";
import { publicProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";
export const testRouter = createTRPCRouter({
  getTodos: publicProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;
    return prisma.task.findMany();
  }),
  addTodo: publicProcedure
    .input(z.string().min(1))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.task.create({
        data: {
          content: input,
        },
      });
    }),
});
