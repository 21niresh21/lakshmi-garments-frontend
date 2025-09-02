import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Chip,
  Divider,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  styled,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DoneIcon from "@mui/icons-material/Done";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { useNavigate } from "react-router";

import InboxIcon from "@mui/icons-material/Inbox";
import UserTableHeader from "../features/users/UserTableHeader";
import UserTablePagination from "../features/users/UserTablePagination";
import UserToolBar from "../features/users/UserToolBar";
import {
  createUser,
  fetchUserRoles,
  getAllUsers,
  updateUser,
} from "../api/userApi";

// Custom input style
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 10,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    fontSize: 14, // Adjust font size
    border: "1px solid #ced4da",
    padding: "3px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 10,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

function Users() {
  const [data, setData] = useState({}); // Store the full response data
  const [selectedValue, setSelectedValue] = useState({}); // State to hold selected values (like user status)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState({ field: "", order: "" });
  const [filters, setFilters] = useState({
    name: "",
    role: [],
    isActive: [],
    pageNo: page,
    pageSize: rowsPerPage,
    search: "",
  });
  const [rolesList, setRolesList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [networkError, setNetworkError] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setNetworkError(false);
  };

  const handleClick = () => {
    setOpen(true);
  };
  let navigate = useNavigate();

  useEffect(() => {
    getAllUsers(filters, page, rowsPerPage, sort)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          setNetworkError(true);
          return;
        }
        setNetworkError(true);
      });
    fetchUserRoles()
      .then((roles) => {
        setRolesList(roles.map((role) => role.name));
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          setNetworkError(true);
          return;
        }
        // console.error("Error fetching roles:", error);
      });
  }, [filters, page, rowsPerPage, sort, open]);

  // Handle select change (e.g., change user status)
  const handleSelectChange = (userId, event) => {
    event.stopPropagation(); // Prevent the row click event from being triggered
    setSelectedValue({
      ...selectedValue,
      [userId]: event.target.value,
    });
    // Placeholder for updating user status
    // updateUserStatus(userId, { isActive: event.target.value === "Active" ? true : false });
  };

  const renderValueWithIcon = (selectedValue) => {
    const selectedOption = selectedValue || "";
    let IconComponent;

    if (selectedOption === "Inactive") {
      IconComponent = (
        <PriorityHighIcon sx={{ marginRight: 1, color: "#d60202" }} />
      );
    } else if (selectedOption === "Active") {
      IconComponent = <DoneIcon sx={{ marginRight: 1, color: "#007804" }} />;
    }

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {IconComponent}
        <span>{selectedOption}</span>
      </div>
    );
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    setFilters((prev) => ({
      ...prev,
      pageNo: newPage,
    }));
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setFilters((prev) => ({
      ...prev,
      pageSize: parseInt(event.target.value, 10),
      pageNo: 0,
    }));
  };

  const handleUserOpen = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleUserCreate = (formData) => {
    // Call your API to create user here
    createUser(formData)
      .then((response) => {
        handleClick();
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
    // Show success message
  };

  const handleUserUpdate = (userId, userData) => {
    updateUser(userId, userData)
      .then((response) => {
        setData((prevData) => {
          const updatedContent = prevData.content.map((user) =>
            user.id === userId ? { ...user, ...userData } : user
          );
          return { ...prevData, content: updatedContent };
        });
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <UserToolBar
        totalRows={data ? data.totalElements : 0}
        handleFilterChange={setFilters}
        filter={filters}
        rolesList={rolesList}
        handleUserCreate={handleUserCreate}
      />
      <Divider />
      <Table>
        {data && data.content && data.content.length > 0 && (
          <UserTableHeader sort={sort} setSort={setSort} />
        )}

        <TableBody>
          {data && data.content && data.content.length > 0 ? (
            data.content.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <Chip sx={{ ml: -5 }} label={user.roleName} />
                </TableCell>
                <TableCell>
                  {user && (
                    <Tooltip
                      title={user.isActive ? "User Enabled" : "User Disabled"}
                    >
                      <Switch
                        size="small"
                        checked={user.isActive}
                        onChange={(e) =>
                          handleUserUpdate(user.id, {
                            isActive: e.target.checked,
                          })
                        }
                      />
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    py: 6,
                  }}
                >
                  <InboxIcon sx={{ fontSize: 60, color: "grey.400", mb: 1 }} />
                  <Typography variant="body1" color="text.secondary">
                    No user data available.
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <UserTablePagination
        count={data.totalElements ? data.totalElements : 0}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          User Added Successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={networkError}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Network Error. Please try again later.
        </Alert>
      </Snackbar>
    </TableContainer>
  );
}

export default Users;
