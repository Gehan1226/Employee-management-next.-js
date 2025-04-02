import { Dialog, DialogContent, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

type ConfirmDialogProps = {
  open: boolean;
  handleClose: () => void;
  message: string;
  handleConfirm: () => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog({
  open,
  handleClose,
  message,
  handleConfirm
}: Readonly<ConfirmDialogProps>) {
  return (
    <Dialog
      open={open}
      slots={{ transition: Transition }}
      keepMounted
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        },
      }}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <p className="font-semibold text-xl text-center">Are you sure ?</p>
        <p className="text-center mt-3 text-gray-600">{message}</p>
      </DialogContent>

      <div className="flex justify-center items-center gap-5 py-3">
        <button
          className="px-5 py-2 font-semibold text-md text-white bg-blue-500 hover:bg-blue-600 rounded-md hover:shadow-md"
          onClick={handleConfirm}
        >
          Confirm
        </button>

        <button
          className="px-5 py-2 font-semibold text-md text-white bg-gray-500 hover:bg-gray-600 rounded-md hover:shadow-md"
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </Dialog>
  );
}
