import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import SuccessMessage from "./animations/SuccessMessage";
import ErrorMessage from "./animations/ErrorMessage";
import { Divider } from "@mui/material";
import { Mail } from "lucide-react";

type AlertDialogSlideProps = {
  state: "ERROR" | "SUCCESS";
  open: boolean;
  handleClose: () => void;
  message: string;
  errorDescription?: string;
  successDescription?: string;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  state,
  open,
  handleClose,
  message,
  errorDescription,
  successDescription,
}: Readonly<AlertDialogSlideProps>) {
  return (
    <Dialog
      open={open}
      slots={{ transition: Transition }}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <div className="flex gap-2 justify-center items-center">
          <Mail color="#098aec" />
          <p className="font-semibold text-sky-600 text-xl">
            Message Alert
          </p>
        </div>
        {state === "SUCCESS" ? (
          <SuccessMessage message={message} className="mt-10" />
        ) : (
          <ErrorMessage
            message={message}
            error={errorDescription ?? ""}
            className="mt-10"
          />
        )}

        <DialogContentText id="alert-dialog-slide-description" className="mt-7">
          {successDescription}
        </DialogContentText>
      </DialogContent>
      <Divider variant="middle" className="mb-3" />
      <DialogActions>
        <button
          className="text-white bg-blue-600 hover:bg-blue-800 border-2 border-white rounded-lg text-md font-semibold px-10 py-2 text-center"
          onClick={handleClose}
        >
          Continue
        </button>
      </DialogActions>
    </Dialog>
  );
}
