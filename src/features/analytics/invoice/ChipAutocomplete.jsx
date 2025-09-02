import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Fade from "@mui/material/Fade";
import Popper from "@mui/material/Popper";

const options = ["Option 1", "Option 2", "Option 3"];

// Custom Popper with Fade animation
function FadePopper(props) {
  return (
    <Popper {...props} transition style={{ zIndex: 1300 }}>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={200}>
          <div>{props.children}</div>
        </Fade>
      )}
    </Popper>
  );
}

export default function ChipDropdown() {
  return (
    <Autocomplete
      options={options}
      disableClearable
      popupIcon={<ArrowDropDownIcon />}
      PopperComponent={FadePopper} // <- animated popper
      componentsProps={{
        paper: {
          elevation: 0,
          sx: {
            bgcolor: "grey.300",
            borderRadius: "12px",
            border: 0,
            boxShadow: "none",
          },
        },
        listbox: {
          sx: {
            p: 0.5,
            "& .MuiAutocomplete-option": {
              m: 0.25,
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background-color 0.2s ease", // smooth hover
              "&[aria-selected='true']": { bgcolor: "grey.300" },
              "&.Mui-focused": { bgcolor: "grey.300" },
            },
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "2px 6px",
              cursor: "pointer",
              borderRadius: "50px",
              bgcolor: "grey.100",
              boxShadow: "none",
              "& .MuiOutlinedInput-notchedOutline": {
                border: 0,
                borderRadius: "50px",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": { border: 0 },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0 },
            },
            "& .MuiOutlinedInput-input": {
              cursor: "pointer",
            },
            "& .MuiAutocomplete-input": {
              cursor: "pointer",
            },
            "& input": {
              caretColor: "transparent",
            },
          }}
        />
      )}
      renderTags={(value) =>
        value.map((option, index) => (
          <Chip
            key={index}
            label={option}
            size="small"
            sx={{
              height: 24,
              fontSize: "0.75rem",
              transition: "background-color 0.2s ease", // chip hover smoothness
              "&:hover": { bgcolor: "grey.400" },
            }}
          />
        ))
      }
    />
  );
}
