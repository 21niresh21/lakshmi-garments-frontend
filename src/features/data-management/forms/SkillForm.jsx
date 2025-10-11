import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects"; // icon for skills

function SkillForm({
  initialData = {},
  onSubmit,
  mode = "add",
  initialErrors = {},
}) {
  const nameRef = useRef(null);

  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    name: initialData?.name || "",
  });

  const [error, setError] = useState({
    name: initialErrors.skillName || "",
  });

  const isEdit = mode === "edit";

  useEffect(() => {
    setError({
      name: initialErrors.skillName || "",
    });

    if (nameRef.current && isEdit) {
      nameRef.current.focus();
    }
  }, [initialErrors.skillName, isEdit]);

  const handleChange = (e) => {
    setError((prev) => ({ ...prev, [e.target.name]: "" }));
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() === "") {
      setError((prev) => ({ ...prev, name: "Skill name is required" }));
      return;
    }
    onSubmit(formData, () => setFormData({ name: "", id: "" }));
  };

  return (
    <>
      <Typography variant="h6">
        {isEdit ? "Update Skill" : "Add Skill"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          placeholder="Skill Name"
          variant="outlined"
          name="name"
          inputRef={nameRef}
          onChange={handleChange}
          value={formData.name}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmojiObjectsIcon />
              </InputAdornment>
            ),
          }}
          error={!!error.name}
          helperText={error.name}
          fullWidth
          sx={{ mt: 2 }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" type="submit">
            {isEdit ? "Update Skill" : "Add Skill"}
          </Button>
        </Box>
      </form>
    </>
  );
}

export default SkillForm;
