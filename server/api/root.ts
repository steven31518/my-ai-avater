import { testRouter } from "./routers/test";
import { authRouter } from "./routers/auth";
import { createTRPCRouter } from "./trpc";
import { publicProcedure } from "./trpc";

export const appRouter = createTRPCRouter({
  test: testRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
