// theme.js
import { createTheme } from "@mui/material/styles";

// Step 1: Create base theme with palette and typography
const baseTheme = createTheme({
  palette: {
    mode: "light", // or "dark"

    primary: {
      main: "#014F86", // Main color
      light: "#63a4ff", // Lighter shade
      dark: "#013A63", // Darker shade
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#9c27b0",
      light: "#d05ce3",
      dark: "#6a0080",
      contrastText: "#ffffff",
    },

    error: {
      main: "#f44336",
    },

    warning: {
      main: "#ff9800",
    },

    info: {
      main: "#2196f3",
    },

    success: {
      main: "#4caf50",
    },

    background: {
      default: "#edf6f9",
      paper: "#ffffff",
    },

    // text: {
    //   primary: "#000000",
    //   secondary: "#666666",
    // },
  },

  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    button: {
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 8,
  },
});

const theme = createTheme(baseTheme, {
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: baseTheme.palette.primary.main,
          color: baseTheme.palette.primary.contrastText,
          fontWeight: "bold",
        },
      },
    },
  },
});

export default theme;
