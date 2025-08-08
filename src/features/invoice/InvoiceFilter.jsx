import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Popover,
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
  const [transports, setTranports] = useState([]);
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState(dayjs("2022-04-17"));
  const [receivedStartDate, setReceivedStartDate] = React.useState();
  const [receivedEndDate, setReceivedEndDate] = React.useState(
    dayjs("2022-04-17")
  );

  useEffect(() => {
    fetchSuppliers().then((res) => {
      const supplierNames = res.data.content;
      setSuppliers(supplierNames);
    });
    fetchTransports().then((res) => {
      const transportNames = res.data.content;
      setTranports(transportNames);
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

    if (event.target.checked) {
      // If checkbox is checked, add the corresponding value to the filter
      if (event.target.value === "Paid" && !updatedIsPaid.includes(true)) {
        updatedIsPaid.push(true); // Add true if "Paid" is selected
      } else if (
        event.target.value === "Not Paid" &&
        !updatedIsPaid.includes(false)
      ) {
        updatedIsPaid.push(false); // Add false if "Not Paid" is selected
      }
    } else {
      // If checkbox is unchecked, remove the corresponding value from the filter
      const indexToRemove = updatedIsPaid.indexOf(
        event.target.value === "Paid" ? true : false
      );
      if (indexToRemove > -1) {
        updatedIsPaid.splice(indexToRemove, 1); // Remove the value from the array
      }
    }

    // Update the isPaid filter with the new state
    onFilterChange((prev) => ({
      ...prev,
      isPaid: updatedIsPaid,
    }));
  };

  const handleInvoiceDateChange = (dateType, newValue) => {
    if (dateType === "startDate") {
      setStartDate(newValue);
      onFilterChange((prev) => ({
        ...prev,
        invoiceStartDate: newValue.format("YYYY-MM-DD"), // Format the date as YYYY-MM-DD
      }));
    } else if (dateType === "endDate") {
      setEndDate(newValue);
      onFilterChange((prev) => ({
        ...prev,
        invoiceEndDate: newValue.format("YYYY-MM-DD"), // Format the date as YYYY-MM-DD
      }));
    }
  };

  const handleReceivedDateChange = (dateType, newValue) => {
    if (dateType === "startDate") {
      setReceivedStartDate(newValue);
      onFilterChange((prev) => ({
        ...prev,
        receivedStartDate: newValue.format("YYYY-MM-DD"), // Format the date as YYYY-MM-DD
      }));
    } else if (dateType === "endDate") {
      setReceivedEndDate(newValue);
      onFilterChange((prev) => ({
        ...prev,
        receivedEndDate: newValue.format("YYYY-MM-DD"), // Format the date as YYYY-MM-DD
      }));
    }
  };

  const clearFilter = () => {
    onFilterChange({
      invoiceNumber: "",
      supplierNames: [],
      isPaid: [],
      invoiceDate: null,
      transportName: [],
      search: "",
      pageNo: 0,
      pageSize: 5,
      invoiceStartDate: "",
      invoiceEndDate: new Date().toISOString().slice(0, 10),
      receivedStartDate: "",
      receivedEndDate: new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
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
          <Typography variant="h6" textTransform="capitalize" fontWeight={600}>
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
        <Box sx={{ padding: 1, textAlign: "center" }}>
          <FormControl variant="outlined" fullWidth>
            <Autocomplete
              size="small"
              multiple
              value={filter.supplierNames || []}
              options={
                suppliers ? suppliers.map((supplier) => supplier.name) : []
              }
              onChange={(e, newVal) => handleSupplierChange(e, newVal)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <>{params.InputProps.endAdornment}</>,
                  }}
                  label="Filter by Suppliers"
                />
              )}
              disableCloseOnSelect
            />
          </FormControl>
        </Box>
        <Box sx={{ padding: 1, textAlign: "center" }}>
          <FormControl variant="outlined" fullWidth>
            <Autocomplete
              size="small"
              multiple
              value={filter.transportNames || []}
              options={
                transports ? transports.map((transport) => transport.name) : []
              }
              onChange={(e, newVal) => handleTransportChange(e, newVal)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <>{params.InputProps.endAdornment}</>,
                  }}
                  label="Filter by Transports"
                />
              )}
              disableCloseOnSelect
            />
          </FormControl>
        </Box>
        <Box sx={{ padding: 1, textAlign: "center" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Invoice Start Date"
              value={startDate}
              onChange={(newValue) =>
                handleInvoiceDateChange("startDate", newValue)
              }
              slotProps={{
                textField: { fullWidth: true, size: "small" },
                size: "small",
              }}
            />
          </LocalizationProvider>
        </Box>

        {/* End Date Picker */}
        <Box sx={{ padding: 1, textAlign: "center" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Invoice End Date"
              value={endDate}
              onChange={(newValue) =>
                handleInvoiceDateChange("endDate", newValue)
              }
              slotProps={{
                textField: { fullWidth: true, size: "small" },
                size: "small",
              }}
            />
          </LocalizationProvider>
        </Box>

        <Box sx={{ padding: 1, textAlign: "center" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Received Start Date"
              value={receivedStartDate}
              onChange={(newValue) =>
                handleReceivedDateChange("startDate", newValue)
              }
              slotProps={{
                textField: { fullWidth: true, size: "small" },
                size: "small",
              }}
            />
          </LocalizationProvider>
        </Box>

        {/* End Date Picker */}
        <Box sx={{ padding: 1, textAlign: "center" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Received End Date"
              value={receivedEndDate}
              onChange={(newValue) =>
                handleReceivedDateChange("endDate", newValue)
              }
              slotProps={{
                textField: { fullWidth: true, size: "small" },
                size: "small",
              }}
            />
          </LocalizationProvider>
        </Box>

        <Box sx={{ padding: 1, textAlign: "center" }}>
          <Typography sx={{ textAlign: "left", pl: 1.5 }}>
            Payment Status
          </Typography>
          <FormControl
            variant="outlined"
            sx={{ ml: 1, mr: 1, width: 300, textAlign: "left", mt: 0.5 }}
          >
            <Box>
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
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Popover>
  );
}

export default InvoiceFilter;
