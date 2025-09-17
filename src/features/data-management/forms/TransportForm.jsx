import React from "react";
import { Box, Typography, TextField, Button, InputAdornment } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

function TransportForm({ initialData = {}, onSubmit, mode = "add", initialErrors = {} }) {
  const [formData, setFormData] = React.useState({
    id: initialData?.id || "",
    name: initialData?.name || "",
    // Add other transport fields as needed
  });

  const [error, setError] = React.useState({
    name: initialErrors.transportName || "",
    // Add other fields as needed
  });

  React.useEffect(() => {
    setError({
      name: initialErrors.transportName || "",
    });
  }, [initialErrors]);

  const isEdit = mode === "edit";

  const handleChange = (e) => {
    setError((prev) => ({ ...prev, [e.target.name]: "" }));
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name === "") {
      setError((prev) => ({ ...prev, name: "Transport name is required" }));
      return;
    }
    onSubmit(formData, () => setFormData({ name: "" }));
  };

  return (
    <>
      <Typography variant="h6">
        {isEdit ? "Update Transport" : "Add Transport"}
      </Typography>
      <TextField
        placeholder="Transport Name"
        variant="outlined"
        name="name"
        onChange={handleChange}
        value={formData.name}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LocalShippingIcon />
              </InputAdornment>
            ),
          },
        }}
        error={!!error.name}
        helperText={error.name}
        fullWidth
        sx={{ mt: 2 }}
      />
      {/* Add more fields as needed */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="contained" onClick={handleSubmit}>
          {isEdit ? "Update Transport" : "Add Transport"}
        </Button>
      </Box>
    </>
  );
}

export default TransportForm;
