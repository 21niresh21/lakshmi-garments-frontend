import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { fetchSkills } from "../../../api/skillApi";

function EmployeeForm({
  initialData = {},
  onSubmit,
  mode = "add",
  initialErrors = {},
}) {
  const nameRef = useRef(null);

  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    name: initialData?.name || "",
    skills: initialData?.skills || [], // expect array of skill objects or IDs
  });

  const [error, setError] = useState({
    name: initialErrors.employeeName || "",
    skills: initialErrors.employeeSkills || "",
  });

  const [skillsOptions, setSkillsOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch skills options on mount
  useEffect(() => {
    setLoading(true);
    fetchSkills("")
      .then((res) => {
        setSkillsOptions(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        setSkillsOptions([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setError({
      name: initialErrors.employeeName || "",
      skills: initialErrors.employeeSkills || "",
    });

    if (nameRef.current && isEdit) {
      nameRef.current.focus();
    }
  }, [initialErrors.employeeName, initialErrors.employeeSkills]);

  const handleChange = (e) => {
    setError((prev) => ({ ...prev, [e.target.name]: "" }));
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (event, value) => {
    setError((prev) => ({ ...prev, skills: "" }));
    setFormData((prev) => ({ ...prev, skills: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;

    if (formData.name.trim() === "") {
      setError((prev) => ({ ...prev, name: "Employee name is required" }));
      hasError = true;
    }

    if (!formData.skills.length) {
      setError((prev) => ({ ...prev, skills: "Select at least one skill" }));
      hasError = true;
    }

    if (hasError) return;

    const payload = {
      id: formData.id,
      name: formData.name,
      skills: formData.skills.map((skill) => skill.id),
    };

    onSubmit(payload, () => setFormData({id : "", name: "", skills: [] }));
  };
  const isEdit = mode === "edit";

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {isEdit ? "Update Employee" : "Add Employee"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          inputRef={nameRef}
          placeholder="Employee Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!error.name}
          helperText={error.name}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Autocomplete
          multiple
          autoHighlight
          options={skillsOptions}
          getOptionLabel={(option) => option.name || ""}
          value={formData.skills}
          onChange={handleSkillsChange}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Skills"
              placeholder="Select Skills"
              error={!!error.skills}
              helperText={error.skills}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              fullWidth
              sx={{ mb: 2 }}
            />
          )}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            {isEdit ? "Update Employee" : "Add Employee"}
          </Button>
        </Box>
      </form>
    </>
  );
}

export default EmployeeForm;
