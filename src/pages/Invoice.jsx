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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DoneIcon from "@mui/icons-material/Done";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import InvoiceToolBar from "../features/invoice/InvoiceToolBar";
import { formatDateToVerbose } from "../utils/dateUtils";
import { useNavigate } from "react-router";
import InvoiceTablePagination from "../features/invoice/InvoiceTablePagination";

// Custom input style
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 10,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    fontSize: 14, // Adjust font size
    border: "1px solid #ced4da",
    padding: "3px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 10,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

function Invoice() {
  const [data, setData] = useState({}); // Store the full response data
  const [selectedValue, setSelectedValue] = useState({}); // State to hold selected values
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState({ field: "", order: "" });
  const [filters, setFilters] = useState({
    supplierNames: [],
    isPaid: [],
    invoiceDate: null,
    transportName: [],
    search: "",
    pageNo: page,
    pageSize: rowsPerPage,
    invoiceStartDate: "",
    invoiceEndDate: new Date().toISOString().slice(0, 10),
    receivedStartDate: "",
    receivedEndDate: new Date().toISOString().slice(0, 10),
  });
  let navigate = useNavigate();

  useEffect(() => {
    fetchInvoices(sort.field, sort.order, filters).then((res) => {
      console.log(res.data); // Log the full response to check the structure
      setData(res.data || {}); // Store the entire data object in the state

      // Pre-fill selectedValue state with paymentStatus of each invoice
      const initialSelectedValue =
        res.data &&
        res.data.content.reduce((acc, invoice) => {
          acc[invoice.id] = invoice.isTransportPaid ? "Paid" : "Unpaid"; // Default to empty string if no status
          return acc;
        }, {});
      console.log("initial val", initialSelectedValue);

      setSelectedValue(initialSelectedValue); // Update the selectedValue state with pre-filled values
    });
  }, [filters, sort, page, rowsPerPage]);

  // Handle select change
  const handleSelectChange = (invoiceId, event) => {
    event.stopPropagation(); // Prevent the row click event from being triggered
    setSelectedValue({
      ...selectedValue,
      [invoiceId]: event.target.value,
    });
    updateInvoice(invoiceId, {
      isTransportPaid: event.target.value === "Paid" ? true : false,
    });
  };

  const renderValueWithIcon = (selectedValue) => {
    // Dynamically choose icon based on selected value
    const selectedOption = selectedValue || "";
    let IconComponent;

    if (selectedOption === "Unpaid") {
      IconComponent = (
        <PriorityHighIcon sx={{ marginRight: 1, color: "#d60202" }} />
      ); // Example icon
    } else if (selectedOption === "Paid") {
      IconComponent = <DoneIcon sx={{ marginRight: 1, color: "#007804" }} />; // Another example icon
    }

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {IconComponent}
        <span>{selectedOption}</span>
      </div>
    );
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    setFilters((prev) => ({
      ...prev,
      pageNo: newPage,
    }));
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setFilters((prev) => ({
      ...prev,
      pageSize: parseInt(event.target.value, 10),
      pageNo: 0,
    }));
  };

  const handleInvoiceOpen = (invoiceId) => {
    navigate(`/invoice/${invoiceId}`);
  };

  return (
    <TableContainer component={Paper}>
      <InvoiceToolBar
        totalRows={data.content ? data.content.length : 0}
        handleFilterChange={setFilters}
        filter={filters}
      />
      <Divider />
      <Table>
        <InvoiceTableHeader sort={sort} setSort={setSort} />
        <TableBody>
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
        </TableBody>
      </Table>
      <InvoiceTablePagination
        count={data ? data.totalElements : 0}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </TableContainer>
  );
}

export default Invoice;
