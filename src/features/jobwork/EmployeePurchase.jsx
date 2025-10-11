import React, { useState } from "react";
import {
  Box,
  Collapse,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function EmployeePurchase({
  employeePurchase,
  setEmployeePurchase,
}) {
  const [showPurchase, setShowPurchase] = useState(false);

  return (
    <>
      {/* Toggle Employee Purchase Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 1,
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={() => setShowPurchase(!showPurchase)}
      >
        <Typography variant="subtitle1" fontWeight={500}>
          Employee Purchased Items
        </Typography>
        <IconButton size="small">
          {showPurchase ? <ExpandMoreIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>

      {/* Collapsible Purchase Inputs */}
      <Collapse in={showPurchase}>
        <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
          <TextField
            label="Item Name"
            value={employeePurchase.item}
            onChange={(e) =>
              setEmployeePurchase({ ...employeePurchase, item: e.target.value })
            }
            size="small"
            sx={{ flex: 2 }}
          />
          <TextField
            label="Quantity"
            type="number"
            value={employeePurchase.qty}
            onChange={(e) =>
              setEmployeePurchase({ ...employeePurchase, qty: e.target.value })
            }
            size="small"
            sx={{ flex: 1 }}
          />
        </Box>
      </Collapse>
    </>
  );
}
