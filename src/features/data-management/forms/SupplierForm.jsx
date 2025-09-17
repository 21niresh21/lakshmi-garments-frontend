import React from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import PlaceIcon from "@mui/icons-material/Place";

function SupplierForm({ initialData = {}, onSubmit, mode = "add", initialErrors = {} }) {
  const [formData, setFormData] = React.useState({
    id: initialData?.id || "",
    name: initialData?.name || "",
    location: initialData?.location || "",
  });
  const [error, setError] = React.useState({
    name: initialErrors.supplierName || "",
    location: initialErrors.supplierLocation || "",
  });

  const handleChange = (e) => {
    setError((prev) => ({ ...prev, [e.target.name]: "" }));
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name === "" || formData.location === "") {
      if (formData.name === "") {
        setError((prev) => ({ ...prev, name: "Supplier name is required" }));
      }

      if (formData.location === "") {
        setError((prev) => ({ ...prev, location: "Location is required" }));
      }
      return;
    }
    onSubmit(formData, () => setFormData({ name: "", location: "" }));
  };

  React.useEffect(() => {
    setError({
      name: initialErrors.supplierName || "",
      location: initialErrors.supplierLocation || "",
    });
  }, [initialErrors]);

  const isEdit = mode === "edit";

  return (
    <>
      <Typography variant="h6">
        {isEdit ? "Update Supplier" : "Add Supplier"}
      </Typography>
      <TextField
        placeholder="Add Supplier"
        variant="outlined"
        name="name"
        onChange={handleChange}
        value={formData.name}
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
        helperText={error.name}
        fullWidth
      />
      <TextField
        sx={{ mt: 2 }}
        placeholder="Location"
        name="location"
        onChange={handleChange}
        value={formData.location}
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
        helperText={error.location}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="contained" onClick={handleSubmit}>
          {isEdit ? "Update Supplier" : "Add Supplier"}
        </Button>
      </Box>
    </>
  );
}

export default SupplierForm;
