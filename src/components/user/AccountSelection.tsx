"use client";
import React, { useEffect, useRef } from "react";
import NotifactionButton from "./NotifactionButton";
import EmployeeAccount from "../account/EmployeeAccount";
import ManagerAccount from "../account/ManagerAccount";
import AdminAccount from "../account/AdminAccount";
import { useQuery } from "@tanstack/react-query";
import { getUserDetailsByName } from "@/api/auth";
import { decodeJwt } from "@/lib/util/jwt";

export default function AccountSelection() {
  const userNameRef = useRef<string>(null);  

//   const {} = useQuery({
//     queryKey: ["user"],
//     queryFn: () => getUserDetailsByName,
//   });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await decodeJwt();
        // Use the data here
        console.log(data);
      } catch (error) {
        console.error("Error decoding JWT:", error);
      }
    };

    fetchData();
  }, []);
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

          <EmployeeAccount />
          <ManagerAccount />
          <AdminAccount />
        </div>
      </div>
    </>
  );
}
