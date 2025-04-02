import AdminAccount from "@/components/account/AdminAccount";
import EmployeeAccount from "@/components/account/EmployeeAccount";
import ManagerAccount from "@/components/account/ManagerAccount";
import React from "react";

export default function Page() {
  return (
    <div className="min-h-screen w-full">
      <div className="min-h-screen flex items-center justify-center">
        <div className="rounded-xl border bg-card text-card-foreground shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-fit px-20 py-3">
          <p className="font-semibold text-gray-800 text-2xl text-center py-5">
            Select an Account
          </p>

          <EmployeeAccount />
          <ManagerAccount />
          <AdminAccount />
        </div>
      </div>
    </div>
  );
}
