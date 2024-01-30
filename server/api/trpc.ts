import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import prisma from "@/server/db";

export const createTRPCContext = async () => {
  return {
    prisma,
  };
};

export const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        ZodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

export const createCallerFactory = t.createCallerFactory;

export const publicProcedure = t.procedure;
