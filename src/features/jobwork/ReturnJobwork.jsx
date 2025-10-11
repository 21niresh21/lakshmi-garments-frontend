import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Autocomplete,
  IconButton,
  Button,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import JobworkDetailPanel from "./JobworkDetailPanel";
import EmployeePurchase from "./EmployeePurchase";
import DamageForm from "./DamageForm";
import {
  fetchJobworkNumbers,
  fetchJobworkDetailsByNumber,
} from "../../api/jobworkApi";
import { fetchItems } from "../../api/itemApi";
import { fetchDamageTypes } from "../../api/damageTypeApi";

function ReturnJobwork() {
  const [jobworkData, setJobworkData] = useState(null);
  const [jobworkNumber, setJobworkNumber] = useState("");
  const [jobworkNumbers, setJobworkNumbers] = useState(null);

  const [items, setItems] = useState([{ item: null, qty: "" }]);
  const [damages, setDamages] = useState([{ type: null, qty: "" }]);
  const [damageTypes, setDamageTypes] = useState([]);
  const [itemData, setItemData] = useState([]);

  const [employeePurchase, setEmployeePurchase] = useState({
    item: null,
    qty: "",
  });

  // Fetch initial data
  useEffect(() => {
    fetchDamageTypes().then((res) => setDamageTypes(res.data));
    fetchItems().then((res) => setItemData(res.data));
    fetchJobworkNumbers().then((res) => setJobworkNumbers(res.data));
  }, []);

  // Handlers
  const handleJobworkSearch = () => {
    if (!jobworkNumber) return;
    fetchJobworkDetailsByNumber(jobworkNumber).then((res) =>
      setJobworkData(res.data)
    );
  };

  const handleAddItem = () => {
    setItems([...items, { item: null, qty: "" }]);
  };

  const handleRemoveItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleItemChange = (index, field, value) => {
    if (field === "qty" && jobworkData && jobworkData.quantity) {
      if (value === "") {
        const updated = [...items];
        updated[index][field] = "";
        setItems(updated);
        return;
      }

      let newQty = parseInt(value, 10) || 0;
      const otherSum = items.reduce(
        (sum, item, idx) =>
          idx === index ? sum : sum + (parseInt(item.qty, 10) || 0),
        0
      );
      const otherSumFromDamages = damages.reduce(
        (sum, damage, idx) =>
          idx === index ? sum : sum + (parseInt(damage.qty, 10) || 0),
        0
      );

      const maxAllowed = Math.max(
        jobworkData.quantity -
          otherSum -
          otherSumFromDamages -
          employeePurchase.qty,
        0
      );
      newQty = Math.min(newQty, maxAllowed);

      const updated = [...items];
      updated[index][field] = newQty;
      setItems(updated);
    } else {
      const updated = [...items];
      updated[index][field] = value;
      setItems(updated);
    }
  };

  return (
    <Grid container sx={{ height: "90%" }}>
      {/* Left Section */}
      <Grid item xs={8}>
        <Box
          sx={{
            height: "100%",
            overflow: "auto",
            p: 2,
            borderRight: jobworkData ? "1px solid #e0e0e0" : "none",
          }}
        >
          {/* Jobwork Search */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleJobworkSearch();
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <Autocomplete
                autoHighlight
                options={jobworkNumbers || []}
                value={jobworkNumber}
                onChange={(e, value) => setJobworkNumber(value)}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Enter Jobwork Number"
                    size="small"
                  />
                )}
                sx={{ width: 250 }}
                freeSolo
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
              >
                Search
              </Button>
            </Box>
          </form>

          {/* Conditional Item Form Section (Cutting Type Only) */}
          {jobworkData &&
            jobworkData.jobworkType === "Cutting" &&
            jobworkNumber === jobworkData.jobworkNumber && (
              <>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Items Formed
                </Typography>

                {items.map((row, index) => {
                  // Prevent duplicate item selection
                  const selectedItemNames = items
                    .map((i) => i.item?.name)
                    .filter(Boolean);

                  const filteredOptions = itemData.filter(
                    (i) =>
                      !selectedItemNames.includes(i.name) ||
                      i.name === row.item?.name
                  );

                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <Typography sx={{ width: 20 }}>{index + 1}.</Typography>

                      <Autocomplete
                        options={filteredOptions}
                        value={row.item}
                        onChange={(e, value) =>
                          handleItemChange(index, "item", value)
                        }
                        getOptionLabel={(option) => option?.name || ""}
                        renderInput={(params) => (
                          <TextField {...params} label="Item" size="small" />
                        )}
                        sx={{ flex: 3 }}
                      />

                      <TextField
                        label="Qty"
                        size="small"
                        type="number"
                        value={row.qty}
                        onChange={(e) =>
                          handleItemChange(index, "qty", e.target.value)
                        }
                        sx={{ flex: 2 }}
                      />

                      <IconButton
                        onClick={() => handleRemoveItem(index)}
                        color="error"
                        disabled={items.length === 1}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  );
                })}

                {/* Add Item Button */}
                <Button
                  startIcon={<Add />}
                  onClick={handleAddItem}
                  variant="outlined"
                  size="small"
                  sx={{ mb: 2 }}
                >
                  Add Item
                </Button>
              </>
            )}

          <EmployeePurchase
            employeePurchase={employeePurchase}
            setEmployeePurchase={setEmployeePurchase}
          />
          <DamageForm />

          {/* Accept Button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button variant="contained" color="primary">
              Accept Jobwork
            </Button>
          </Box>
        </Box>
      </Grid>

      {/* Right Section */}
      {jobworkData && (
        <Grid item xs={4}>
          <Grid container direction="column" sx={{ height: "100%" }}>
            <Grid item xs={12} sx={{ height: "100%" }}>
              <Typography
                sx={{
                  px: 2,
                  pt: 1,
                  userSelect: "none",
                  borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                  flexShrink: 0,
                }}
              >
                Jobwork Details
              </Typography>
              <Box
                sx={{
                  height: "100%",
                  p: 2,
                  overflowY: "auto",
                }}
              >
                <JobworkDetailPanel jobworkData={jobworkData} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

export default ReturnJobwork;
