import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/Routes.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import { ThemeProvider } from "@mui/material";
import theme from "./provider/Theme.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={Router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
