import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SubCategoryQuantityForm from "./SubCategoryQuantityForm";
import {
  fetchCategorySubCategoryCount,
  fetchSubCategoriesForCategory,
} from "../../api/inventoryApi";
import { fetchNextSerialCode } from "../../api/idApi";
import SnackbarAlert from "../../components/SnackbarAlert";

function ProductionForm({ categories, zeroInventory, moveToProduction }) {
  const [subCategories, setSubCategories] = useState([]);
  const [review, setReview] = useState(false);
  const [formData, setFormData] = useState({
    category: null,
    serialCode: "",
    subCategories: [{ subCategory: "", quantity: "" }],
    isUrgent: false,
    remarks: "",
  });
  const [validData, setValidData] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  const handleUrgent = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      isUrgent: e.target.checked,
    }));
  };

  // Handle adding a new subcategory
  const handleAddSubCategory = () => {
    setFormData((prevData) => ({
      ...prevData,
      subCategories: [
        ...prevData.subCategories,
        { subCategory: "", quantity: "" },
      ],
    }));
    setReview(false);
  };

  // Handle removing a subcategory
  const handleRemoveSubCategory = (index) => {
    const updatedSubCategories = formData.subCategories.filter(
      (_, idx) => idx !== index
    );
    setFormData({ ...formData, subCategories: updatedSubCategories });
  };

  // Handle subcategory change (fetch max count for the selected subcategory)
  const handleSubCategoryChange = async (index, subCategory) => {
    try {
      let maxCount = 0;

      if (formData.category && subCategory) {
        // Fetch max count for this subcategory
        const response = await fetchCategorySubCategoryCount(
          formData.category.id,
          subCategory.id
        );
        maxCount = response; // or response.data if your API returns { data: ... }
      }

      // Update the subcategories state
      const updatedSubCategories = formData.subCategories.map((item, i) =>
        i === index ? { ...item, subCategory, maxCount, quantity: "" } : item
      );
      setFormData((prev) => ({ ...prev, subCategories: updatedSubCategories }));
    } catch (error) {
      console.error(
        "Error fetching max count for subcategory:",
        subCategory?.name,
        error
      );
      // Optionally, show a Snackbar or alert
      setSnackbar({
        open: true,
        message: "Failed to fetch inventory for " + subCategory?.name,
        severity: "error",
      });
    }
  };

  // Handle quantity change for subcategory
  const handleQuantityChange = (index, value) => {
    const updatedSubCategories = formData.subCategories.map((item, i) =>
      i === index
        ? { ...item, quantity: Math.min(value, item.maxCount || value) }
        : item
    );
    setFormData({ ...formData, subCategories: updatedSubCategories });
  };

  const handleRemarksChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      remarks: e.target.value,
    }));
  };

  // Check if all fields are valid
  const checkValidData = () => {
    let valid = true;

    // Check if category is selected
    if (!formData.category) valid = false;

    // Check if each subcategory has both subCategory and quantity
    formData.subCategories.forEach((item) => {
      if (
        !item.subCategory ||
        item.quantity === "" ||
        item.quantity <= 0 ||
        isNaN(item.quantity)
      ) {
        valid = false;
      }
    });

    setValidData(valid);
  };



  // Run validation whenever formData changes
  useEffect(() => {
    console.log(formData);

    checkValidData();
  }, [formData]);

  useEffect(() => {
    setReview(false);
  }, [formData.subCategories, formData.category]);

  return (
    <>
      <Box sx={{ display: "flex", columnGap: 8 }}>
        <FormControl sx={{ flex: 1 }}>
          <Autocomplete
            options={categories || []}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Category" />}
            value={formData.category}
            size="small"
            onChange={async (_, newValue) => {
              if (!newValue) {
                setFormData({
                  ...formData,
                  category: null,
                  serialCode: "",
                  subCategories: [{ subCategory: "", quantity: 0 }],
                });
                return;
              }

              try {
                // Fetch the next serial code
                const serialResponse = await fetchNextSerialCode(newValue.name);
                const serialCode = serialResponse?.data || "";

                // Fetch subcategories for the selected category
                const subCategoryResponse = await fetchSubCategoriesForCategory(
                  newValue.id
                );
                const fetchedSubCategories = subCategoryResponse?.data || [];

                setSubCategories(fetchedSubCategories);

                // Update form state
                setFormData({
                  ...formData,
                  category: newValue,
                  serialCode,
                  subCategories: [{ subCategory: "", quantity: 0 }],
                });
                setReview(false);
              } catch (error) {
                console.error(
                  "Error fetching data for category:",
                  newValue?.name,
                  error
                );
                setSnackbar({
                  open: true,
                  message: `Failed to load data for ${newValue?.name}`,
                  severity: "error",
                });
              }
            }}
            disabled={zeroInventory}
          />

          <FormControlLabel
            checked={formData.isUrgent}
            sx={{ mt: 1 }}
            control={<Checkbox />}
            label="Urgent"
            onChange={handleUrgent}
            disabled={zeroInventory} // Disable if zero inventory
          />
        </FormControl>

        <Box sx={{ display: "flex", flexDirection: "column", flex: 3 }}>
          <Box sx={{ display: "flex", rowGap: 3, flexDirection: "column" }}>
            {formData.subCategories.map((item, index) => {
              // Update the list of selected subcategories to be passed to the dropdown
              const selectedSubCategories = formData.subCategories
                .filter((_, i) => i !== index) // Filter out the current one
                .map((item) => item.subCategory); // Get the remaining subcategories

              return (
                <SubCategoryQuantityForm
                  key={index}
                  index={index}
                  subCategories={subCategories || []}
                  subCategory={item.subCategory}
                  quantity={item.quantity}
                  maxCount={item.maxCount}
                  handleSubCategoryChange={handleSubCategoryChange}
                  handleQuantityChange={handleQuantityChange}
                  selectedSubCategories={selectedSubCategories} // Pass the updated list
                  zeroInventory={zeroInventory}
                  handleRemoveSubCategory={handleRemoveSubCategory}
                  isCategorySelected={formData.category}
                />
              );
            })}
          </Box>

          <Button
            onClick={handleAddSubCategory}
            variant="contained"
            size="small"
            sx={{ alignSelf: "flex-start", mt: 2 }}
            disabled={zeroInventory} // Disable if zero inventory
          >
            Add Sub Category
          </Button>
          <Stack sx={{ alignSelf: "flex-end" }} direction="row" spacing={2}>
            <Button
              onClick={() => setReview(!review)}
              variant="contained"
              size="small"
              sx={{ alignSelf: "flex-end", mt: 2 }}
              disabled={!validData || formData.subCategories.length === 0} // Disable the Review button if not valid
            >
              {review ? "Hide Review" : "Review"}
            </Button>
          </Stack>
        </Box>
      </Box>
      {review && (
        <Box mt={5}>
          <Table sx={{ borderCollapse: "collapse" }}>
            <TableHead>
              <TableRow>
                <TableCell>Serial Code</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Sub Category</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.subCategories.map(
                (subCategory, idx) =>
                  subCategory &&
                  subCategory.subCategory !== "" && (
                    <TableRow key={idx} sx={{ borderBottom: "none" }}>
                      {idx === 0 ? (
                        <TableCell sx={{ border: "none" }}>
                          {formData.isUrgent === false
                            ? formData.serialCode
                            : formData.serialCode + " (U)"}
                        </TableCell>
                      ) : (
                        <TableCell sx={{ border: "none" }}></TableCell>
                      )}
                      {idx === 0 ? (
                        <TableCell sx={{ border: "none" }}>
                          {formData.category.name}
                        </TableCell>
                      ) : (
                        <TableCell sx={{ border: "none" }}></TableCell>
                      )}
                      <TableCell sx={{ border: "none" }}>
                        {subCategory.subCategory
                          ? subCategory.subCategory.name
                          : ""}
                      </TableCell>
                      <TableCell sx={{ border: "none" }}>
                        {subCategory.quantity}
                      </TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
          <FormControl fullWidth sx={{ mt: 4 }}>
            <TextField
              id="remarks"
              label="Remarks"
              multiline
              rows={3}
              value={formData.remarks}
              onChange={handleRemarksChange}
            />
          </FormControl>

          <Button
            onClick={() => moveToProduction(formData, setFormData, setReview)}
            variant="contained"
            size="small"
            sx={{ alignSelf: "flex-end", mt: 2, textAlign: "end" }}
          >
            Move to Production
          </Button>
          <SnackbarAlert
            open={snackbar.open}
            onClose={handleCloseSnackbar}
            message={snackbar.message}
            severity={snackbar.severity}
          />
        </Box>
      )}
    </>
  );
}

export default ProductionForm;
