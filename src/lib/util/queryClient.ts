import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { clearAuthCookie } from "./cookie";
import toast from "react-hot-toast";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: unknown) => {
      if (error instanceof Error && error.message.includes("Unauthorized")) {
        toast.error(error.message);
        clearAuthCookie();
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: unknown) => {
      if (error instanceof Error && error.message.includes("Unauthorized")) {
        toast.error(error.message);
        clearAuthCookie();
      }
    },
  }),
});

export default queryClient;
