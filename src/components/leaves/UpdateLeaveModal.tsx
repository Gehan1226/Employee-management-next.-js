import { Box, IconButton, Modal, Tooltip } from "@mui/material";
import { Pencil, X } from "lucide-react";
import React, { useState } from "react";

export default function UpdateLeaveModal() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Tooltip title="Edit">
        <IconButton size="small" color="primary" onClick={() => setOpen(true)}>
          <Pencil size={18} />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] bg-white rounded-[10px] shadow-lg p-7">
          <button
            className="absolute top-3 right-3 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            onClick={() => setOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
          <p className="font-semibold text-lg">Update Leave Staus</p>
          <p className="text-sm text-gray-500">
            You can update the leave status here. You will be recorded as the
            person who made the changes.
          </p>
        </Box>
      </Modal>
    </div>
  );
}
