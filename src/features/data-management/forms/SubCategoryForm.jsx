import React, { useEffect, useRef, useState } from "react";
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
  const nameRef = useRef(null);

  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    name: initialData?.name || "",
  });

  const [error, setError] = useState({
    name: initialErrors.subCategoryName || "",
  });

  const isEdit = mode === "edit";

  useEffect(() => {
    setError({
      name: initialErrors.subCategoryName || "",
    });

    if (nameRef.current && isEdit) {
      nameRef.current.focus();
    }
  }, [initialErrors.subCategoryName]);

  const handleChange = (e) => {
    setError((prev) => ({ ...prev, [e.target.name]: "" }));
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() === "") {
      setError({ name: "Subcategory name is required" });
      return;
    }
    onSubmit(formData, () => setFormData({ name: "", id: "" }));
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {isEdit ? "Update Subcategory" : "Add Subcategory"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          placeholder="Subcategory Name"
          variant="outlined"
          name="name"
          inputRef={nameRef}
          onChange={handleChange}
          value={formData.name}
          error={!!error.name}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CategoryIcon />
              </InputAdornment>
            ),
          }}
          helperText={error.name}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained">
            {isEdit ? "Update Subcategory" : "Add Subcategory"}
          </Button>
        </Box>
      </form>
    </>
  );
}

export default SubCategoryForm;
