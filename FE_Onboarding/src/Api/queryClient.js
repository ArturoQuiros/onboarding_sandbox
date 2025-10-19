import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Reintenta una vez al fallar
      refetchOnWindowFocus: false, // Evita recargas molestas
      staleTime: 1000 * 60, // 1 min de datos “frescos”
    },
  },
});
