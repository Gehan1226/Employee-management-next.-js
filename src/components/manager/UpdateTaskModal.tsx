import { Box, IconButton, Modal, Tooltip } from "@mui/material";
import { Pencil, X } from "lucide-react";
import React, { useState } from "react";
import { TaskResponse } from "@/types/task";


type UpdateTaskModalProps = {
  taskdata: TaskResponse
}

export default function UpdateTaskModal({ taskdata }: Readonly<UpdateTaskModalProps>) {
  const [open, setOpen] = useState(false);

  console.log("taskdata", taskdata);

  return (
    <div>
      <Tooltip title="Edit">
        <IconButton
          size="small"
          color="primary"
          onClick={() => setOpen(true)}
        >
          <Pencil size={18} />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
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
          <p className="font-semibold text-lg">Create new task</p>
          <p className="text-sm text-gray-500">
            Create a new task by entering the required details. Click
            &apos;Save&apos; to confirm your changes.
          </p>
        </Box>
      </Modal>
    </div>
  );
}
