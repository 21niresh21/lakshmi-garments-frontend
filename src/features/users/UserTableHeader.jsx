import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import React from "react";

const HEADERS = [
  { field: "id", label: "ID", sort: true },
  { field: "name", label: "Name", sort: true },
  { field: "role", label: "Role", sort: true },
  { field: "active", label: "Active", sort: false },
];

function UserTableHeader({ sort, setSort }) {
  const handleSort = (field) => {
    const order = sort.order === "asc" ? "desc" : "asc";
    setSort({ field: field, order: order });
  };
  return (
    <TableHead>
      <TableRow>
        {HEADERS.map((item) =>
          item.sort ? (
            <TableCell key={item.field}>
              <TableSortLabel
                active={sort && sort.field === item.field}
                onClick={() => handleSort(item.field)}
                direction={sort ? sort.order : ""}
              >
                {item.label}
              </TableSortLabel>
            </TableCell>
          ) : (
            <TableCell key={item.field}>{item.label}</TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
}

export default UserTableHeader;
