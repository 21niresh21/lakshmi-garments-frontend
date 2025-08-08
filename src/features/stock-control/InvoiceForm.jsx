import {
  Autocomplete,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SupplierForm from "./SupplierForm";
import { fetchSuppliers } from "../../api/supplierApi";

function InvoiceForm({ formData, handleChange, handleDateChange }) {
  const [supplierForm, setSupplierForm] = useState(false);
  const [suppliers, setSuppliers] = useState([]);

  const handleSupplierFormOpen = () => {
    setSupplierForm(true);
  };
  const handleSupplierFormClose = () => {
    setSupplierForm(false);
  };

  useEffect(() => {
    fetchSuppliers().then((res) => setSuppliers(res.data.content));
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        // backgroundColor: "lightgray",
        p: 3,
        borderRadius: 1,
        rowGap: 2,
        boxShadow: 1,
      }}
    >
      <FormControl>
        <FormLabel id="pickup-type">Select Bale Pickup</FormLabel>
        <RadioGroup
          row
          aria-labelledby="pickup-type"
          name="isTransportSelf"
          defaultValue="transport"
          onChange={handleChange}
        >
          <FormControlLabel
            value="transport"
            control={<Radio />}
            label="Transport Service"
          />
          <FormControlLabel
            value="self"
            control={<Radio />}
            label="Self Pickup"
          />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Invoice Number</FormLabel>
        <TextField size="small" name="invoiceNumber" onChange={handleChange} />
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            slotProps={{ textField: { size: "small", fullWidth: true } }}
            label="Invoice Date"
            name="invoiceDate"
            onChange={(value) => handleDateChange("invoiceDate", value)}
          />
        </DemoContainer>
      </LocalizationProvider>
      <FormControl>
        <FormLabel>Supplier</FormLabel>
        <Autocomplete
          name="supplierID"
          size="small"
          renderInput={(params) => <TextField {...params} />}
          options={suppliers}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) => {
            handleChange({
              target: {
                name: "supplierID",
                value: newValue ? newValue.id : "",
              },
            });
          }}
          value={suppliers.find((t) => t.id === formData.supplierID) || null} // Binding value
        />
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            slotProps={{ textField: { size: "small", fullWidth: true } }}
            label="Shipment Received Date"
            name="shipmentReceivedDate"
            onChange={(value) =>
              handleDateChange("shipmentReceivedDate", value)
            }
          />
        </DemoContainer>
      </LocalizationProvider>
      <SupplierForm open={supplierForm} onClose={handleSupplierFormClose} />
    </Box>
  );
}

export default InvoiceForm;
