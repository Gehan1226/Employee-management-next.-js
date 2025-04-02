"use client";
import { MoveLeft } from "lucide-react";
import React from "react";

export default function LogoutButton() {
  const handleLogout = () => {
    console.log("logout");
  };
  
  return (
    <button
      className="flex gap-2 px-5 py-2 font-semibold text-md text-white hover:bg-red-500 rounded-md hover:shadow-md"
      onClick={handleLogout}
    >
      <MoveLeft color="#ffffff" />
      <p>Log out</p>
    </button>
  );
}
