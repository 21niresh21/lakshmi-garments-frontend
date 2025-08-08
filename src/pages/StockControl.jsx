import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { fetchSuppliers } from "../api/supplierApi";
import { fetchTransports } from "../api/transportApi";
import { StyledFormControlLabel } from "../components/StyledComponents";
import { fetchSubCategories } from "../api/subCategoryApi";
import { createShipment } from "../api/shipmentApi";

const initialBaleState = {
  baleNumber: "",
  quantity: "",
  length: "",
  price: "",
  quality: "",
  subCategoryID: "",
  subCategory: null, // Will hold the sub-category object
};

const initialLRState = {
  lrNumber: "",
  bales: [initialBaleState], // Each LR starts with one empty bale
};

function StockControl() {
  const [lrs, setLrs] = useState([initialLRState]); // Array to hold multiple LRs
  // Example sub-categories, replace this with an API call in your real scenario

  // Handle input change for each field in LR/Bale
  const handleInputChange = (lrIndex, baleIndex, field, value) => {
    console.log(lrIndex, baleIndex, field, value);
    const updatedLrs = [...lrs];
    if (field === "lrNumber") {
      updatedLrs[lrIndex].lrNumber = value;
    } else if (field === "subCategory") {
      updatedLrs[lrIndex].bales[baleIndex].subCategoryID = value["id"]; // Update sub-category object
      updatedLrs[lrIndex].bales[baleIndex].subCategory = value;
    } else {
      updatedLrs[lrIndex].bales[baleIndex][field] = value;
    }

    setLrs(updatedLrs);
  };

  // Add a new bale to an LR
  const addBale = (lrIndex) => {
    const updatedLrs = [...lrs];
    updatedLrs[lrIndex].bales.push({
      baleNumber: "",
      quantity: "",
      length: "",
      price: "",
      quality: "",
      subCategoryID: "",
      subCategory: null, // Will hold the sub-category object
    });
    setLrs(updatedLrs);
  };

  // Remove a bale from an LR
  const removeBale = (lrIndex, baleIndex) => {
    const updatedLrs = [...lrs];
    updatedLrs[lrIndex].bales.splice(baleIndex, 1);
    setLrs(updatedLrs);
  };

  // Add a new LR
  const addLR = () => {
    const newLR = {
      lrNumber: "", // New empty LR number
      bales: [
        {
          baleNumber: "",
          quantity: "",
          length: "",
          price: "",
          quality: "",
          subCategoryID: "",
          subCategory: null, // Will hold the sub-category object
        },
      ], // New unique bale array with one empty bale
    };

    setLrs([...lrs, newLR]);
  };

  // Remove an LR
  const removeLR = (lrIndex) => {
    const updatedLrs = lrs.filter((_, index) => index !== lrIndex);
    setLrs(updatedLrs);
  };

  const [formData, setFormData] = useState({
    transportID: "",
    transportCost: "",
    isTransportPaid: true, // Default as 'paid'
    isTransportSelf: "transport", // Default to 'transport'
    invoiceNumber: "",
    invoiceDate: "",
    supplierID: "",
    shipmentReceivedDate: "",
    lorryReceipts: [],
  });

  // Handle form input change
  const handleFormInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (name === "isTransportSelf" && value === "self") {
      generateDefaultLRNumbers();
    }
  };

  const generateDefaultLRNumbers = () => {
    const currentUtcTimeInSeconds = Math.floor(Date.now() / 1000); // Get current time in seconds
    const defaultLrs = []; // Copy current LRs

    // Add new LR with a generated LR number
    defaultLrs.push({
      lrNumber: `LR-${currentUtcTimeInSeconds}`, // LR Number based on UTC time
      bales: [initialBaleState], // Add empty bale to the LR
    });

    setLrs(defaultLrs);
  };

  const createShipmentOrder = () => {
    const userJson = localStorage.getItem("user");
    const user = JSON.parse(userJson);

    formData.lorryReceipts = lrs;
    formData.createdById = user.id; // Add createdBy field to formData
    createShipment(formData).then((res) => {
      if (res.status === 201) {
        handleClick();
        setFormData({
          transportID: "",
          transportCost: "",
          isTransportPaid: true, // Default as 'paid'
          isTransportSelf: "transport", // Default to 'transport'
          invoiceNumber: "",
          invoiceDate: "",
          supplierID: "",
          shipmentReceivedDate: "",
          lorryReceipts: [],
        });
        setLrs([]); // Reset LRs to initial state
      }
    });
  };

  const handleDate = (name, value) => {
    let stringDate = dayjs(value).format("YYYY-MM-DD");
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: stringDate,
    }));
  };

  const [subCategories, setSubCategories] = useState([]); // State to store the sub-category list
  const [suppliers, setSuppliers] = useState([]); // State to store the supplier list
  const [transports, setTransports] = useState([]); // State to store the transport list
  const [loading, setLoading] = useState(true); // Loading state to handle loading spinner
  const [error, setError] = useState(null); // To handle any error that may occur during the fetch

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // Fetch suppliers when component mounts
  useEffect(() => {
    // Function to fetch data from suppliers API

    fetchSuppliers()
      .then((response) => {
        setSuppliers(response.data.content || []); // Update the suppliers state with the fetched data
        setLoading(false);
        console.log("Fetched suppliers:", response.data.content);
      })
      .catch((error) => {
        setError("Error fetching suppliers!"); // Set an error if the API call fails
        setLoading(false);
      });

    // function to fetch tranports
    fetchTransports()
      .then((response) => {
        setTransports(response.data.content || []);
        setLoading(false);
        console.log("Fetched tranports:", response.data.content);
      })
      .catch((error) => {
        setError("Error fetching transports!"); // Set an error if the API call fails
        setLoading(false);
      });

    fetchSubCategories()
      .then((response) => {
        setSubCategories(response.data.content || []);
        setLoading(false);
        console.log("Fetched sub categories:", response.data.content);
      })
      .catch((error) => {
        setError("Error fetching sub categories!"); // Set an error if the API call fails
        setLoading(false);
      });
  }, []);

  // Handling loading and error states
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box color="error.main" display="flex" justifyContent="center">
        {error}
      </Box>
    );
  }

  return (
    <Grid container spacing={2} sx={{ height: "100%" }}>
      {/* Left Panel - 1/3 width (Invoice Details) */}
      <Grid item xs={4}>
        <Paper sx={{ height: "100%", padding: 2, backgroundColor: "#f4f4f4" }}>
          {/* Left Panel Content */}
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Invoice Details
          </Typography>
          <Box>
            {/* Left Panel Content */}
            <Box
              display="flex"
              height="100%"
              sx={{ flexDirection: "column", gap: 2 }}
            >
              <FormControl component="fieldset">
                <FormLabel id="pickup-type">Select Bale Pickup</FormLabel>
                <RadioGroup
                  row // This ensures the radio buttons are side by side
                  aria-labelledby="pickup-type"
                  name="isTransportSelf"
                  defaultValue="transport"
                  // value={formData.isTransportSelf}
                  onChange={handleFormInputChange}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start", // Align radio buttons side by side
                    alignItems: "center", // Vertically align items
                    width: "100%", // Take full width
                  }}
                >
                  <StyledFormControlLabel
                    value="transport"
                    control={<Radio />}
                    label="Transport Service"
                  />
                  <StyledFormControlLabel
                    value="self"
                    control={<Radio />}
                    label="Self Pickup"
                  />
                </RadioGroup>
              </FormControl>

              <TextField
                label="Invoice Number"
                variant="outlined"
                name="invoiceNumber"
                onChange={handleFormInputChange}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    slotProps={{
                      textField: { size: "medium", fullWidth: true },
                    }}
                    label="Invoice Date"
                    name="invoiceDate"
                    onChange={(value) => handleDate("invoiceDate", value)}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    slotProps={{
                      textField: { size: "medium", fullWidth: true },
                    }}
                    label="Shipment Received Date"
                    name="shipmentReceivedDate"
                    onChange={(value) =>
                      handleDate("shipmentReceivedDate", value)
                    }
                  />
                </DemoContainer>
              </LocalizationProvider>

              <FormControl>
                <FormLabel>Supplier Name</FormLabel>
                <Autocomplete
                  name="supplierID"
                  renderInput={(params) => <TextField {...params} />}
                  options={suppliers}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => {
                    handleFormInputChange({
                      target: {
                        name: "supplierID",
                        value: newValue ? newValue.id : "",
                      },
                    });
                  }}
                  value={
                    suppliers.find((t) => t.id === formData.supplierID) || null
                  } // Binding value
                />
              </FormControl>

              <FormControl>
                <FormLabel>Transport Name</FormLabel>
                <Autocomplete
                  name="transportID"
                  renderInput={(params) => <TextField {...params} />}
                  options={transports}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => {
                    // Update transportID when an option is selected
                    handleFormInputChange({
                      target: {
                        name: "transportID",
                        value: newValue ? newValue.id : "",
                      },
                    });
                  }}
                  value={
                    transports.find((t) => t.id === formData.transportID) ||
                    null
                  } // Binding value
                />
              </FormControl>

              <TextField
                name="transportCost"
                type="number"
                label="Transport Cost"
                onInput={(e) => {
                  // Restrict non-numeric input
                  e.target.value = e.target.value.replace(/[^0-9.]/g, ""); // Keep only numbers and period (for decimal point)
                }}
                inputProps={{
                  inputMode: "numeric", // Display numeric keyboard on mobile
                  pattern: "[0-9]*", // Restrict to numeric input
                }}
                value={formData.transportCost || ""} // Bind value to formData
                onChange={handleFormInputChange} // Update formData on change
              />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Payment Status</Typography>
                <Select
                  name="isTransportPaid"
                  size="small"
                  value={formData.isTransportPaid} // Bind value to formData
                  onChange={handleFormInputChange} // Update formData on change
                >
                  <MenuItem value={true}>Paid</MenuItem>
                  <MenuItem value={false}>Not Paid</MenuItem>
                </Select>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Grid>

      {/* Right Panel - 2/3 width (LR and Bales) */}
      <Grid item xs={8}>
        <Paper sx={{ height: "100%", padding: 2 }}>
          {/* Right Panel Content */}
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            LR and Bales
          </Typography>
          <Box>
            {/* Right Panel Content */}
            <Box>
              {lrs.map((lr, lrIndex) => (
                <Paper key={lrIndex} sx={{ padding: 2, marginBottom: 2 }}>
                  <Grid container spacing={2}>
                    {/* LR Number TextField */}
                    <Grid item xs={12}>
                      <TextField
                        label="LR Number"
                        fullWidth
                        value={lr.lrNumber}
                        onChange={(e) =>
                          handleInputChange(
                            lrIndex,
                            0,
                            "lrNumber",
                            e.target.value
                          )
                        }
                      />
                    </Grid>

                    {/* Render bales within this LR */}
                    {lr.bales.map((bale, baleIndex) => (
                      <Grid item xs={12} key={baleIndex}>
                        <Grid container spacing={2}>
                          <Grid item xs={2.3}>
                            <TextField
                              label="Bale Number"
                              value={bale.baleNumber}
                              onChange={(e) =>
                                handleInputChange(
                                  lrIndex,
                                  baleIndex,
                                  "baleNumber",
                                  e.target.value
                                )
                              }
                            />
                          </Grid>
                          <Grid item xs={1.5}>
                            <TextField
                              label="Quantity"
                              value={bale.quantity}
                              onInput={(e) => {
                                e.target.value = e.target.value.replace(
                                  /[^0-9.]/g,
                                  ""
                                );
                              }}
                              onChange={(e) =>
                                handleInputChange(
                                  lrIndex,
                                  baleIndex,
                                  "quantity",
                                  e.target.value
                                )
                              }
                            />
                          </Grid>
                          <Grid item xs={1.5}>
                            <TextField
                              label="Length"
                              value={bale.length}
                              onInput={(e) => {
                                e.target.value = e.target.value.replace(
                                  /[^0-9.]/g,
                                  ""
                                );
                              }}
                              onChange={(e) =>
                                handleInputChange(
                                  lrIndex,
                                  baleIndex,
                                  "length",
                                  e.target.value
                                )
                              }
                            />
                          </Grid>
                          <Grid item xs={1.5}>
                            <TextField
                              label="Price"
                              value={bale.price}
                              onInput={(e) => {
                                e.target.value = e.target.value.replace(
                                  /[^0-9.]/g,
                                  ""
                                );
                              }}
                              onChange={(e) =>
                                handleInputChange(
                                  lrIndex,
                                  baleIndex,
                                  "price",
                                  e.target.value
                                )
                              }
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <TextField
                              label="Quality"
                              value={bale.quality}
                              onChange={(e) =>
                                handleInputChange(
                                  lrIndex,
                                  baleIndex,
                                  "quality",
                                  e.target.value
                                )
                              }
                            />
                          </Grid>
                          <Grid item xs={2.6}>
                            <Autocomplete
                              renderInput={(params) => (
                                <TextField {...params} label="Sub-Category" />
                              )}
                              options={subCategories}
                              getOptionLabel={(option) => option.name}
                              onChange={(event, newValue) =>
                                handleInputChange(
                                  lrIndex,
                                  baleIndex,
                                  "subCategory",
                                  newValue
                                )
                              }
                              value={bale.subCategory} // Binding value
                            />
                          </Grid>

                          {/* Remove Bale Button */}
                          <Grid item xs={0.5}>
                            <IconButton
                              sx={{ ml: -1, mt: 1 }}
                              color="error"
                              onClick={() => removeBale(lrIndex, baleIndex)}
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                            {/* <Button
                              variant="outlined"
                              color="error"
                              
                            >
                              Remove Bale
                            </Button> */}
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                    

                    {/* Add Bale Button */}
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => addBale(lrIndex)}
                      >
                        Add Bale
                      </Button>
                    </Grid>

                    {/* Remove LR Button */}
                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => removeLR(lrIndex)}
                      >
                        Remove LR
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              ))}

              {/* Add LR Button */}
              <Button variant="contained" color="primary" onClick={addLR}>
                Add LR
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => createShipmentOrder()}
              >
                create
              </Button>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  The details are saved successfully!
                </Alert>
              </Snackbar>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default StockControl;
