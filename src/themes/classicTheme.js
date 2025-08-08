import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";

let theme = createTheme({
  // components: {
  //   MuiOutlinedInput: {
  //     styleOverrides: {
  //       input: {
  //         padding: "12px 16px", // top-bottom, left-right
  //       },
  //     },
  //   },
  // },
  palette: {
    primary: {
      main: "#5f506b",
    },
    secondary: {
      main: green[500],
    },
  },
});

theme = createTheme(theme, {
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
});

export default theme;
