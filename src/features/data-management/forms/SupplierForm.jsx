import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import PlaceIcon from "@mui/icons-material/Place";

function SupplierForm({
  initialData = {},
  onSubmit,
  mode = "add",
  initialErrors = {},
}) {
  const nameRef = useRef(null);

  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    name: initialData?.name || "",
    location: initialData?.location || "",
  });

  const [error, setError] = useState({
    name: initialErrors.supplierName || "",
    location: initialErrors.supplierLocation || "",
  });

  const handleChange = (e) => {
    setError((prev) => ({ ...prev, [e.target.name]: "" }));
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    let hasError = false;

    if (!formData.name) {
      setError((prev) => ({ ...prev, name: "Supplier name is required" }));
      hasError = true;
    }
    if (!formData.location) {
      setError((prev) => ({
        ...prev,
        location: "Location is required",
      }));
      hasError = true;
    }

    if (hasError) return;

    onSubmit(formData, () => setFormData({ name: "", location: "", id: "" }));
  };

  const isEdit = mode === "edit";

  useEffect(() => {
    // Update errors when new props arrive
    setError({
      name: initialErrors.supplierName || "",
      location: initialErrors.supplierLocation || "",
    });

    // Autofocus name field on mount
    if (nameRef.current && isEdit) {
      nameRef.current.focus();
    }
  }, [initialErrors.supplierName, initialErrors.supplierLocation]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {isEdit ? "Update Supplier" : "Add Supplier"}
      </Typography>

      <form onSubmit={handleSubmit} onKeyDown={(e) => e.stopPropagation()}>
        <TextField
          placeholder="Supplier Name"
          variant="outlined"
          name="name"
          inputRef={nameRef}
          onChange={handleChange}
          value={formData.name}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <StoreIcon />
              </InputAdornment>
            ),
          }}
          error={!!error.name}
          helperText={error.name}
          fullWidth
          margin="normal"
        />

        <TextField
          placeholder="Location"
          name="location"
          onChange={handleChange}
          value={formData.location}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PlaceIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          margin="normal"
          error={!!error.location}
          helperText={error.location}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" type="submit">
            {isEdit ? "Update Supplier" : "Add Supplier"}
          </Button>
        </Box>
      </form>
    </>
  );
}

export default SupplierForm;
