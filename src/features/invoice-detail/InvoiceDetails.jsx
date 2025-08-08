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
import React from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";
import MuiTableCell from "@mui/material/TableCell";
import { formatDateToVerbose } from "../../utils/dateUtils";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const InvoiceHeader = styled(MuiTableCell)(({ theme }) => ({
  opacity: 0.8,
}));

function InvoiceDetails({ invoice }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", columnGap: 1, alignItems: "center" }}>
        <ReceiptIcon sx={{ fontSize: 50, opacity: "0.5" }} />
        <Box>
          <Typography variant="h6">{invoice.invoiceNumber}</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CurrencyRupeeIcon sx={{ fontSize: 15, mb: 1 }} />
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {invoice.value}
            </Typography>
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
              <InvoiceHeader>Invoice Date</InvoiceHeader>
              <TableCell>{formatDateToVerbose(invoice.invoiceDate)}</TableCell>
            </TableRow>
            <TableRow>
              <InvoiceHeader>Shipment Received Date</InvoiceHeader>
              <TableCell>{formatDateToVerbose(invoice.receivedDate)}</TableCell>
            </TableRow>
            <TableRow>
              <InvoiceHeader>Supplier</InvoiceHeader>
              <TableCell>{invoice.supplierName}</TableCell>
            </TableRow>
            <TableRow>
              <InvoiceHeader>Total Invoice Value (incl. taxes)</InvoiceHeader>
              <TableCell>{invoice.value}</TableCell>
            </TableRow>
            <TableRow>
              <InvoiceHeader>Total No. Of LRs</InvoiceHeader>
              <TableCell>{invoice.noOfLorryReceipts}</TableCell>
            </TableRow>
            <TableRow>
              <InvoiceHeader>Total No. Of Bales</InvoiceHeader>
              <TableCell>{invoice.noOfBales}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}

export default InvoiceDetails;
