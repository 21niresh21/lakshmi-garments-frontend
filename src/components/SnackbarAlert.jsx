import React from "react";
import { Snackbar, Alert } from "@mui/material";

function SnackbarAlert({
  open,
  onClose,
  message,
  severity = "success",
  duration = 3000,
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarAlert;
