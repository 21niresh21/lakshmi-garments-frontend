import {
  Box,
  Chip,
  Divider,
  styled,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import InventoryIcon from "@mui/icons-material/Inventory";
import MuiTableCell from "@mui/material/TableCell";
import LRBaleTable from "./LRBaleTable";

const InvoiceHeader = styled(MuiTableCell)(({ theme }) => ({
  opacity: 0.8,
}));

function LRBaleDetails({ invoice }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", columnGap: 1, alignItems: "center" }}>
        <InventoryIcon sx={{ fontSize: 45, opacity: "0.5" }} />
        <Box>
          <Typography variant="h6">LR & Bale Details</Typography>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {"Total LRs " + invoice.noOfLorryReceipts}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          columnGap: 10,
          alignItems: "baseline",
          width: "100%",
          mt: 2,
        }}
      >
        <Table
          size="small"
          sx={{
            "&.MuiTable-root": { border: "none" }, // Remove table borders
            width: "70%",
            "& .MuiTableCell-root": {
              borderBottom: "none", // Remove borders between rows
            },
            "& .MuiTableRow-root": {
              borderBottom: "none", // Ensure rows have no borders
            },
          }}
        >
          <TableBody>
            <TableRow>
              <InvoiceHeader>Total Quantity</InvoiceHeader>
              <TableCell>{invoice.totalQuantity}</TableCell>
            </TableRow>
            <TableRow>
              <InvoiceHeader>Total Categories</InvoiceHeader>
              <TableCell>{invoice.categories.length}</TableCell>
            </TableRow>
            <TableRow>
              <InvoiceHeader>Total Sub Categories</InvoiceHeader>
              <TableCell>{invoice.subCategories.length}</TableCell>
            </TableRow>
            <TableRow>
              <InvoiceHeader>No. of Qualities</InvoiceHeader>
              <TableCell>{invoice.qualities.length}</TableCell>
            </TableRow>
            <TableRow>
              <InvoiceHeader>No. of lengths</InvoiceHeader>
              <TableCell>{invoice.lengths.length}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table
          size="small"
          sx={{
            "&.MuiTable-root": { border: "none" }, // Remove table borders
            width: "70%",
            "& .MuiTableCell-root": {
              borderBottom: "none", // Remove borders between rows
            },
            "& .MuiTableRow-root": {
              borderBottom: "none", // Ensure rows have no borders
            },
          }}
        >
          <TableBody>
            <TableRow>
              <InvoiceHeader>Categories</InvoiceHeader>
              <TableCell>
                {invoice.categories.map((item) => (
                  <Chip size="small" label={item} sx={{mr : 0.7}} />
                ))}
              </TableCell>
            </TableRow>
            <TableRow>
              <InvoiceHeader>Sub-categories</InvoiceHeader>
              <TableCell>
                {invoice.subCategories.map((item) => (
                  <Chip size="small" label={item} sx={{mr : 0.7}} />
                ))}
              </TableCell>
            </TableRow>
            <TableRow>
              <InvoiceHeader>Qualities</InvoiceHeader>
              <TableCell>
                {invoice.qualities.map((item) => (
                  <Chip size="small" label={item} sx={{mr : 0.7}} />
                ))}
              </TableCell>
            </TableRow>
            <TableRow>
              <InvoiceHeader>Lengths</InvoiceHeader>
              <TableCell>
                {invoice.lengths.map((item) => (
                  <Chip size="small" label={item + "m"} sx={{mr : 0.7}} />
                ))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 2, rowGap: 2 }}>
        {invoice.lorryReceiptDTOs.map((lr) => (
          <LRBaleTable lorryReceipt={lr} key={lr.id} />
        ))}
      </Box>
    </Box>
  );
}

export default LRBaleDetails;
