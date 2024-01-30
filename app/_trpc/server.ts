import { createTRPCContext, createCallerFactory } from "@/server/api/trpc";
import { appRouter } from "@/server/api/root";

const createContext = async () => {
  return createTRPCContext();
};
const createCaller = createCallerFactory(appRouter);

export const serverClient = createCaller(async () => await createContext());
