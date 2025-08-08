import React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import {
  Box,
  Divider,
  styled,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import MuiTableCell from "@mui/material/TableCell";

const InvoiceHeader = styled(MuiTableCell)(({ theme }) => ({
  opacity: 0.8,
}));

function TransportDetails({ name, isPaid, charge }) {
  return (
    <Box>
      <Box sx={{ display: "flex", columnGap: 1, alignItems: "center" }}>
        <LocalShippingIcon sx={{ fontSize: 50, opacity: "0.5" }} />
        <Box>
          <Typography variant="h6">Transport Details</Typography>
          <Box display="flex">
            <Typography variant="subtitle2" sx={{ mb: 1, ml: 0.5 }}>
              {isPaid ? "Paid" : "Unpaid"}
            </Typography>
            {!isPaid && <PriorityHighIcon
              sx={{ fontSize: 20, opacity: "0.5", color: "#d60202" }}
            />}
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          columnGap: 1,
          alignItems: "center",
          width: "50%",
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
              <InvoiceHeader>Transport Service Provider</InvoiceHeader>
              <TableCell>{name}</TableCell>
            </TableRow>
            <TableRow>
              <InvoiceHeader>Transport Charge</InvoiceHeader>
              <TableCell>{charge}</TableCell>
            </TableRow>
            <TableRow>
              <InvoiceHeader>Payment Status</InvoiceHeader>
              <TableCell>{isPaid ? "Paid" : "Unpaid"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}

export default TransportDetails;
