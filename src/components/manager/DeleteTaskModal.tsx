import { deleteTask } from "@/api/task";
import { IconButton, Tooltip } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import DeleteModal from "../DeleteModal";
import toast from "react-hot-toast";
import queryClient from "@/lib/util/queryClient";

type DeleteTaskModalProps = {
  taskId: number;
};

export default function DeleteTaskModal({
  taskId,
}: Readonly<DeleteTaskModalProps>) {
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: () => deleteTask(taskId),
    onSuccess: (response: string) => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["tasks-by-manager"] });
      toast.success(response);
    },
  });

  const onConfirm = () => {
    mutation.mutate();
  };

  return (
    <div>
      <Tooltip title="Delete">
        <IconButton size="small" color="error" onClick={() => setOpen(true)}>
          <Trash size={18} />
        </IconButton>
      </Tooltip>
      <DeleteModal
        tittle="task"
        open={open}
        handleClose={() => setOpen(false)}
        onConfirm={onConfirm}
      />
    </div>
  );
}
