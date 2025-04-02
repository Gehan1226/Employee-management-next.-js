import AccountSelection from "@/components/user/AccountSelection";
import LogoutButton from "@/components/user/LogoutButton";
import React from "react";

export default function Page() {
  return (
    <div className="min-h-screen w-full relative">
      <AccountSelection />

      <div className="absolute bottom-3 left-3">
        <LogoutButton />
      </div>
    </div>
  );
}