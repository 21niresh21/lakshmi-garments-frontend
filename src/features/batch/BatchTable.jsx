import React, { useEffect, useState } from "react";
import { fetchInvoices, updateInvoice } from "../../api/invoiceApi";
import InfoIcon from '@mui/icons-material/Info';
import { formatDateToVerbose } from "../../utils/dateUtils";
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
  Collapse,
  Box,
  Typography,
  TableHead,
  IconButton,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getBatches } from "../../api/batchApi";
import BatchTableHeader from "../../features/batch/BatchTableHeader";
import { useNavigate } from "react-router";

function Row(props) {
  const { row } = props;

  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <TableRow
        sx={{
          // borderBottom: "unset",
          cursor: "pointer",
          "&:hover": { backgroundColor: "#f6f6f6" },
        }}
        onClick={() => setOpen(!open)}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.serialCode}
        </TableCell>
        <TableCell align="right">{row.categoryName}</TableCell>
        <TableCell align="right">
          {formatDateToVerbose(row.createdAt)}
        </TableCell>
        <TableCell>{row.batchStatus}</TableCell>
        <TableCell>{row.isUrgent ? "High" : "Low"}</TableCell>
        <TableCell>{row.remarks}</TableCell>
        <TableCell>
          <IconButton color="primary" onClick={(event) => {
            event.stopPropagation();
            navigate(`/batch/${row.id}`);
          }}>
            <InfoIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Sub Categories
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row &&
                    row.subCategories.map((historyRow) => (
                      <TableRow key={historyRow.subCategory}>
                        <TableCell component="th" scope="row">
                          {historyRow.subCategoryName}
                        </TableCell>
                        <TableCell>{historyRow.quantity}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function BatchTable({ batchData = [], sort, setSort }) {
  return (
    <TableContainer component={Paper}>
      {/* <InvoiceToolBar
        totalRows={data.content ? data.content.length : 0}
        handleFilterChange={setFilters}
        filter={filters}
      /> */}
      <Divider />
      <Table>
        <BatchTableHeader sort={sort} setSort={setSort} />
        <TableBody>
          {batchData && batchData.map((row) => <Row key={row.id} row={row} />)}
        </TableBody>
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

export default BatchTable;
