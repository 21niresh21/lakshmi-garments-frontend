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
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SubCategoryQuantityForm from "./SubCategoryQuantityForm";
import { fetchCategorySubCategoryCount } from "../../api/inventoryApi";
import { fetchNextSerialCode } from "../../api/idApi";
import { createBatch } from "../../api/batchApi";

function ProductionForm({ categories, subCategories, zeroInventory }) {
  const [review, setReview] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    serialCode: "",
    subCategories: [{ subCategory: "", quantity: "" }],
    isUrgent: false,
    remarks: "",
  });
  const [validData, setValidData] = useState(false);

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
  const handleSubCategoryChange = async (index, value) => {
    let maxCount;
    if (formData.category && value) {
      maxCount = await fetchCategorySubCategoryCount(formData.category, value);
    }

    const updatedSubCategories = formData.subCategories.map((item, i) =>
      i === index ? { ...item, subCategory: value, maxCount } : item
    );
    setFormData({ ...formData, subCategories: updatedSubCategories });
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

  const moveToProduction = () => {
    createBatch(formData);
    setFormData({
      category: "",
      serialCode: "",
      subCategories: [{ subCategory: "", quantity: "" }],
      batchStatus: "",
      isUrgent: false,
      remarks: "",
    });
    setReview(!review);
  };

  // Run validation whenever formData changes
  useEffect(() => {
    console.log(formData);

    checkValidData();
  }, [formData]);

  return (
    <>
      <Box sx={{ display: "flex", columnGap: 8 }}>
        <FormControl sx={{ flex: 1 }}>
          <Autocomplete
            options={categories.map((category) => category.name)}
            renderInput={(params) => <TextField {...params} label="Category" />}
            value={formData.category}
            onChange={async (_, newValue) => {
              // Fetch the serial code asynchronously
              const serialCode = await fetchNextSerialCode(newValue).then(
                (res) => res.data
              );

              // Update the formData state with the new serialCode and other values
              setFormData({
                ...formData,
                serialCode: serialCode, // Use the resolved serialCode here
                category: newValue,
                subCategories: [{ subCategory: "", quantity: 0 }],
              });
              setReview(false);
            }}
            disabled={zeroInventory} // Disable if zero inventory
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
                  subCategories={subCategories}
                  subCategory={item.subCategory}
                  quantity={item.quantity}
                  maxCount={item.maxCount}
                  handleSubCategoryChange={handleSubCategoryChange}
                  handleQuantityChange={handleQuantityChange}
                  selectedSubCategories={selectedSubCategories} // Pass the updated list
                  zeroInventory={zeroInventory}
                  handleRemoveSubCategory={handleRemoveSubCategory}
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
              disabled={!validData} // Disable the Review button if not valid
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
                (subCat, idx) =>
                  subCat.subCategory &&
                  subCat.subCategory !== "" && (
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
                          {formData.category}
                        </TableCell>
                      ) : (
                        <TableCell sx={{ border: "none" }}></TableCell>
                      )}
                      <TableCell sx={{ border: "none" }}>
                        {subCat.subCategory}
                      </TableCell>
                      <TableCell sx={{ border: "none" }}>
                        {subCat.quantity}
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
            onClick={moveToProduction}
            variant="contained"
            size="small"
            sx={{ alignSelf: "flex-end", mt: 2, textAlign: "end" }}
          >
            Move to Production
          </Button>
        </Box>
      )}
    </>
  );
}

export default ProductionForm;
