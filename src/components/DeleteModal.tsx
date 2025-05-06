import { Box, Modal } from "@mui/material";
import { X } from "lucide-react";
import React from "react";

type DeleteModalProps = {
  tittle: string;
  open: boolean;
  handleClose: () => void;
  onConfirm: () => void;
};

export default function DeleteModal({
  tittle,
  open,
  handleClose,
  onConfirm,
}: Readonly<DeleteModalProps>) {
  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] bg-white rounded-[10px] shadow-lg p-7">
        <button
          className="absolute top-3 right-3 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          onClick={() => handleClose}
        >
          <X className="w-5 h-5" />
        </button>
        <p className="font-semibold text-lg text-red-600">Delete {tittle}</p>

        <p className="text-sm text-gray-500 mt-2">
          Are you sure you want to delete this {tittle}? This action cannot be
          undone.
        </p>

        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={() => handleClose}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm"
          >
            Delete
          </button>
        </div>
      </Box>
    </Modal>
  );
}
