import { testRouter } from "./routers/test";
import { createTRPCRouter } from "./trpc";
import { publicProcedure } from "./trpc";

export const appRouter = createTRPCRouter({
  test: testRouter,
});

export type AppRouter = typeof appRouter;
