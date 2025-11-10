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
import AddIcon from "@mui/icons-material/Add";
import { fetchCategories } from "../api/categoryApi";
import CloseIcon from "@mui/icons-material/Close";

const initialBaleState = {
  baleNumber: "",
  quantity: "",
  length: "",
  price: "",
  quality: "",
  subCategoryID: "",
  categoryID: "",
  category: null, // Will hold the category object
  subCategory: null, // Will hold the sub-category object
};

const initialLRState = {
  lrNumber: "",
  bales: [{ ...initialBaleState }], // Each LR starts with one empty bale
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
      updatedLrs[lrIndex].bales[baleIndex].subCategoryID =
        value && value["id"] ? value["id"] : "";
      updatedLrs[lrIndex].bales[baleIndex].subCategory = value;
    } else if (field === "category") {
      updatedLrs[lrIndex].bales[baleIndex].categoryID =
        value && value["id"] ? value["id"] : "";
      updatedLrs[lrIndex].bales[baleIndex].category = value;
    } else {
      updatedLrs[lrIndex].bales[baleIndex][field] = value;
    }

    setLrs(updatedLrs);
  };

  // add function to clear errors for lr fields on change
  const clearLrErrors = (lrIndex, baleIndex, field) => {
    setLrErrors((prevErrors) => {
      // Defensive copy
      const newErrors = prevErrors.map((lrErr) => ({
        lrNumber: lrErr?.lrNumber || "",
        bales: (lrErr?.bales || []).map((baleErr) => ({ ...baleErr })),
      }));

      // Ensure LR exists
      if (!newErrors[lrIndex]) {
        // If not, add empty error objects up to lrIndex
        while (newErrors.length <= lrIndex) {
          newErrors.push({ lrNumber: "", bales: [] });
        }
      }

      if (baleIndex === null || baleIndex === undefined) {
        // LR-level error
        newErrors[lrIndex].lrNumber = "";
      } else {
        // Ensure bales array exists
        if (!newErrors[lrIndex].bales) newErrors[lrIndex].bales = [];
        // Ensure bale error object exists
        while (newErrors[lrIndex].bales.length <= baleIndex) {
          newErrors[lrIndex].bales.push({
            baleNumber: "",
            quantity: "",
            length: "",
            price: "",
            quality: "",
            subCategoryID: "",
            categoryID: "",
          });
        }
        newErrors[lrIndex].bales[baleIndex][field] = "";
      }
      return newErrors;
    });
  };

  // Add a new bale to an LR
  const addBale = (lrIndex, isSelf) => {
    if (isSelf === "self") {
      generateDefaultLRNumbers();
    }
    const updatedLrs = [...lrs];
    updatedLrs[lrIndex].bales.push({
      baleNumber: "",
      quantity: "",
      length: "",
      price: "",
      quality: "",
      subCategoryID: "",
      categoryID: "",
      category: null, // Will hold the category object
      subCategory: null, // Will hold the sub-category object
    });
    setLrs(updatedLrs);
  };

  // Remove a bale from an LR
  const removeBale = (lrIndex, baleIndex) => {
    const updatedLrs = [...lrs];
    updatedLrs[lrIndex].bales.splice(baleIndex, 1);
    setLrs(updatedLrs);
    setLrErrors((prevErrors) =>
      prevErrors.filter((_, index) => index !== lrIndex)
    );
  };

  // Add a new LR to existing LRs
  const addLR = (isSelf) => {
    const existingLrs = [...lrs];
    console.log(existingLrs);
    if (isSelf === "self") {
      const currentUtcTimeInSeconds = Math.floor(Date.now() / 1000);
      existingLrs.push(createNewSelfLR());
    } else {
      existingLrs.push(createNewTransportLR());
    }
    setLrs(existingLrs);
    console.log(existingLrs);
    setLrErrors((prevErrors) => [
      ...prevErrors,
      {
        lrNumber: "",
        bales: [
          {
            baleNumber: "",
            quantity: "",
            length: "",
            price: "",
            quality: "",
            subCategoryID: "",
            categoryID: "",
          },
        ],
      },
    ]);
  };

  const createNewTransportLR = () => ({
    lrNumber: "",
    bales: [{ ...initialBaleState }],
  });

  const createNewSelfLR = () => ({
    lrNumber: `LR-${Math.floor(Date.now() / 1000)}`,
    bales: [JSON.parse(JSON.stringify(initialBaleState))],
  });

  // Remove an LR
  const removeLR = (lrIndex) => {
    const updatedLrs = lrs.filter((_, index) => index !== lrIndex);
    setLrs(updatedLrs);
    setLrErrors((prevErrors) =>
      prevErrors.filter((_, index) => index !== lrIndex)
    );
    console.log(lrs);
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

    clearFieldError(name); // Clear error for this field

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    // if transport is self generate default lr numbers based on time
    if (name === "isTransportSelf") {
      if (value === "self") {
        generateDefaultLRsForSelf();
      } else if (value === "transport") {
        generateDefaultLRsForTransport();
      }
    }
  };

  const generateDefaultLRsForSelf = () => {
    const currentUtcTimeInSeconds = Math.floor(Date.now() / 1000);
    const defaultLrs = [];
    defaultLrs.push({
      lrNumber: `LR-${currentUtcTimeInSeconds}`, // LR Number based on UTC time
      bales: [{ ...initialBaleState }], // Add empty bale to the LR
    });
    setLrs(defaultLrs);
  };

  const generateDefaultLRsForTransport = () => {
    const defaultLrs = [createNewTransportLR()];
    setLrs(defaultLrs);
  };

  const generateDefaultLRNumbers = () => {
    const currentUtcTimeInSeconds = Math.floor(Date.now() / 1000); // Get current time in seconds
    const defaultLrs = [...lrs]; // Copy current LRs

    // Add new LR with a generated LR number
    defaultLrs.push({
      lrNumber: `LR-${currentUtcTimeInSeconds}`, // LR Number based on UTC time
      bales: [{ ...initialBaleState }], // Add empty bale to the LR
    });

    setLrs(defaultLrs);
  };

  const [formErrors, setFormErrors] = useState({
    invoiceNumber: "",
    invoiceDate: "",
    shipmentReceivedDate: "",
    supplierID: "",
    transportID: "",
    transportCost: "",
    isTransportPaid: "",
  });

  const validateForm = () => {
    const errors = {};
    if (formData.invoiceNumber.trim() === "") {
      errors.invoiceNumber = "Invoice number is required";
    }
    if (formData.invoiceDate === "") {
      errors.invoiceDate = "Invoice date is required";
    }
    if (formData.shipmentReceivedDate === "") {
      errors.shipmentReceivedDate = "Shipment received date is required";
    }
    if (formData.supplierID === "") {
      errors.supplierID = "Supplier is required";
    }
    if (formData.transportID === "") {
      errors.transportID = "Transport is required";
    }
    if (formData.transportCost === "") {
      errors.transportCost = "Transport cost is required";
      //set the formdata transportCost to 0
      setFormData((prevFormData) => ({
        ...prevFormData,
        transportCost: 0,
      }));
    }
    setFormErrors(errors);
    return errors;
  };

  const validateLrs = () => {
    const errors = lrs.map((lr, lrIndex) => {
      const lrError = {
        lrNumber: "",
        bales: lr.bales.map((bale) => ({
          baleNumber: "",
          quantity: "",
          length: "",
          price: "",
          quality: "",
          subCategoryID: "",
          categoryID: "",
        })),
      };

      // LR-level validation
      if (!lr.lrNumber || lr.lrNumber.trim() === "") {
        lrError.lrNumber = "LR number is required";
      }

      // Bale-level validation
      lr.bales.forEach((bale, baleIndex) => {
        if (!bale.baleNumber || bale.baleNumber.trim() === "") {
          lrError.bales[baleIndex].baleNumber = "Bale number is required";
        }
        if (!bale.quantity || bale.quantity.trim() === "") {
          lrError.bales[baleIndex].quantity = "Quantity is required";
        }
        if (!bale.length || bale.length.trim() === "") {
          lrError.bales[baleIndex].length = "Length is required";
        }
        if (!bale.price || bale.price.trim() === "") {
          lrError.bales[baleIndex].price = "Price is required";
        }
        if (!bale.quality || bale.quality.trim() === "") {
          lrError.bales[baleIndex].quality = "Quality is required";
        }
        if (bale.subCategory === null) {
          lrError.bales[baleIndex].subCategoryID = "Sub-category is required";
        }
        if (bale.category === null) {
          lrError.bales[baleIndex].categoryID = "Category is required";
        }
      });

      return lrError;
    });

    setLrErrors(errors);

    // Return true if any error exists
    return errors.some(
      (lrError) =>
        lrError.lrNumber ||
        lrError.bales.some((baleError) =>
          Object.values(baleError).some((msg) => msg)
        )
    );
  };

  const createShipmentOrder = () => {
    const errors = validateForm();
    const hasLrErrors = validateLrs();

    if (Object.values(errors).length > 0 || hasLrErrors) {
      return;
    }

    const userJson = localStorage.getItem("user");
    const user = JSON.parse(userJson);

    let tempFormData = { ...formData };
    tempFormData.lorryReceipts = lrs;
    tempFormData.createdById = user.id; // Add createdBy field to formDat
    // console.log(tempFormData);
    // return;
    createShipment(tempFormData).then((res) => {
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
    clearFieldError(name); // Clear error for this field
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
  const [categories, setCategories] = useState([]); // State to store the category list
  const [open, setOpen] = useState(false);
  const [lrErrors, setLrErrors] = useState([]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const clearFieldError = (fieldName) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };

  // Fetch suppliers when component mounts
  useEffect(() => {
    // Function to fetch data from suppliers API

    fetchSuppliers()
      .then((response) => {
        console.log("suppliers", response);

        setSuppliers(response.data || []); // Update the suppliers state with the fetched data
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
        setTransports(response.data || []);
        setLoading(false);
        console.log("Fetched tranports:", response.data.content);
      })
      .catch((error) => {
        setError("Error fetching transports!"); // Set an error if the API call fails
        setLoading(false);
      });

    fetchSubCategories()
      .then((response) => {
        setSubCategories(response.data || []);
        setLoading(false);
        console.log("Fetched sub categories:", response.data);
      })
      .catch((error) => {
        setError("Error fetching sub categories!"); // Set an error if the API call fails
        setLoading(false);
      });

    fetchCategories()
      .then((response) => {
        setCategories(response.data || []);
        setLoading(false);
        console.log("Fetched categories:", response.data);
      })
      .catch((error) => {
        setError("Error fetching categories!"); // Set an error if the API call fails
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLrErrors((prevErrors) =>
      lrs.map((lr, lrIndex) => ({
        lrNumber: prevErrors[lrIndex]?.lrNumber || "",
        bales: lr.bales.map(
          (bale, baleIndex) =>
            prevErrors[lrIndex]?.bales?.[baleIndex] || {
              baleNumber: "",
              quantity: "",
              length: "",
              price: "",
              quality: "",
              subCategoryID: "",
              categoryID: "",
            }
        ),
      }))
    );
  }, [lrs]);

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
      <Grid item xs={3}>
        <Paper sx={{ height: "97%", padding: 2, backgroundColor: "#f4f4f4" }}>
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
                value={formData.invoiceNumber}
                onChange={handleFormInputChange}
                helperText={formErrors.invoiceNumber}
                error={formErrors.invoiceNumber}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    slotProps={{
                      textField: {
                        size: "medium",
                        fullWidth: true,
                        helperText: formErrors.invoiceDate,
                        error: Boolean(formErrors.invoiceDate), // Make sure error is boolean
                      },
                    }}
                    label="Invoice Date"
                    name="invoiceDate"
                    onChange={(value) => {
                      clearFieldError("invoiceDate");
                      handleDate("invoiceDate", value);
                    }}
                    maxDate={dayjs()}
                    value={
                      formData.invoiceDate ? dayjs(formData.invoiceDate) : null
                    }
                  />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    slotProps={{
                      textField: {
                        size: "medium",
                        fullWidth: true,
                        helperText: formErrors.shipmentReceivedDate,
                        error: Boolean(formErrors.shipmentReceivedDate), // Make sure error is boolean
                      },
                    }}
                    label="Shipment Received Date"
                    name="shipmentReceivedDate"
                    onChange={(value) => {
                      clearFieldError("shipmentReceivedDate");
                      handleDate("shipmentReceivedDate", value);
                    }}
                    maxDate={dayjs()}
                    value={
                      formData.shipmentReceivedDate
                        ? dayjs(formData.shipmentReceivedDate)
                        : null
                    }
                  />
                </DemoContainer>
              </LocalizationProvider>

              <FormControl>
                <Autocomplete
                  autoHighlight
                  name="supplierID"
                  options={suppliers}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => {
                    clearFieldError("supplierID");
                    handleFormInputChange({
                      target: {
                        name: "supplierID",
                        value: newValue ? newValue.id : "",
                      },
                    });
                  }}
                  value={
                    suppliers.find((t) => t.id === formData.supplierID) || null
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Supplier Name" // This puts the label inside the box
                      variant="outlined" // Optional: ensures the outlined style
                      helperText={formErrors.supplierID}
                      error={formErrors.supplierID}
                    />
                  )}
                />
              </FormControl>

              <FormControl>
                <Autocomplete
                  autoHighlight
                  name="transportID"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Transport Name" // Label inside the box
                      variant="outlined" // (optional, for outlined style)
                      helperText={formErrors.transportID}
                      error={formErrors.transportID}
                    />
                  )}
                  options={transports}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => {
                    // Update transportID when an option is selected
                    clearFieldError("transportID");
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
      <Grid item xs={9}>
        <Paper sx={{ height: "97%", padding: 2 }}>
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
                      <Box sx={{ display: "flex", justifyContent: "flex-end", mb : -2 }}>
                        <IconButton
                          variant="outlined"
                          color="error"
                          onClick={() => removeLR(lrIndex)}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="LR Number"
                        fullWidth
                        value={lr.lrNumber}
                        onChange={(e) => {
                          clearLrErrors(lrIndex, null, "lrNumber");
                          handleInputChange(
                            lrIndex,
                            0,
                            "lrNumber",
                            e.target.value
                          );
                        }}
                        error={
                          !!(lrErrors[lrIndex] && lrErrors[lrIndex].lrNumber)
                        }
                        helperText={
                          lrErrors[lrIndex] && lrErrors[lrIndex].lrNumber
                        }
                      />
                    </Grid>

                    {/* Render bales within this LR */}
                    {lr.bales.map((bale, baleIndex) => (
                      <Grid item xs={12} key={baleIndex}>
                        <Grid container spacing={2}>
                          <Grid item xs={2}>
                            <TextField
                              label="Bale Number"
                              value={bale.baleNumber}
                              onChange={(e) => {
                                clearLrErrors(lrIndex, baleIndex, "baleNumber");
                                handleInputChange(
                                  lrIndex,
                                  baleIndex,
                                  "baleNumber",
                                  e.target.value
                                );
                              }}
                              error={
                                !!(
                                  lrErrors[lrIndex] &&
                                  lrErrors[lrIndex].bales[baleIndex] &&
                                  lrErrors[lrIndex].bales[baleIndex].baleNumber
                                )
                              }
                              helperText={
                                lrErrors[lrIndex] &&
                                lrErrors[lrIndex].bales[baleIndex] &&
                                lrErrors[lrIndex].bales[baleIndex].baleNumber
                              }
                            />
                          </Grid>
                          <Grid item xs={1.3}>
                            <TextField
                              label="Quantity"
                              value={bale.quantity}
                              onInput={(e) => {
                                e.target.value = e.target.value.replace(
                                  /[^0-9.]/g,
                                  ""
                                );
                              }}
                              onChange={(e) => {
                                clearLrErrors(lrIndex, baleIndex, "quantity");
                                handleInputChange(
                                  lrIndex,
                                  baleIndex,
                                  "quantity",
                                  e.target.value
                                );
                              }}
                              error={
                                !!(
                                  lrErrors[lrIndex] &&
                                  lrErrors[lrIndex].bales[baleIndex] &&
                                  lrErrors[lrIndex].bales[baleIndex].quantity
                                )
                              }
                              helperText={
                                lrErrors[lrIndex] &&
                                lrErrors[lrIndex].bales[baleIndex] &&
                                lrErrors[lrIndex].bales[baleIndex].quantity
                              }
                            />
                          </Grid>
                          <Grid item xs={1.3}>
                            <TextField
                              label="Length"
                              value={bale.length}
                              onInput={(e) => {
                                e.target.value = e.target.value.replace(
                                  /[^0-9.]/g,
                                  ""
                                );
                              }}
                              onChange={(e) => {
                                clearLrErrors(lrIndex, baleIndex, "length");
                                handleInputChange(
                                  lrIndex,
                                  baleIndex,
                                  "length",
                                  e.target.value
                                );
                              }}
                              error={
                                !!(
                                  lrErrors[lrIndex] &&
                                  lrErrors[lrIndex].bales[baleIndex] &&
                                  lrErrors[lrIndex].bales[baleIndex].length
                                )
                              }
                              helperText={
                                lrErrors[lrIndex] &&
                                lrErrors[lrIndex].bales[baleIndex] &&
                                lrErrors[lrIndex].bales[baleIndex].length
                              }
                            />
                          </Grid>
                          <Grid item xs={1.3}>
                            <TextField
                              label="Price"
                              value={bale.price}
                              onInput={(e) => {
                                e.target.value = e.target.value.replace(
                                  /[^0-9.]/g,
                                  ""
                                );
                              }}
                              onChange={(e) => {
                                clearLrErrors(lrIndex, baleIndex, "price");
                                handleInputChange(
                                  lrIndex,
                                  baleIndex,
                                  "price",
                                  e.target.value
                                );
                              }}
                              error={
                                !!(
                                  lrErrors[lrIndex] &&
                                  lrErrors[lrIndex].bales[baleIndex] &&
                                  lrErrors[lrIndex].bales[baleIndex].price
                                )
                              }
                              helperText={
                                lrErrors[lrIndex] &&
                                lrErrors[lrIndex].bales[baleIndex] &&
                                lrErrors[lrIndex].bales[baleIndex].price
                              }
                            />
                          </Grid>
                          <Grid item xs={1.5}>
                            <TextField
                              label="Quality"
                              value={bale.quality}
                              onChange={(e) => {
                                clearLrErrors(lrIndex, baleIndex, "quality");
                                handleInputChange(
                                  lrIndex,
                                  baleIndex,
                                  "quality",
                                  e.target.value
                                );
                              }}
                              error={
                                !!(
                                  lrErrors[lrIndex] &&
                                  lrErrors[lrIndex].bales[baleIndex] &&
                                  lrErrors[lrIndex].bales[baleIndex].quality
                                )
                              }
                              helperText={
                                lrErrors[lrIndex] &&
                                lrErrors[lrIndex].bales[baleIndex] &&
                                lrErrors[lrIndex].bales[baleIndex].quality
                              }
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <Autocomplete
                              autoHighlight
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Sub-Category"
                                  error={
                                    !!(
                                      lrErrors[lrIndex] &&
                                      lrErrors[lrIndex].bales[baleIndex] &&
                                      lrErrors[lrIndex].bales[baleIndex]
                                        .subCategoryID
                                    )
                                  }
                                  helperText={
                                    lrErrors[lrIndex] &&
                                    lrErrors[lrIndex].bales[baleIndex] &&
                                    lrErrors[lrIndex].bales[baleIndex]
                                      .subCategoryID
                                  }
                                />
                              )}
                              options={subCategories}
                              getOptionLabel={(option) => option.name}
                              onChange={(event, newValue) => {
                                clearLrErrors(
                                  lrIndex,
                                  baleIndex,
                                  "subCategoryID"
                                );
                                handleInputChange(
                                  lrIndex,
                                  baleIndex,
                                  "subCategory",
                                  newValue
                                );
                              }}
                              value={bale.subCategory} // Binding value
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <Autocomplete
                              autoHighlight
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Category"
                                  error={
                                    !!(
                                      lrErrors[lrIndex] &&
                                      lrErrors[lrIndex].bales[baleIndex] &&
                                      lrErrors[lrIndex].bales[baleIndex]
                                        .categoryID
                                    )
                                  }
                                  helperText={
                                    lrErrors[lrIndex] &&
                                    lrErrors[lrIndex].bales[baleIndex] &&
                                    lrErrors[lrIndex].bales[baleIndex]
                                      .categoryID
                                  }
                                />
                              )}
                              options={categories}
                              getOptionLabel={(option) => option.name}
                              onChange={(event, newValue) => {
                                clearLrErrors(lrIndex, baleIndex, "categoryID");
                                // CHANGED: Next line, use "category" to parallel "subCategory"
                                handleInputChange(
                                  lrIndex,
                                  baleIndex,
                                  "category",
                                  newValue
                                );
                              }}
                              // CHANGED: Next line, use bale.category object!
                              value={bale.category}
                            />
                          </Grid>

                          <Grid
                            item
                            xs={0.5}
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              color="error"
                              onClick={() => removeBale(lrIndex, baleIndex)}
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                            {/* {baleIndex === lr.bales.length - 1 && (
                              <IconButton
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  addBale(lrIndex, formData.isTransportSelf)
                                }
                                sx={{ ml: -1 }}
                              >
                                <AddIcon />
                              </IconButton>
                            )} */}
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}

                    {/* Add Bale Button */}
                    {/* <Grid item xs={12}>
                      <IconButton
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          addBale(lrIndex, formData.isTransportSelf)
                        }
                      >
                        <AddIcon />
                      </IconButton>
                    </Grid> */}

                    {/* Remove LR Button */}
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          justifyContent: "flex-start",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            addBale(lrIndex, formData.isTransportSelf)
                          }
                        >
                          Add Bale
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              ))}

              {/* Add LR Button */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => addLR(formData.isTransportSelf)}
              >
                Add LR
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => createShipmentOrder()}
                sx={{ ml: 1 }}
                disabled={lrs.length === 0}
              >
                Save Shipment
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
