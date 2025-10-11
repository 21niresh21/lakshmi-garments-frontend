import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import { getItemsByBatchId } from "../../api/batchItemApi";

function AssignJobworkForm({
  employees,
  jobworkTypes,
  pendingBatches,
  nextJobworkNumber,
  handleBatchTimelineChange,
  onSubmit,
  batchCount,
}) {
  const [formData, setFormData] = useState({
    employee: null,
    batch: null,
    jobworkType: null,
    quantity: "",
    rows: [{ job: null, qty: "" }],
    remarks: "",
    isRework: false,
  });

  const [items, setItems] = useState([]);

  const handleAddRow = () => {
    setFormData({
      ...formData,
      rows: [...formData.rows, { job: null, qty: "" }],
    });
  };

  const handleDeleteRow = (index) => {
    const newRows = formData.rows.filter((_, i) => i !== index);
    setFormData({ ...formData, rows: newRows });
  };

  const handleRowChange = (index, field, value) => {
    const newRows = [...formData.rows];
    newRows[index][field] = value;
    setFormData({ ...formData, rows: newRows });
  };

  const handleChange = (field, newValue) => {
    if (field === "batch" && newValue !== null) {
      handleBatchTimelineChange(newValue.id);
      setFormData((prevData) => ({
        ...prevData,
        [field]: newValue,
        quantity: "",
        remarks: "",
        rows: [{ job: null, qty: "" }],
      }));
      return;
    }
    if (field === "quantity") {
      // Allow empty string so user can delete input
      if (newValue === "") {
        console.log("newValue is empty");
        setFormData({ ...formData, quantity: "" });
        return;
      }

      const numericValue = Number(newValue);

      // Prevent invalid or negative input
      if (isNaN(numericValue) || numericValue < 0) return;

      // Clamp to batchCount
      const clampedValue = Math.min(numericValue, batchCount || numericValue);
      setFormData({ ...formData, quantity: clampedValue });
      return;
    }

    setFormData({ ...formData, [field]: newValue });
  };

  const handleSubmit = () => {
    const createData = {
      employeeId: formData.employee.id,
      batchId: formData.batch.id,
      jobworkTypeId: formData.jobworkType.id,
      quantity: formData.quantity,
      jobworkNumber: nextJobworkNumber,
    };
    onSubmit(createData);
  };

  useEffect(() => {
    if (formData.batch && formData.jobworkType?.name !== "Cutting") {
      getItemsByBatchId(formData.batch.id).then((res) => {
        setItems(res.data);
      });
    }
  }, [formData.batch]);

  const selectedJobs = formData.rows.map((row) => row.job).filter(Boolean);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Assign Jobwork: {nextJobworkNumber}
      </Typography>

      {/* Top Inputs */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Autocomplete
          options={employees || []}
          value={formData.employee}
          onChange={(e, val) => handleChange("employee", val)}
          getOptionLabel={(option) => option?.name || ""}
          renderInput={(params) => (
            <TextField {...params} label="Assign to Employee" size="small" />
          )}
          sx={{ flex: 3 }}
        />

        <Autocomplete
          options={pendingBatches || []}
          value={formData.batch}
          onChange={(e, val) => handleChange("batch", val)}
          getOptionLabel={(option) => option?.serialCode || ""}
          renderInput={(params) => (
            <TextField {...params} label="Select Batch" size="small" />
          )}
          sx={{ flex: 2 }}
        />

        <Autocomplete
          options={jobworkTypes || []}
          value={formData.jobworkType}
          onChange={(e, val) => handleChange("jobworkType", val)}
          getOptionLabel={(option) => option?.name || ""}
          renderInput={(params) => (
            <TextField {...params} label="Jobwork" size="small" />
          )}
          sx={{ flex: 2 }}
        />
      </Box>

      {/* Dynamic Jobwork Rows (Only if NOT Cutting) */}
      {formData.jobworkType?.name !== "Cutting" &&
        formData.jobworkType !== null && (
          <>
            {formData.rows.map((row, index) => {
              const otherSelectedJobs = selectedJobs.filter(
                (job) => job !== row.job
              );
              const filteredOptions = items.filter(
                (job) => !otherSelectedJobs.includes(job)
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
                    value={row.job}
                    onChange={(e, val) => handleRowChange(index, "job", val)}
                    getOptionLabel={(option) => option?.name || ""}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Item" size="small" />
                    )}
                    sx={{ flex: 3 }}
                  />

                  <TextField
                    label="Quantity"
                    size="small"
                    type="number"
                    value={row.qty}
                    onChange={(e) =>
                      handleRowChange(index, "qty", e.target.value)
                    }
                    sx={{ flex: 2 }}
                  />

                  <IconButton
                    color="error"
                    onClick={() => handleDeleteRow(index)}
                    disabled={formData.rows.length === 1}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              );
            })}

            <Button
              startIcon={<Add />}
              onClick={handleAddRow}
              variant="outlined"
              size="small"
            >
              Add Jobwork Row
            </Button>
          </>
        )}

      {formData.jobworkType?.name === "Cutting" && (
        <Box>
          <TextField
            label="Quantity"
            size="small"
            type="number"
            slotProps={{ min: 0 }}
            value={formData.quantity}
            onChange={(e) =>
              handleChange("quantity", parseInt(e.target.value, 10))
            }
            helperText={"Available Quantity: " + batchCount}
            sx={{ flex: 2 }}
          />
        </Box>
      )}

      {formData.jobworkType && (
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Remarks"
            size="small"
            multiline
            name="remarks"
            value={formData.remarks}
            onChange={(e) => handleChange("remarks", e.target.value)}
            rows={3}
            sx={{ width: "100%" }}
          />
        </Box>
      )}

      {/* Bottom-right Assign Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Assign Jobwork
        </Button>
      </Box>
    </Box>
  );
}

export default AssignJobworkForm;
