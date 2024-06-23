import { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  CircularProgress,
  Box,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AllUser = () => {
  const [AllUser, setAllUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("uid");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/user");
      setAllUser(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users.", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleMakeAdmin = (userId) => {
    axios
      .patch(
        `http://localhost:5000/user/admin/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.modifiedCount) {
          fetchUsers();
          toast.success("Make Admin Successful.", {
            position: "top-center",
          });
        }
      })
      .catch((error) => {
        console.error("Error making admin:", error);
        toast.error("Failed to make admin.", {
          position: "top-center",
        });
      });
  };

  const handleDeleteUser = (uid) => {
    axios
      .delete(`http://localhost:5000/user/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        fetchUsers();
        toast.success("Deleted Successfully.", {
          position: "top-center",
        });
        // If the current user deletes their own account and no users left, navigate to home page
        if (uid === currentUserId && AllUser.length === 1) {
          navigate(from);
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user.", {
          position: "top-center",
        });
      });
  };

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        All User
      </Typography>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : isMobile ? (
        <Grid container spacing={2}>
          {AllUser.map((singleUser, i) => (
            <Grid item xs={12} key={singleUser._id}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="body1">#{i + 1}</Typography>
                <Typography variant="body1">Name: {singleUser.name}</Typography>
                <Typography variant="body1">
                  Email: {singleUser.email}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {singleUser?.role !== "admin" ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleMakeAdmin(singleUser._id.toString())}
                      fullWidth
                    >
                      Make Admin
                    </Button>
                  ) : (
                    <Typography>Already Admin</Typography>
                  )}
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteUser(singleUser.uid)}
                    fullWidth
                  >
                    Delete
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>Delete User</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {AllUser.map((singleUser, i) => (
                <TableRow key={singleUser._id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{singleUser.name}</TableCell>
                  <TableCell>{singleUser.email}</TableCell>
                  <TableCell>
                    {singleUser?.role !== "admin" ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          handleMakeAdmin(singleUser._id.toString())
                        }
                      >
                        Make Admin
                      </Button>
                    ) : (
                      <Typography>Already Admin</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteUser(singleUser.uid)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <ToastContainer position="center"  />
    </Container>
  );
};

export default AllUser;
