import React, { useEffect, useState } from "react";
import ProductionForm from "../features/production/ProductionForm";
import { Box, Card, CardContent, Chip, Typography, Alert } from "@mui/material";
import {
  fetchAllCategorySubcategoryCount,
  fetchDistinctCategories,
} from "../api/inventoryApi";
import { createBatch } from "../api/batchApi";
import InboxIcon from "@mui/icons-material/Inbox";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"; // MUI icon

function Production() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [categoryCount, setCategoryCount] = useState([]);
  const [zeroInventory, setZeroInventory] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
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
        setNetworkError(true);
      });

    fetchAllCategorySubcategoryCount()
      .then((res) => {
        console.log(res);

        setCategoryCount(res.data);
      })
      .catch(() => {
        setNetworkError(true);
      });

    // fetchSubCategories()
    //   .then((res) => {
    //     setSubCategories(res.data.content);
    //   })
    //   .catch(() => {
    //     setNetworkError(true);
    //   });
  }, []);

  useEffect(() => {
    if (categoryCount.length === 0) {
      setZeroInventory(true);
    } else {
      setZeroInventory(false);
    }
  }, [categoryCount]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: 3 }}>
      <Typography variant="h5" component="h1">
        Move to Production
      </Typography>

      {networkError && (
        <Alert
          icon={<ErrorOutlineIcon fontSize="inherit" />}
          severity="error"
          sx={{ mb: 2 }}
        >
          Failed to load data from the server. Please check your connection or
          try again later.
        </Alert>
      )}

      {categoryCount.length === 0 && !networkError ? (
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
        <Box sx={{ display: "flex", columnGap: 3 }}>
          {categoryCount.map((item) => (
            <Card sx={{ flex: 1 }} key={item.categoryName}>
              <CardContent sx={{ height: "100%" }}>
                <Typography variant="h5" component="div">
                  {item.categoryName}
                </Typography>
                {item.subCategories.map((subCategory) => (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    key={subCategory.subCategoryName}
                  >
                    <Chip
                      label={`${subCategory.subCategoryName}  ${subCategory.count}`}
                      size="small"
                      sx={{ mt: 1, mr: 1 }}
                    />
                  </Typography>
                ))}
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
      <ProductionForm
        moveToProduction={moveToProduction}
        categories={categories}
        subCategories={subCategories}
        zeroInventory={zeroInventory}
      />
    </Box>
  );
}

export default Production;
