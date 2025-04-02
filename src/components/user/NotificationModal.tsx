import { Box, Divider, Modal } from "@mui/material";
import { Mail } from "lucide-react";
import React from "react";

type NotificationModalProps = {
  open: boolean;
  handleClose: () => void;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export default function NotificationModal({
  open,
  handleClose,
}: Readonly<NotificationModalProps>) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <p className="font-semibold"> NOTIFICATIONS</p>
        <div className="flex gap-5 mt-3">
          <p className="font-semibold text-slate-500">All</p>
          <p className="font-semibold text-slate-500">Manager</p>
          <p className="font-semibold text-slate-500">Admin</p>
        </div>
        <Divider variant="fullWidth" className="my-3" />

        <div className="flex flex-col gap-2 mt-5">
          <div className="flex gap-3 justify-center items-center bg-sky-100 rounded-md px-3 py-1 shadow-sm">
            <Mail size={48} color="#000000" />
            <p className="text-slate-700">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur
              maxime architecto ipsam, odio praesentium sint iusto vitae ea sit
              fugit.
            </p>
          </div>

          <div className="flex gap-3 justify-center items-center bg-sky-100 rounded-md px-3 py-1 shadow-sm">
            <Mail size={48} color="#000000" />
            <p className="text-slate-700">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur
              maxime architecto ipsam, odio praesentium sint iusto vitae ea sit
              fugit.
            </p>
          </div>

          <div className="flex gap-3 justify-center items-center bg-sky-100 rounded-md px-3 py-1 shadow-sm">
            <Mail size={48} color="#000000" />
            <p className="text-slate-700">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur
              maxime architecto ipsam, odio praesentium sint iusto vitae ea sit
              fugit.
            </p>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
