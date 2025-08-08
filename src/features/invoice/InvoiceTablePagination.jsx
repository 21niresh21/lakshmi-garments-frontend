import React from "react";
import { TablePagination } from "@mui/material";

function InvoiceTablePagination({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) {
  return (
    <TablePagination
      component="div"
      count={count}
      rowsPerPageOptions={[5, 10, 25]}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
      page={page}
      onPageChange={onPageChange}
    />
  );
}

export default InvoiceTablePagination;
