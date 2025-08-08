import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

function LRBaleTable({ lorryReceipt }) {
  return (
    <TableContainer component={Paper} >
      <Typography variant="h6" sx={{ ml: 2, mt : 2 }}>
        {"LR Number " + lorryReceipt.lrnumber}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Bale No.</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Length</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quality</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Sub-category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lorryReceipt.baleDTOs.map((bale) => (
            <TableRow>
              <TableCell>{bale.baleNumber}</TableCell>
              <TableCell>{bale.quantity}</TableCell>
              <TableCell>{bale.length}</TableCell>
              <TableCell>{bale.price}</TableCell>
              <TableCell>{bale.quality}</TableCell>
              <TableCell>{bale.category}</TableCell>
              <TableCell>{bale.subCategory}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default LRBaleTable;
