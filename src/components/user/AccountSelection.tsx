"use client";
import React, { useEffect, useState } from "react";
import NotifactionButton from "./NotifactionButton";
import EmployeeAccount from "../account/EmployeeAccount";
import ManagerAccount from "../account/ManagerAccount";
import AdminAccount from "../account/AdminAccount";
import { useQuery } from "@tanstack/react-query";
import { getUserDetailsByName } from "@/api/auth";
import { decodeJwt } from "@/lib/util/jwt";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import AccountSkelton from "../skeltons/AccountSkelton";
import { useHandleError } from "@/hooks/useHandleError";
import { clearAuthCookie } from "@/lib/util/cookie";

export default function AccountSelection() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  const {
    data: user,
    isLoading: userLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserDetailsByName(userName ?? ""),
    enabled: !!userName,
  });

  useHandleError({ error });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await decodeJwt();
        setUserName(data.sub);
      } catch (error) {
        console.error("Error decoding JWT:", error);
        toast.error("Authentication issue detected. Please log in again.", {
          position: "top-right",
        });
        await clearAuthCookie();
        router.push("/user-login");
      }
    };
    fetchData();
  }, [router]);

  return (
    <>
      <div className="absolute top-3 right-3">
        <NotifactionButton />
      </div>

      <div className="min-h-screen flex items-center justify-center">
        <div className="rounded-xl border bg-card text-card-foreground shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-fit px-20 py-8">
          <p className="font-semibold text-gray-800 text-2xl text-center py-2">
            Select an Account
          </p>

          <p className="text-center text-sm text-gray-600 italic">
            your information is protected.
          </p>

          {user && (
            <>
              <EmployeeAccount user={user} />
              <ManagerAccount user={user} />
              <AdminAccount user={user} />
            </>
          )}

          {userLoading && (
            <div className="mt-8">
              <AccountSkelton />
              <AccountSkelton />
              <AccountSkelton />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
