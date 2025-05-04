import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { reffreshToken } from "@/api/auth";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
        if (error.message.includes("Unauthorized: JWT has expired.")) {
          reffreshToken();
        }
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
        if (error.message.includes("Unauthorized: JWT has expired.")) {
          reffreshToken();
        }
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1, 
    },
    mutations: {
      retry: 1, 
    },
  },
});

export default queryClient;
