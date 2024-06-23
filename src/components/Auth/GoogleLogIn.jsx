import Button from "@mui/material/Button";
import { FcGoogle } from "react-icons/fc";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UseAuth from "../../hooks/UseAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const theme = createTheme();

export default function GoogleLogIn() {
  const { googleLogin } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = () => {
    googleLogin()
      .then((data) => {
        if (data?.uid) {
          const userInfo = {
            email: data?.email,
            name: data?.displayName,
            uid: data?.uid,
            photoURL: data?.photoURL,
          };
          axios
            .post("http://localhost:5000/user", userInfo, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((res) => {
              localStorage.setItem("token", res.data.token);
              console.log("Google login success");
              navigate(from, { replace: true });
            })
            .catch((error) => {
              console.error("Error logging in with Google:", error);
              toast.error("Error logging in with Google:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
        toast.error("Error signing in with Google:", error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={handleSubmit}
        fullWidth
        variant="outlined"
        startIcon={<FcGoogle size={30} />}
        sx={{ display: "flex", alignItems: "center" }}
      >
        Log in with Google
      </Button>
    </ThemeProvider>
  );
}
