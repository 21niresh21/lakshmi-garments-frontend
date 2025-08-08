import {
  Box,
  FormControl,
  FormLabel,
  Grid2,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

function LRBaleForm() {
  return (
    <Box
      sx={{
        display: "grid",
        // backgroundColor: "lightgray",
        p: 3,
        borderRadius: 1,
        rowGap: 2,
      }}
    >
      <Stack direction="row" columnGap={10}>
        <Typography>LR Number</Typography>
        <FormControl>
          <TextField size="small" />
        </FormControl>
      </Stack>
      <Box
        sx={{
          display: "grid",
          flexDirection: "row",
          gridTemplateColumns: "13fr 9fr 9fr 9fr 15fr 15fr 15fr",
          columnGap: 2,
        }}
      >
        <FormControl>
          <FormLabel>Bale Number</FormLabel>
          <TextField size="small" />
        </FormControl>
        <FormControl>
          <FormLabel>Quantity</FormLabel>
          <TextField size="small" />
        </FormControl>
        <FormControl>
          <FormLabel>Length</FormLabel>
          <TextField size="small" />
        </FormControl>
        <FormControl>
          <FormLabel>Price</FormLabel>
          <TextField size="small" />
        </FormControl>
        <FormControl>
          <FormLabel>Quality</FormLabel>
          <TextField size="small" />
        </FormControl>
        <FormControl>
          <FormLabel>Category</FormLabel>
          <Select size="small"></Select>
        </FormControl>
        <FormControl>
          <FormLabel>Sub-Category</FormLabel>
          <Select size="small"></Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default LRBaleForm;
