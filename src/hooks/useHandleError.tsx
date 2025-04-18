import { clearAuthCookie } from "@/lib/util/cookie";
import queryClient from "@/lib/util/queryClient";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export function useHandleError({ error }: { error: Error | null }) {
  const router = useRouter();

  useEffect(() => {
    if (!error) return;

    toast.error(error.message, {
      position: "top-right",
      duration: 6000,
    });

    if (error.message.includes("JWT")) {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      clearAuthCookie();
      router.push("/user-login");
    }
  }, [router, error]);
}
