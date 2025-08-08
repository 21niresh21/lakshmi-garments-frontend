import {
  Box,
  IconButton,
  InputAdornment,
  Menu,
  Popover,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import InvoiceFilter from "./InvoiceFilter";

function InvoiceToolBar({ totalRows, handleFilterChange, filter }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openFilter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSearchChange = (e) => {
    handleFilterChange((prev) => ({
      ...prev,
      search: e.target.value,
    }));
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        px: 2,
        py: 1,
        alignItems: "center",
      }}
    >
      <Typography component="div" variant="h6" sx={{ fontWeight: 600 }}>
        {"Invoices " + "(" + totalRows + ")"}
      </Typography>
      <Stack gap={1} direction={"row"}>
        <TextField
          size="small"
          value={filter.search}
          onChange={handleSearchChange}
          placeholder="Search invoice number"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: {
                padding: 2,
                paddingLeft: 10,
              },
            },
          }}
          inputProps={{
            style: {
              padding: 5,
            },
          }}
        />
        <Tooltip title="Filter Invoice">
          <IconButton onClick={openFilter}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>

        <InvoiceFilter
          anchorEl={anchorEl}
          handleClose={handleClose}
          onFilterChange={handleFilterChange}
          filter={filter}
        />
      </Stack>
    </Box>
  );
}

export default InvoiceToolBar;
