import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Popover,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchSuppliers } from "../../api/supplierApi";
import { fetchTransports } from "../../api/transportApi";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";

function InvoiceFilter({ anchorEl, handleClose, onFilterChange, filter }) {
  const [suppliers, setSuppliers] = useState([]);
  const [transports, setTransports] = useState([]);
  const today = dayjs();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(today);
  const [receivedStartDate, setReceivedStartDate] = useState(null);
  const [receivedEndDate, setReceivedEndDate] = useState(today);

  const [networkError, setNetworkError] = useState(false);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    setNetworkError(false);
  };

  useEffect(() => {
    fetchSuppliers()
      .then((res) => setSuppliers(res.data.content))
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          setNetworkError(true);
        }
      });

    fetchTransports()
      .then((res) => setTransports(res.data.content))
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          setNetworkError(true);
        }
      });
  }, []);

  const handleSupplierChange = (event, newSuppliers) => {
    onFilterChange((prev) => ({
      ...prev,
      supplierNames: newSuppliers,
    }));
  };

  const handleTransportChange = (event, newTransports) => {
    onFilterChange((prev) => ({
      ...prev,
      transportNames: newTransports,
    }));
  };

  const handlePaymentStatusChange = (event) => {
    const updatedIsPaid = [...(filter.isPaid || [])];
    const value = event.target.value === "Paid" ? true : false;

    if (event.target.checked) {
      if (!updatedIsPaid.includes(value)) updatedIsPaid.push(value);
    } else {
      const index = updatedIsPaid.indexOf(value);
      if (index > -1) updatedIsPaid.splice(index, 1);
    }

    onFilterChange((prev) => ({
      ...prev,
      isPaid: updatedIsPaid,
    }));
  };

  const handleInvoiceDateChange = (type, newValue) => {
    if (!newValue) return;
    if (newValue.isAfter(today)) newValue = today;

    if (type === "startDate") {
      if (endDate && newValue.isAfter(endDate)) {
        setEndDate(null);
        onFilterChange((prev) => ({ ...prev, invoiceEndDate: "" }));
      }
      setStartDate(newValue);
      onFilterChange((prev) => ({
        ...prev,
        invoiceStartDate: newValue.format("YYYY-MM-DD"),
      }));
    } else if (type === "endDate") {
      if (startDate && newValue.isBefore(startDate)) {
        setStartDate(null);
        onFilterChange((prev) => ({ ...prev, invoiceStartDate: "" }));
      }
      setEndDate(newValue);
      onFilterChange((prev) => ({
        ...prev,
        invoiceEndDate: newValue.format("YYYY-MM-DD"),
      }));
    }
  };

  const handleReceivedDateChange = (type, newValue) => {
    if (!newValue) return;
    if (newValue.isAfter(today)) newValue = today;

    if (type === "startDate") {
      if (receivedEndDate && newValue.isAfter(receivedEndDate)) {
        setReceivedEndDate(null);
        onFilterChange((prev) => ({ ...prev, receivedEndDate: "" }));
      }
      setReceivedStartDate(newValue);
      onFilterChange((prev) => ({
        ...prev,
        receivedStartDate: newValue.format("YYYY-MM-DD"),
      }));
    } else if (type === "endDate") {
      if (receivedStartDate && newValue.isBefore(receivedStartDate)) {
        setReceivedStartDate(null);
        onFilterChange((prev) => ({ ...prev, receivedStartDate: "" }));
      }
      setReceivedEndDate(newValue);
      onFilterChange((prev) => ({
        ...prev,
        receivedEndDate: newValue.format("YYYY-MM-DD"),
      }));
    }
  };

  const clearFilter = () => {
    setStartDate(null);
    setEndDate(today);
    setReceivedStartDate(null);
    setReceivedEndDate(today);

    onFilterChange({
      invoiceNumber: "",
      supplierNames: [],
      isPaid: [],
      transportNames: [],
      search: "",
      pageNo: 0,
      pageSize: 5,
      invoiceStartDate: "",
      invoiceEndDate: today.format("YYYY-MM-DD"),
      receivedStartDate: "",
      receivedEndDate: today.format("YYYY-MM-DD"),
    });
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "50% 50%",
          gridTemplateRows: "repeat(3, auto)",
          gap: "10px",
          pl: 3,
          pr: 3,
          pt: 1,
        }}
      >
        <Box sx={{ padding: 1, textAlign: "left" }}>
          <Typography variant="h6" fontWeight={600}>
            FILTERS
          </Typography>
        </Box>
        <Box sx={{ padding: 1, textAlign: "right" }}>
          <Button
            variant="contained"
            size="small"
            sx={{ fontWeight: 600 }}
            startIcon={<FilterListOffIcon />}
            onClick={clearFilter}
          >
            Clear Filters
          </Button>
        </Box>

        {/* Supplier Filter */}
        <Box sx={{ padding: 1 }}>
          <FormControl fullWidth>
            <Autocomplete
              size="small"
              multiple
              value={filter.supplierNames || []}
              options={suppliers.map((s) => s.name)}
              onChange={handleSupplierChange}
              renderInput={(params) => (
                <TextField {...params} label="Filter by Suppliers" />
              )}
              disableCloseOnSelect
            />
          </FormControl>
        </Box>

        {/* Transport Filter */}
        <Box sx={{ padding: 1 }}>
          <FormControl fullWidth>
            <Autocomplete
              size="small"
              multiple
              value={filter.transportNames || []}
              options={transports.map((t) => t.name)}
              onChange={handleTransportChange}
              renderInput={(params) => (
                <TextField {...params} label="Filter by Transports" />
              )}
              disableCloseOnSelect
            />
          </FormControl>
        </Box>

        {/* Invoice Dates */}
        <Box sx={{ padding: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Invoice Start Date"
              value={startDate}
              onChange={(v) => handleInvoiceDateChange("startDate", v)}
              maxDate={today}
              slotProps={{ textField: { fullWidth: true, size: "small" } }}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ padding: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Invoice End Date"
              value={endDate}
              onChange={(v) => handleInvoiceDateChange("endDate", v)}
              maxDate={today}
              slotProps={{ textField: { fullWidth: true, size: "small" } }}
            />
          </LocalizationProvider>
        </Box>

        {/* Received Dates */}
        <Box sx={{ padding: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Received Start Date"
              value={receivedStartDate}
              onChange={(v) => handleReceivedDateChange("startDate", v)}
              maxDate={today}
              slotProps={{ textField: { fullWidth: true, size: "small" } }}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ padding: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Received End Date"
              value={receivedEndDate}
              onChange={(v) => handleReceivedDateChange("endDate", v)}
              maxDate={today}
              slotProps={{ textField: { fullWidth: true, size: "small" } }}
            />
          </LocalizationProvider>
        </Box>

        {/* Payment Status */}
        <Box sx={{ padding: 1 }}>
          <Typography sx={{ pl: 1.5 }}>Payment Status</Typography>
          <FormControl sx={{ mt : 1, ml: 1, width: 300, flexDirection : "row" }}>
            <FormControlLabel
              control={
                <Checkbox
                  value="Paid"
                  checked={filter.isPaid?.includes(true) || false}
                  onChange={handlePaymentStatusChange}
                />
              }
              label="Paid"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="Not Paid"
                  checked={filter.isPaid?.includes(false) || false}
                  onChange={handlePaymentStatusChange}
                />
              }
              label="Not Paid"
            />
          </FormControl>
        </Box>
      </Box>

      <Snackbar
        open={networkError}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Network Error. Please try again later.
        </Alert>
      </Snackbar>
    </Popover>
  );
}

export default InvoiceFilter;
