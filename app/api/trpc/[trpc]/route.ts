import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";

const createContext = async () => {
  return await createTRPCContext();
};

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "api/trpc",
    req,
    router: appRouter,
    createContext: async () => await createContext(),
  });

export { handler as GET, handler as POST };
