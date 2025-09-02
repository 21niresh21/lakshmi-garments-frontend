import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Autocomplete,
  Switch,
  FormControlLabel,
  Button,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const UserCreateModal = ({ open, onClose, roles = [], onSubmit }) => {
  const [form, setForm] = React.useState({
    name: "",
    password: "",
    roleName: "",
    isActive: true,
  });
  const [error, setError] = React.useState({
    name: "",
    password: "",
    roleName: "",
  });

  const handleChange = (field) => (e) => {
    const value = field === "isActive" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setError((prev) => ({ ...prev, [field]: "" })); // Reset error on input change
  };

  const handleRoleChange = (_, value) => {
    setForm((prev) => ({ ...prev, roleName: value }));
    setError((prev) => ({ ...prev, roleName: "" })); // Reset error on role change
  };

  const handleSubmit = () => {
    if (!form.name || !form.password || !form.roleName) {
      if (!form.name) {
        setError((prev) => ({
          ...prev,
          name: !form.name ? "Name is required" : "",
        }));
      }
      if (!form.password) {
        setError((prev) => ({ ...prev, password: "Password is required" }));
      }
      if (!form.roleName) {
        setError((prev) => ({ ...prev, roleName: "Role is required" }));
      }
      return;
    }
    onSubmit(form);
    setForm({
      name: "",
      password: "",
      roleName: "",
      isActive: true,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Create User
        </Typography>

        <TextField
          fullWidth
          label="Name"
          value={form.name}
          onChange={handleChange("name")}
          margin="normal"
          error={error.name}
          helperText={error.name}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          value={form.password}
          onChange={handleChange("password")}
          margin="normal"
          error={error.password}
          helperText={error.password}
        />

        <Autocomplete
          options={roles}
          getOptionLabel={(option) => option}
          value={form.roleName}
          onChange={handleRoleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Role"
              margin="normal"
              fullWidth
              error={error.roleName}
              helperText={error.roleName}
            />
          )}
        />

        <FormControlLabel
          control={
            <Switch
              checked={form.isActive}
              onChange={handleChange("isActive")}
            />
          }
          label="Active"
          sx={{ mt: 2 }}
        />

        <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserCreateModal;
