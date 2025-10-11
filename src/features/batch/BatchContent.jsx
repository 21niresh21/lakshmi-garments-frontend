import React from "react";
import { Box } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

function BatchContent({ batch }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", columnGap: 1, alignItems: "center" }}>
        <ReceiptIcon sx={{ fontSize: 50, opacity: "0.5" }} />
        <Box>
          <Typography variant="h6">{batch?.serialCode}</Typography>
          {/* <Box sx={{ display: "flex", alignItems: "center" }}>
            <CurrencyRupeeIcon sx={{ fontSize: 15, mb: 1 }} />
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {invoice.value}
            </Typography>
          </Box> */}
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
            {/* <TableRow>
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
            </TableRow> */}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}

export default BatchContent;
