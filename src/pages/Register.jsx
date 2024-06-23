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
import { useForm } from "react-hook-form";
import axios from "axios";

const theme = createTheme();

export default function Register() {
  const { createUser, updateUserProfile, verifyEmail } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const from = location.state?.from?.pathname || "/";

  const handleSignUp = (data) => {
    setError("");
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    createUser(data.email, data.password)
      .then((result) => {
        const user = result;
        updateUserProfile(
          data.firstName + " " + data.lastName,
          user.photoURL,
          user.uid
        ).then(() => {
          const saveUser = {
            name: data.firstName + " " + data.lastName,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
          };
          axios
            .post("http://localhost:5000/user", saveUser)
            .then((res) => {
              if (res.data.token) {
                reset();
                toast.success("User Created Successfully.", {
                  position: "top-center",
                });
                navigate(from, { replace: true });
              }
            })
            .catch((error) => {
              console.error("Error creating user:", error);
              const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Failed to create an account. Please check your input and try again.";

              setError(errorMessage);
              toast.error(errorMessage, { position: "top-center" });
            });
        });
        verifyEmail(); // Ensure this function is defined and handles email verification
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to create an account. Please check your input and try again.";

        setError(errorMessage);
        toast.error(errorMessage, { position: "top-center" });
      });
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
            onSubmit={handleSubmit(handleSignUp)}
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
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  error={!!errors.firstName}
                  helperText={errors.firstName ? errors.firstName.message : ""}
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
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  error={!!errors.lastName}
                  helperText={errors.lastName ? errors.lastName.message : ""}
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
                  {...register("email", { required: "Email is required" })}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
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
                  {...register("password", {
                    required: "Password is required",
                  })}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
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
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                  })}
                  error={!!errors.confirmPassword}
                  helperText={
                    errors.confirmPassword ? errors.confirmPassword.message : ""
                  }
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
