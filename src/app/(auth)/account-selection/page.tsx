import AdminAccount from "@/components/account/AdminAccount";
import EmployeeAccount from "@/components/account/EmployeeAccount";
import ManagerAccount from "@/components/account/ManagerAccount";
import { Bell, MoveLeft } from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <div className="min-h-screen w-full relative">
      <div className="absolute top-3 right-3">
        <button className="flex gap-2 bg-slate-100 hover:bg-slate-300 rounded-md px-5 py-2 shadow-md font-semibold text-sm">
          <Bell color="#000000" /> Notifications
        </button>
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

      <div className="absolute bottom-3 left-3">
        <button className="flex gap-2 px-5 py-2 font-semibold text-md text-white hover:bg-red-500 rounded-md hover:shadow-md">
          <MoveLeft color="#ffffff" />
          <p>Log out</p>
        </button>
      </div>
    </div>
  );
}
