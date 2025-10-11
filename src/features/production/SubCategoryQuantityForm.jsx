import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  TextField,
} from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

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
  isCategorySelected,
}) {
  console.log("selectedSubCategories", zeroInventory);

  return (
    <Box sx={{ display: "flex", columnGap: 3 }}>
      <FormControl sx={{ flex: 1 }}>
        <Autocomplete
          autoHighlight
          disabled={zeroInventory || !isCategorySelected} // Disable if zero inventory
          options={subCategories
            .filter((subCat) => !selectedSubCategories.includes(subCat)) // Filter out already selected subcategories
            .map((subCategory) => subCategory)}
          getOptionLabel={(option) => option.name}
          value={subCategory || null}
          onChange={(_, newValue) => handleSubCategoryChange(index, newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Sub Category" />
          )}
          size="small"
        />
      </FormControl>
      <FormControl sx={{ flex: 1 }}>
        <TextField
          type="number"
          value={quantity || ""}
          size="small"
          onChange={(e) =>
            handleQuantityChange(index, parseInt(e.target.value, 10))
          }
          label="Quantity"
          disabled={maxCount === 0 || !isCategorySelected} // Disable if zero inventory

        />
        <FormHelperText>
          {maxCount && `Current Stock : ${maxCount}`}
        </FormHelperText>
      </FormControl>
      <IconButton
        sx={{ alignSelf: "start " }}
        size="small"
        onClick={() => handleRemoveSubCategory(index)}
        color="error"
        disabled={zeroInventory} // Disable if zero inventory
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}

export default SubCategoryQuantityForm;
