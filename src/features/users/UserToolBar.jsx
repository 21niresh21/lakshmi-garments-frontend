import React, { useState } from "react";
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
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import UserFilter from "./UserFilter"; // Assuming you have this UserFilter component
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UserCreateModal from "./UserCreateModal";

function UserToolBar({
  totalRows,
  handleFilterChange,
  filter,
  rolesList,
  handleUserCreate,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

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
        {`Users (${totalRows ?? 0})`}
      </Typography>

      <Stack gap={1} direction={"row"}>
        <TextField
          size="small"
          value={filter.search}
          onChange={handleSearchChange}
          placeholder="Search by name"
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
        {/* <Tooltip title="Filter Users">
          <IconButton onClick={openFilter}>
            <FilterListIcon />
          </IconButton>
        </Tooltip> */}

        {/* <UserFilter
          anchorEl={anchorEl}
          handleClose={handleClose}
          onFilterChange={handleFilterChange}
          filter={filter}
          roles={rolesList}
        /> */}
        <Tooltip title="Add Users">
          <IconButton onClick={handleModalOpen}>
            <PersonAddIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <UserCreateModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        roles={rolesList}
        onSubmit={handleUserCreate}
      />
    </Box>
  );
}

export default UserToolBar;
