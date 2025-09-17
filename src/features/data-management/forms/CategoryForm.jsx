import React from "react";
import { Box, Typography, TextField, Button, InputAdornment } from "@mui/material";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import TagIcon from "@mui/icons-material/Tag";

function CategoryForm({ initialData = {}, onSubmit, mode = "add", initialErrors = {} }) {
  const [formData, setFormData] = React.useState({
    id: initialData?.id || "",
    name: initialData?.name || "",
    code: initialData?.code || "",
  });

  const [error, setError] = React.useState({
    name: initialErrors.categoryName || "",
    code: initialErrors.categoryCode || "",
  });

  const isEdit = mode === "edit";

  // Update formData if initialData changes (important for edit mode)
  React.useEffect(() => {
    setError({
      name: initialErrors.categoryName || "",
      code: initialErrors.categoryCode || "",
    });
  }, [initialErrors]);

  const handleChange = (e) => {
    setError((prev) => ({ ...prev, [e.target.name]: "" }));
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    if (formData.name === "") {
      setError((prev) => ({ ...prev, name: "Category name is required" }));
      hasError = true;
    }
    if (formData.code === "") {
      setError((prev) => ({ ...prev, code: "Category code is required" }));
      hasError = true;
    }
    if (hasError) return;
    onSubmit(formData, () => setFormData({ name: "", code: "" }));
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {isEdit ? "Update Category" : "Add Category"}
      </Typography>
      <TextField
        placeholder="Category Name"
        variant="outlined"
        name="name"
        onChange={handleChange}
        value={formData.name}
        error={!!error.name}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <CheckroomIcon />
              </InputAdornment>
            ),
          },
        }}
        helperText={error.name}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        placeholder="Category Code"
        variant="outlined"
        name="code"
        onChange={handleChange}
        value={formData.code}
        error={!!error.code}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <TagIcon />
              </InputAdornment>
            ),
          },
        }}
        helperText={error.code}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={handleSubmit}>
          {isEdit ? "Update Category" : "Add Category"}
        </Button>
      </Box>
    </>
  );
}

export default CategoryForm;