import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import SuccessMessage from "./animations/SuccessMessage";

type AlertDialogSlideProps = {
  open: boolean;
  handleClose: () => void;
  message: string;
  description: string;
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
  open,
  handleClose,
  message,
  description,
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
        <DialogTitle className="text-center" color="primary">
          {"Message Alert"}
        </DialogTitle>

        <SuccessMessage
          message={message}
          className="mt-5"
        />
        <DialogContentText id="alert-dialog-slide-description" className="mt-5">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
}
