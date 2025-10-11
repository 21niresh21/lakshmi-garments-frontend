import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import {
  Add,
  Delete,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { fetchDamageTypes } from "../../api/damageTypeApi";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function DamageForm() {
  const [showDamage, setShowDamage] = useState(false);
  const [damages, setDamages] = useState([{ type: null, qty: "" }]);
  const [damageTypes, setDamageTypes] = useState([]);

  useEffect(() => {
    fetchDamageTypes().then((response) => {
      setDamageTypes(response.data);
    });
  }, []);

  const handleAddDamage = () => {
    if (damages.length < 3) {
      setDamages([...damages, { type: null, qty: "" }]);
    }
  };

  const handleRemoveDamage = (index) => {
    const updated = [...damages];
    updated.splice(index, 1);
    setDamages(updated);
  };

  const handleDamageChange = (index, field, value) => {
    const updated = [...damages];
    updated[index][field] = value;
    setDamages(updated);
  };

  return (
    <>
      {/* Toggle Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 1,
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={() => setShowDamage(!showDamage)}
      >
        <Typography variant="subtitle1" fontWeight={500}>
          Damaged Pieces (if any)
        </Typography>
        <IconButton size="small">
          {showDamage ? <ExpandMoreIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>

      {/* Collapsible Body */}
      <Collapse in={showDamage}>
        <Box sx={{ mt: 2 }}>
          {damages.map((row, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 2,
              }}
            >
              <Autocomplete
                options={damageTypes.map((type) => type.name)}
                value={row.type}
                onChange={(e, value) =>
                  handleDamageChange(index, "type", value)
                }
                renderInput={(params) => (
                  <TextField {...params} label="Damage Type" size="small" />
                )}
                sx={{ flex: 3 }}
              />
              <TextField
                label="Qty"
                size="small"
                type="number"
                value={row.qty}
                onChange={(e) =>
                  handleDamageChange(index, "qty", e.target.value)
                }
                sx={{ flex: 2 }}
              />
              <IconButton
                onClick={() => handleRemoveDamage(index)}
                color="error"
                disabled={damages.length === 1}
              >
                <Delete />
              </IconButton>
            </Box>
          ))}

          <Button
            startIcon={<Add />}
            onClick={handleAddDamage}
            variant="outlined"
            size="small"
            disabled={damages.length >= 3}
          >
            Add Damage Type
          </Button>
        </Box>
      </Collapse>
    </>
  );
}
