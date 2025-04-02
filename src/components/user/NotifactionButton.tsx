"use client";
import { Bell } from "lucide-react";
import React, { useState } from "react";
import NotificationModal from "./NotificationModal";

export default function NotifactionButton() {
  const [openModal, setOpenModal] = useState(false);

  const handleNotification = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <button
        className="flex gap-2 bg-slate-100 hover:bg-slate-300 rounded-md px-5 py-2 shadow-md font-semibold text-sm"
        onClick={handleNotification}
      >
        <Bell color="#000000" /> Notifications
      </button>

      <NotificationModal open={openModal} handleClose={handleNotification} />
    </>
  );
}
