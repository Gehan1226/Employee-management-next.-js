import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { clearAuthCookie } from "./cookie";
import toast from "react-hot-toast";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
        if (error.message.includes("Unauthorized")) {
          console.log("Unauthorized error:", error);
          clearAuthCookie();
        }
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
        if (error.message.includes("Unauthorized")) {
          clearAuthCookie();
        }
      }
    },
  }),
});

export default queryClient;
