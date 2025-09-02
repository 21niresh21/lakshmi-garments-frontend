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
import CheckroomIcon from "@mui/icons-material/Checkroom";
import TagIcon from "@mui/icons-material/Tag";
import { addCategory } from "../../api/categoryApi";

function AddCategoryForm({ onRefresh }) {
  const [categoryData, setCategoryData] = React.useState({
    name: "",
    code: "",
  });
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState({
    name: "",
    code: "",
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
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
    setError({ name: "", code: "" }); // Reset error on input change
  };

  const handleAddCategory = () => {
    if (!categoryData.name || !categoryData.code) {
      if (categoryData.name === "") {
        setError((prev) => ({
          ...prev,
          name: "Category name is required",
        }));
      }
      if (categoryData.code === "") {
        setError((prev) => ({
          ...prev,
          code: "Category code is required",
        }));
      }
      return;
    }
    addCategory(categoryData)
      .then((response) => {
        if (response) {
          setCategoryData({ name: "", code: "" });
          handleClick();
          onRefresh(); // Call the refresh function passed as prop
        }
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          setNetworkError(true);
          return;
        }
        if (error.response.data.includes("Code")) {
          setError((prev) => ({
            ...prev,
            code: error.response.data,
          }));
        } else {
          setError((prev) => ({
            ...prev,
            name: error.response.data,
          }));
        }
        console.error("Failed to add category:", error);
      });
  };

  return (
    <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Category Management
      </Typography>
      <TextField
        placeholder="Category Name"
        variant="outlined"
        name="name"
        onChange={handleInputChange}
        value={categoryData.name}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <CheckroomIcon />
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
        placeholder="Category Code"
        name="code"
        onChange={handleInputChange}
        value={categoryData.code}
        variant="outlined"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <TagIcon />
              </InputAdornment>
            ),
          },
        }}
        error={error.code}
        helperText={error.code ? error.code : ""}
        fullWidth
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="contained" onClick={handleAddCategory}>
          Add Category
        </Button>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Category added successfully!
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

export default AddCategoryForm;
