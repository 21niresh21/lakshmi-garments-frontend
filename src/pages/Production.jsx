import React, { useEffect, useState } from "react";
import ProductionForm from "../features/production/ProductionForm";
import { Box, Typography, Alert } from "@mui/material";
import {
  fetchAllCategorySubcategoryCount,
  fetchDistinctCategories,
  fetchSubCategoriesForCategory,
} from "../api/inventoryApi";
import { createBatch } from "../api/batchApi";
import InboxIcon from "@mui/icons-material/Inbox";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"; // MUI icon
import InventoryCountCard from "../features/production/InventoryCountCard";
import SnackbarAlert from "../components/SnackbarAlert";

function Production() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [categoryCount, setCategoryCount] = useState([]);
  const [zeroInventory, setZeroInventory] = useState(false);
  const [error, setError] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [formData, setFormData] = useState({
    category: null,
    serialCode: "",
    subCategories: [{ subCategory: "", quantity: "" }],
    isUrgent: false,
    remarks: "",
  });

  const moveToProduction = (formData, setFormData, setReview) => {
    const subCategories = formData.subCategories.map((item) => ({
      subCategoryID: item.subCategory.id,
      quantity: item.quantity,
    }));
    let createBatchData = {
      categoryID: formData.category.id,
      serialCode: formData.serialCode,
      isUrgent: formData.isUrgent,
      remarks: formData.remarks,
      subCategories,
    };
    createBatch(createBatchData)
      .then((res) => {
        if (res) {
          setSnackbar({
            open: true,
            message: "Batch created successfully",
            severity: "success",
          });
          setFormData({
            category: null,
            serialCode: "",
            subCategories: [{ subCategory: null, quantity: "" }],
            batchStatus: "",
            isUrgent: false,
            remarks: "",
          });
          setReview(false);
        }
      })
      .catch((err) => {
        setSnackbar({
          open: true,
          message: "Error creating batch",
          severity: "error",
        });
      });
  };

  useEffect(() => {
    fetchDistinctCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message: "Error fetching categories",
          severity: "error",
        });
      });

    // for the cards data
    fetchAllCategorySubcategoryCount()
      .then((res) => {
        setCategoryCount(res.data);
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message: "Error fetching category count",
          severity: "error",
        });
      });
  }, []);

  useEffect(() => {
    if (formData.category) {
    fetchSubCategoriesForCategory(formData.category.id)
      .then((res) => {
        console.log("res", res);
        setSubCategories(res.data);
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message: "Error fetching sub categories",
            severity: "error",
          });
        });
    }
  }, [formData.category]);

  useEffect(() => {
    if (categoryCount.length === 0) {
      setZeroInventory(true);
    } else {
      setZeroInventory(false);
    }
  }, [categoryCount]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: 3 }}>
      <Typography variant="h5" component="h1">
        Move to Production
      </Typography>

      {categoryCount.length === 0 && !error ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            my: 4,
          }}
        >
          <InboxIcon sx={{ fontSize: 60, color: "grey.400", mb: 1 }} />
          <Typography variant="body1" color="text.secondary">
            Your inventory is empty. Please add items to the inventory first.
          </Typography>
        </Box>
      ) : (
        <InventoryCountCard categoryCount={categoryCount} />
      )}
      <ProductionForm
        moveToProduction={moveToProduction}
        categories={categories}
        subCategories={subCategories}
        zeroInventory={zeroInventory}
        formData={formData}
        setFormData={setFormData}
      />
      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
}

export default Production;
