import React, { useEffect, useState } from "react";
import InvoiceTableHeader from "../features/invoice/InvoiceTableHeader";
import { fetchInvoices, updateInvoice } from "../api/invoiceApi";
import {
  Divider,
  InputBase,
  MenuItem,
  Paper,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { getBatches } from "../api/batchApi";

function Batch() {
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getBatches(search).then((res) => {
      setData(res);
    });
  }, [search]);
  return (
    <TableContainer component={Paper}>
      {/* <InvoiceToolBar
        totalRows={data.content ? data.content.length : 0}
        handleFilterChange={setFilters}
        filter={filters}
      /> */}
      <Divider />
      <Table>
        {/* <InvoiceTableHeader sort={sort} setSort={setSort} /> */}
        {/* <TableBody>
          {data.content &&
            data.content.map((invoice) => (
              <TableRow
                key={invoice.id}
                onClick={(event) => handleInvoiceOpen(invoice.id)} // Row click event
                sx={{
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f6f6f6" },
                }}
              >
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.invoiceNumber}</TableCell>
                <TableCell>
                  {formatDateToVerbose(invoice.invoiceDate)}
                </TableCell>
                <TableCell>
                  {formatDateToVerbose(invoice.receivedDate)}
                </TableCell>
                <TableCell>{invoice.supplierName}</TableCell>
                <TableCell>{invoice.transportName}</TableCell>
                <TableCell>{invoice.transportCost}</TableCell>
                <TableCell align="center">
                  <Select
                    sx={{ minWidth: 120 }}
                    size="small"
                    value={selectedValue[invoice.id] || ""} // Value should be linked to state
                    onChange={(event) => handleSelectChange(invoice.id, event)} // Handle change
                    input={<BootstrapInput />}
                    IconComponent={ExpandMoreIcon}
                    renderValue={renderValueWithIcon}
                  >
                    <MenuItem
                      value="Paid"
                      onClick={(event) => event.stopPropagation()} // Prevent propagation on menu item click
                    >
                      Paid
                    </MenuItem>
                    <MenuItem
                      value="Unpaid"
                      onClick={(event) => event.stopPropagation()} // Prevent propagation on menu item click
                    >
                      Unpaid
                    </MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
        </TableBody> */}
      </Table>
      {/* <InvoiceTablePagination
        count={data ? data.totalElements : 0}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      /> */}
    </TableContainer>
  );
}

export default Batch;
