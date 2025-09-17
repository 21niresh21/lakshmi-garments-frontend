import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";

function SubCategoryForm({
  initialData = {},
  onSubmit,
  mode = "add",
  initialErrors = {},
}) {

  const [formData, setFormData] = React.useState({
    id: initialData?.id || "",
    name: initialData?.name || "",
  });

  const [error, setError] = React.useState({
    name: initialErrors.subCategoryName || "",
  });

  // Add this useEffect to sync error state with initialErrors prop
  React.useEffect(() => {
    setError({
      name: initialErrors.subCategoryName || "",
    });
  }, [initialErrors]);

  const handleChange = (e) => {
    setError((prev) => ({ ...prev, [e.target.name]: "" }));
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name === "") {
      setError({ name: "Subcategory name is required" });
      return;
    }
    onSubmit(formData, () => setFormData({ name: "" }));
  };

  const isEdit = mode === "edit";
  console.log(error.name);

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {isEdit ? "Update Subcategory" : "Add Subcategory"}
      </Typography>
      <TextField
        placeholder="Subcategory Name"
        variant="outlined"
        name="name"
        onChange={handleChange}
        value={formData.name}
        error={!!error.name}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <CategoryIcon />
              </InputAdornment>
            ),
          },
        }}
        helperText={error.name}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={handleSubmit}>
          {isEdit ? "Update Subcategory" : "Add Subcategory"}
        </Button>
      </Box>
    </>
  );
}

export default SubCategoryForm;
