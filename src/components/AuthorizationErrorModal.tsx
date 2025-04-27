import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { AlertCircle } from "lucide-react";

type AuthorizationErrorModalProps = {
  open: boolean;
  onClose: () => void;
};

const AuthorizationErrorModal: React.FC<AuthorizationErrorModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="authorization-error-title"
      aria-describedby="authorization-error-description"
    >
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <AlertCircle size={48} color="#f44336" />
        <Typography id="authorization-error-title" variant="h6" component="h2">
          Authorization Error
        </Typography>
        <Typography
          id="authorization-error-description"
          sx={{ mt: 1, textAlign: "center" }}
        >
          You are not authorized to perform this action. Please log in again to
          continue.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          sx={{ mt: 3, borderRadius: 2 }}
        >
          OK
        </Button>
      </Box>
    </Modal>
  );
};

export default AuthorizationErrorModal;
