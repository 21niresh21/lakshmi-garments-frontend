import { TextField, styled } from "@mui/material";
import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";

export const StyledTextField = styled(TextField)(({ theme }) => ({
  borderRadius: "8px", // Same rounded corners as the radio buttons
  backgroundColor: theme.palette.background.paper, // Same background as the radio buttons
  boxShadow: theme.shadows[2], // Light shadow for elevation
  // "& .MuiOutlinedInput-root": {
  //   borderRadius: "8px", // Rounded corners for the border
  // },
  // "& .MuiInputLabel-root": {
  //   fontWeight: "bold", // Optional: Make the label bold
  // },
  // "&:hover .MuiOutlinedInput-root": {
  //   borderColor: theme.palette.primary.main, // On hover, change the border color
  // },
  // "& .MuiOutlinedInput-notchedOutline": {
  //   borderColor: theme.palette.grey[400], // Default border color
  // },
  // "&:focus .MuiOutlinedInput-notchedOutline": {
  //   borderColor: theme.palette.primary.main, // On focus, change the border color
  // },
}));

export const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  display: "flex", // Use flex to allow alignment of radio and label side by side
  justifyContent: "flex-start", // Align radio button and label to the left
  alignItems: "center", // Vertically center the content
  padding: "12px 20px", // Padding for the box, adjust as necessary
  borderRadius: "8px", // Rounded corners
  margin: "3px", // Margin between radio buttons
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2], // Light shadow for elevation
  transition: "all 0.3s ease",
  width: "100%", // Full width to fill the container
  height: "30px", // Adjust the height to auto for better spacing
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    boxShadow: theme.shadows[4], // Elevate on hover
  },
  "& .MuiRadio-root": {
    marginRight: "10px", // Space between the radio button and the label
  },
}));
