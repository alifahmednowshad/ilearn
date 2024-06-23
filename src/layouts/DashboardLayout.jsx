import { Link, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import UseAuth from "../hooks/UseAuth";
import UseAdmin from "../hooks/useAdmin";

const drawerWidth = 240;

const DashboardLayout = () => {
  const { user, logOut } = UseAuth();
  const [isAdmin] = UseAdmin(user?.email);

  const handleLogout = async () => {
    try {
      await logOut();
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#333",
            color: "#fff",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem button component={Link} to="profile">
            <ListItemIcon>
              <AccountCircleIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          {isAdmin ? (
            <>
              <ListItem button component={Link} to="all-user">
                <ListItemIcon>
                  <AccountCircleIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="All User" />
              </ListItem>
              <ListItem button component={Link} to="courses">
                <ListItemIcon>
                  <SchoolIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Courses" />
              </ListItem>
              <ListItem button component={Link} to="addcourse">
                <ListItemIcon>
                  <SchoolIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Add Course" />
              </ListItem>
            </>
          ) : (
            <></>
          )}
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <HomeIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Go to Home" />
          </ListItem>
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ p: 2 }}>
          <Button
            onSubmit={handleLogout()}
            variant="contained"
            color="secondary"
            startIcon={<LogoutIcon />}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
