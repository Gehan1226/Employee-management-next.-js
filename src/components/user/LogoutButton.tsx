"use client";
import { MoveLeft } from "lucide-react";
import React, { useState } from "react";
import ConfirmDialog from "../ConfirmDialog";
import { clearAuthCookie } from "@/lib/util/cookie";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const [openAlert, setOpenAlert] = useState(false);

  const handleLogout = () => {
    setOpenAlert(true);
  };

  const handleConfirmLogout = async () => {
    setOpenAlert(false);
    await clearAuthCookie();
    router.push("/user-login");
  };

  return (
    <>
      <button
        className="flex gap-2 px-5 py-2 font-semibold text-md text-white hover:bg-red-500 rounded-md hover:shadow-md"
        onClick={handleLogout}
      >
        <MoveLeft color="#ffffff" />
        <p>Log out</p>
      </button>

      <ConfirmDialog
        open={openAlert}
        handleClose={() => setOpenAlert(false)}
        handleConfirm={handleConfirmLogout}
        message="Are you sure to logout?. You will be redirected to login page."
      />
    </>
  );
}
