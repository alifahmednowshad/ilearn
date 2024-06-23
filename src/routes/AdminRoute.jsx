import { Navigate, useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import UseAuth from "../hooks/UseAuth";
import UseAdmin from "../hooks/UseAdmin";

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const [isAdmin, isAdminLoading] = UseAdmin(user?.email);
  const location = useLocation();

  if (loading || isAdminLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Box component="span" sx={{ ml: 2, color: "text.primary" }}>
          Loading...
        </Box>
      </Box>
    );
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
