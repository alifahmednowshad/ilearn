// src/theme.js (create a new file for your theme)
import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Change this to your primary color
    },
    secondary: {
      main: "#f50057", // Change this to your secondary color
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Specify your default font family
  },
});

export default theme;
