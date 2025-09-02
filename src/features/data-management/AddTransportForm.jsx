import React from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { addTransport } from "../../api/transportApi";

function AddTransportForm() {
  const [transportData, setTransportData] = React.useState({
    name: "",
  });
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [networkError, setNetworkError] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setNetworkError(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransportData({
      ...transportData,
      [name]: value,
    });
    setError(""); // Reset error on input change
  };

  const handleAddTransport = () => {
    if (transportData.name.trim() === "") {
      setError("Transport name cannot be empty");
      return;
    }
    // Call API to add transport
    addTransport(transportData)
      .then((response) => {
        if (response) {
          // Reset form after successful addition
          setTransportData({ name: "" });
          handleClick(); // Show success message
        }
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          setNetworkError(true);
          return;
        }
        if (error.response && error.response.status === 409) {
          setError(error.response.data);
        }
      });
  };

  return (
    <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Transport Management
      </Typography>
      <TextField
        placeholder="Add Transport"
        variant="outlined"
        name="name"
        onChange={handleInputChange}
        value={transportData.name}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LocalShippingIcon />
              </InputAdornment>
            ),
          },
        }}
        error={error}
        helperText={error ? error : ""}
        fullWidth
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="contained" onClick={handleAddTransport}>
          Add Transport
        </Button>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Transport added successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={networkError}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Network Error. Please try again later.
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default AddTransportForm;
