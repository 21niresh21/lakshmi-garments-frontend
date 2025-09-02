import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function SubCategoryQuantityForm({
  subCategories,
  index,
  subCategory,
  quantity,
  maxCount,
  handleSubCategoryChange,
  handleQuantityChange,
  selectedSubCategories, // Ensure this is the updated list of selected subcategories
  handleRemoveSubCategory, // Receive the remove function
  zeroInventory,
}) {
  console.log("selectedSubCategories", selectedSubCategories);

  return (
    <Box sx={{ display: "flex", columnGap: 3 }}>
      <FormControl sx={{ flex: 1 }}>
        <Autocomplete
          disabled={zeroInventory} // Disable if zero inventory
          options={subCategories
            .filter((subCat) => !selectedSubCategories.includes(subCat.name)) // Filter out already selected subcategories
            .map((subCategory) => subCategory.name)}
          value={subCategory}
          onChange={(_, newValue) => handleSubCategoryChange(index, newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Sub Category" />
          )}
        />
      </FormControl>
      <FormControl sx={{ flex: 1 }}>
        <TextField
          type="number"
          value={quantity || ""}
          onChange={(e) =>
            handleQuantityChange(index, parseInt(e.target.value, 10))
          }
          label="Quantity"
          disabled={zeroInventory} // Disable if zero inventory
        />
        <FormHelperText>
          {maxCount && `Current Stock : ${maxCount}`}
        </FormHelperText>
      </FormControl>
      <IconButton
        sx={{ alignSelf: "center " }}
        size="small"
        onClick={() => handleRemoveSubCategory(index)}
        color="error"
        disabled={zeroInventory} // Disable if zero inventory
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
}

export default SubCategoryQuantityForm;
