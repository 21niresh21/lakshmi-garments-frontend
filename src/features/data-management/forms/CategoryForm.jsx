import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import TagIcon from "@mui/icons-material/Tag";

function CategoryForm({ initialData = {}, onSubmit, mode = "add", initialErrors = {} }) {
  console.log(initialErrors);
  const nameRef = useRef(null);

  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    name: initialData?.name || "",
    code: initialData?.code || "",
  });

  const [error, setError] = useState({
    name: initialErrors.categoryName || "",
    code: initialErrors.categoryCode || "",
  });

  const isEdit = mode === "edit";

  useEffect(() => {
    setError({
      name: initialErrors.categoryName || "",
      code: initialErrors.categoryCode || "",
    });

    // Focus the first input on open
    if (nameRef.current && isEdit) {
      nameRef.current.focus();
    }
  }, [initialErrors.categoryName, initialErrors.categoryCode]);

  const handleChange = (e) => {
    setError((prev) => ({ ...prev, [e.target.name]: "" }));
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    if (formData.name.trim() === "") {
      setError((prev) => ({ ...prev, name: "Category name is required" }));
      hasError = true;
    }

    if (formData.code.trim() === "") {
      setError((prev) => ({ ...prev, code: "Category code is required" }));
      hasError = true;
    }

    if (hasError) return;

    onSubmit(formData, () => setFormData({ name: "", code: "", id: "" }));
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {isEdit ? "Update Category" : "Add Category"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          placeholder="Category Name"
          variant="outlined"
          name="name"
          inputRef={nameRef}
          onChange={handleChange}
          value={formData.name}
          error={!!error.name}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CheckroomIcon />
              </InputAdornment>
            ),
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TagIcon />
              </InputAdornment>
            ),
          }}
          helperText={error.code}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            {isEdit ? "Update Category" : "Add Category"}
          </Button>
        </Box>
      </form>
    </>
  );
}

export default CategoryForm;
