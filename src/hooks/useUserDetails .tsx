import { getUserDetailsByName } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useUserDetails = (userName: string | null) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserDetailsByName(userName ?? ""),
    enabled: !!userName,
    retry: (failureCount, error) => {
      if (error.message.includes("Unauthorized:")) {
        return false;
      }
      return failureCount < 2;
    },
  });

  const isAuthorizationError = useMemo(() => {
    return error?.message.includes("Unauthorized:");
  }, [error]);

  return {
    user,
    isLoading,
    error,
    isAuthorizationError,
  };
};
