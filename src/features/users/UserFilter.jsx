import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, FormControl, FormControlLabel, Popover, Typography } from "@mui/material";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import { fetchUserRoles } from "../../api/userApi"; // Assuming this API fetches roles

function UserFilter({ anchorEl, handleClose, onFilterChange, filter, roles }) {

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    onFilterChange((prev) => ({
      ...prev,
      roles: selectedRole ? [selectedRole] : [], // Set selected role, or clear if empty
    }));
  };

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value === "active"; // "active" -> true, "inactive" -> false
    onFilterChange((prev) => ({
      ...prev,
      isActive: selectedStatus,
    }));
  };

  const clearFilter = () => {
    onFilterChange({
      roles: [],
      isActive: null, // Clear isActive filter
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
          gap: "10px",
          pl: 3,
          pr: 3,
          pt: 1,
        }}
      >
        <Box sx={{ padding: 1, textAlign: "left" }}>
          <Typography variant="h6" textTransform="capitalize" fontWeight={600}>
            USER FILTERS
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

        {/* Role Filter */}
        <Box sx={{ padding: 1, textAlign: "center" }}>
          <FormControl variant="outlined" fullWidth>
            <select
              value={filter.roles || ""}
              onChange={handleRoleChange}
              style={{ width: "100%", padding: "6px 12px", fontSize: "14px" }}
            >
              <option value="">Filter by Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </FormControl>
        </Box>

        {/* Status Filter */}
        <Box sx={{ padding: 1, textAlign: "center" }}>
          <Typography sx={{ textAlign: "left", pl: 1.5 }}>Status</Typography>
          <FormControl variant="outlined" sx={{ ml: 1, mr: 1, width: 300, textAlign: "left", mt: 0.5 }}>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    value="active"
                    checked={filter.isActive === true} // Active checked when isActive is true
                    onChange={handleStatusChange}
                  />
                }
                label="Active"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="inactive"
                    checked={filter.isActive === false} // Inactive checked when isActive is false
                    onChange={handleStatusChange}
                  />
                }
                label="Inactive"
              />
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Popover>
  );
}

export default UserFilter;
