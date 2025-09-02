import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import PlaceIcon from "@mui/icons-material/Place";
import { addSupplier } from "../../api/supplierApi";

function AddSupplierForm() {
  const [supplierData, setSupplierData] = React.useState({
    name: "",
    location: "",
  });
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState({
    name: "",
    location: "",
  });
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
    setSupplierData({
      ...supplierData,
      [name]: value,
    });
    setError({ name: "", location: "" }); // Reset error on input change
  };

  const handleAddSupplier = () => {
    if (supplierData.name === "" || supplierData.location === "") {
      if (supplierData.name === "") {
        setError((prev) => ({ ...prev, name: "Supplier name is required" }));
      }

      if (supplierData.location === "") {
        setError((prev) => ({ ...prev, location: "Location is required" }));
      }
      return;
    }

    // Call API to add supplier
    addSupplier(supplierData)
      .then((response) => {
        if (response) {
          // Reset form after successful addition
          setSupplierData({ name: "", location: "" });
          handleClick(); // Show success message
        }
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          setNetworkError(true);
          return;
        }
        if (error.response && error.response.status === 409) {
          setError((prev) => ({ ...prev, name: error.response.data }));
        }
      });
  };

  return (
    <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Supplier Management
      </Typography>
      <TextField
        placeholder="Add Supplier"
        variant="outlined"
        name="name"
        onChange={handleInputChange}
        value={supplierData.name}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <StoreIcon />
              </InputAdornment>
            ),
          },
        }}
        error={error.name}
        helperText={error.name ? error.name : ""}
        fullWidth
      />
      <TextField
        sx={{ mt: 2 }}
        placeholder="Location"
        name="location"
        onChange={handleInputChange}
        value={supplierData.location}
        variant="outlined"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PlaceIcon />
              </InputAdornment>
            ),
          },
        }}
        fullWidth
        error={error.location}
        helperText={error.location ? error.location : ""}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="contained" onClick={() => handleAddSupplier()}>
          Add Supplier
        </Button>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Supplier added successfully!
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

export default AddSupplierForm;
