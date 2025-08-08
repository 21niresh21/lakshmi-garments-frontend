import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import React from "react";

const HEADERS = [
  { field: "id", label: "ID", sort: true },
  { field: "invoiceNumber", label: "Invoice Number", sort: true },
  { field: "invoiceDate", label: "Invoice Date", sort: true },
  { field: "receivedDate", label: "Received Date", sort: true },
  { field: "supplier", label: "Supplier", sort: true },
  { field: "transport", label: "Transport", sort: true },
  { field: "transportCost", label: "Transport Charge", sort: true },
  { field: "isPaid", label: "Transport Payment Status", sort: false },
  //   { field: "action", label: "Action", sort: false },
];

function InvoiceTableHeader({ sort, setSort }) {
  const handleSort = (field) => {
    const order = sort.order === "asc" ? "desc" : "asc";
    setSort({ field: field, order: order });
  };
  return (
    <TableHead>
      <TableRow>
        {HEADERS.map((item) =>
          item.sort ? (
            <TableCell>
              <TableSortLabel
                active={sort && sort.field === item.field}
                onClick={() => handleSort(item.field)}
                direction={sort ? sort.order : ""}
              >
                {item.label}
              </TableSortLabel>
            </TableCell>
          ) : (
            <TableCell>{item.label}</TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
}

export default InvoiceTableHeader;
