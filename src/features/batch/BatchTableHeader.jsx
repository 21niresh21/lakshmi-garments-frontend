import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import React from "react";

const HEADERS = [
  { field: "id", label: "ID", sort: true },
  { field: "serialCode", label: "Serial Code", sort: true },
  { field: "category", label: "Category", sort: true },
  { field: "createdAt", label: "Created At", sort: true },
  { field: "remarks", label: "Remarks", sort: true },
  { field: "isUrgent", label: "Is Urgent ?", sort: true },
  { field: "status", label: "Status", sort: true },
];

function BatchTableHeader({ sort, setSort }) {
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

export default BatchTableHeader;
