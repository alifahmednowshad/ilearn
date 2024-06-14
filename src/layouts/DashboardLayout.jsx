
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

const drawerWidth = 240;

const DashboardLayout = () => {
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
