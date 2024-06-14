import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import toast from "react-hot-toast"; 
import UseAuth from "../hooks/UseAuth";
import GoogleLogIn from "../components/Auth/GoogleLogIn";

const theme = createTheme();

export default function Register() {
  const { createUser } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const from = location.state?.from?.pathname || "/";

  const validateForm = (data) => {
    const errors = {};
    if (!data.get("firstName")) errors.firstName = "First name is required";
    if (!data.get("lastName")) errors.lastName = "Last name is required";
    if (!data.get("email")) errors.email = "Email is required";
    if (!data.get("password")) errors.password = "Password is required";
    if (!data.get("confirmPassword"))
      errors.confirmPassword = "Confirm Password is required";
    if (data.get("password") !== data.get("confirmPassword")) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const errors = validateForm(data);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const name = `${data.get("firstName")} ${data.get("lastName")}`;
    const email = data.get("email");
    const password = data.get("password");

    try {
      const createdUser = await createUser(email, password);
        console.log(createdUser)
        if (createdUser) {
          const userInfo = { email: createdUser.email, name: name };
          const response = await fetch("http://localhost:5000/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInfo),
          });

          if (response.ok) {
            toast.success("Registration successful!");
            navigate(from);
          } else {
            const result = await response.json();
            console.error("Failed to save user information:", result);
            setError("Failed to save user information.");
          }
        }
    } catch (err) {
      console.error("Error creating user:", err);
      setError(
        "Failed to create an account. Please check your input and try again."
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  error={!!formErrors.confirmPassword}
                  helperText={formErrors.confirmPassword}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              Sign Up
            </Button>
            <Typography align="center">Or</Typography>
            <Box sx={{ mt: 2, mb: 2 }}>
              <GoogleLogIn />
            </Box>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
