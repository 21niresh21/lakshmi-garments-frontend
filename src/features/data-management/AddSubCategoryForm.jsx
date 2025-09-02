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
  Autocomplete,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { addSubCategory } from "../../api/subCategoryApi";
import { fetchCategories } from "../../api/categoryApi";

function AddSubCategoryForm({ refresh }) {
  const [subCategoryData, setSubCategoryData] = React.useState({
    name: "",
    categoryName: "",
  });
  const [categories, setCategories] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState({
    name: "",
    categoryName: "",
  });
  const [networkError, setNetworkError] = React.useState(false);

  React.useEffect(() => {
    fetchCategories()
      .then((res) => setCategories(res.data.content))
      .catch(() => setCategories([]));
  }, [refresh]);

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
    setSubCategoryData({
      ...subCategoryData,
      [name]: value,
    });
    setError({ name: "", categoryName: "" }); // Reset error on input change
  };

  const handleCategoryChange = (event, newValue) => {
    setSubCategoryData({
      ...subCategoryData,
      categoryName: newValue ? newValue.name : "",
    });
    setError("");
  };

  const handleAddSubCategory = () => {
    console.log(subCategoryData);

    if (!subCategoryData.name || !subCategoryData.categoryName) {
      if (subCategoryData.categoryName === "") {
        setError((prev) => ({
          ...prev,
          categoryName: "Category is required",
        }));
      }
      if (subCategoryData.name === "") {
        setError((prev) => ({
          ...prev,
          name: "Sub-category name is required",
        }));
      }
      return;
    }

    addSubCategory(subCategoryData)
      .then((response) => {
        if (response) {
          setSubCategoryData({ name: "", categoryName: "" });
          handleClick();
        }
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          setNetworkError(true);
          return;
        }
        setError((prev) => ({
          ...prev,
          name: error.response.data,
        }));
        console.error("Failed to add sub-category:", error);
      });
  };

  return (
    <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Sub-Category Management
      </Typography>
      <Autocomplete
        options={categories}
        getOptionLabel={(option) => option.name}
        value={
          categories.find((cat) => cat.name === subCategoryData.categoryName) ||
          null
        }
        onChange={(_, newValue) => {
          setSubCategoryData({
            ...subCategoryData,
            categoryName: newValue ? newValue.name : "",
          });
          setError((prev) => ({
            ...prev,
            categoryName: "",
          }));
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Category"
            error={!!error.categoryName}
            helperText={error.categoryName ? error.categoryName : ""}
          />
        )}
        sx={{ mb: 2 }}
      />
      <TextField
        placeholder="Sub-Category Name"
        variant="outlined"
        name="name"
        onChange={handleInputChange}
        value={subCategoryData.name}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SubdirectoryArrowRightIcon />
              </InputAdornment>
            ),
          },
        }}
        fullWidth
        error={error.name}
        helperText={error.name ? error.name : ""}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="contained" onClick={handleAddSubCategory}>
          Add Sub-Category
        </Button>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Sub-Category added successfully!
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

export default AddSubCategoryForm;
