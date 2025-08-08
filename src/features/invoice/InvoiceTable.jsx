import { Paper, Table, TableContainer } from "@mui/material";
import React from "react";
import InvoiceTableHeader from "./InvoiceTableHeader";


function InvoiceTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <InvoiceTableHeader />
      </Table>
    </TableContainer>
  );
}

export default InvoiceTable;
