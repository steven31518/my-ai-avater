"use client";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import { type AppRouter } from "@/server/api/root";
import { useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import SuperJSON from "superjson";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
export const api = createTRPCReact<AppRouter>({});

export function TRPCReactProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: SuperJSON,
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/trpc",
        }),
      ],
    })
  );
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>
          <api.Provider client={trpcClient} queryClient={queryClient}>
            <Toaster position="top-center" />
            {children}
          </api.Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
