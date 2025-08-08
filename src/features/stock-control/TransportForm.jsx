import {
  Autocomplete,
  Box,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchTransports } from "../../api/transportApi";

function TransportForm({ handleChange, formData }) {
  const [transports, setTransports] = useState([]);

  // Fetch transport data when the component mounts
  useEffect(() => {
    fetchTransports().then((res) => setTransports(res.data.content));
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        // backgroundColor: "lightgray",
        p: 3,
        borderRadius: 1,
        rowGap: 2,
      }}
      boxShadow={1}
    >
      <FormControl>
        <FormLabel>Transport Name</FormLabel>
        <Autocomplete
          name="transportID"
          size="small"
          renderInput={(params) => <TextField {...params} />}
          options={transports}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) => {
            // Update transportID when an option is selected
            handleChange({
              target: {
                name: "transportID",
                value: newValue ? newValue.id : "",
              },
            });
          }}
          value={transports.find((t) => t.id === formData.transportID) || null} // Binding value
        />
      </FormControl>

      <FormControl>
        <FormLabel>Transport Charge</FormLabel>
        <TextField
          name="transportCost"
          size="small"
          type="number"
          slotProps={{ min: 0 }}
          value={formData.transportCost || ""} // Bind value to formData
          onChange={handleChange} // Update formData on change
        />
      </FormControl>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Payment Status</Typography>
        <Select
          name="isTransportPaid"
          size="small"
          value={formData.isTransportPaid} // Bind value to formData
          onChange={handleChange} // Update formData on change
        >
          <MenuItem value={true}>Paid</MenuItem>
          <MenuItem value={false}>Not Paid</MenuItem>
        </Select>
      </Box>
    </Box>
  );
}

export default TransportForm;
