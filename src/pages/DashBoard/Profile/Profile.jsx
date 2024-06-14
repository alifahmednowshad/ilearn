
import {
  Card,
  Avatar,
  Typography,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import UseAuth from "../../../hooks/UseAuth";

const StyledCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(10),
  padding: theme.spacing(4),
  boxShadow: theme.shadows[4],
  borderRadius: theme.shape.borderRadius,
  background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
  color: theme.palette.common.white,
}));

const Profile = () => {
  const { user } = UseAuth();

  if (!user) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <StyledCard>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            src={user.photoURL}
            alt="Profile"
            sx={{
              width: 128,
              height: 128,
              mb: 2,
              boxShadow: (theme) => theme.shadows[4],
              border: "4px solid white",
            }}
          >
            {!user.photoURL && (
              <Typography variant="h5" color="inherit">
                No Photo
              </Typography>
            )}
          </Avatar>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
            }}
          >
            {user.displayName || "N/A"}
          </Typography>
          <Typography
            variant="body1"
            color="inherit"
            gutterBottom
            sx={{ opacity: 0.8 }}
          >
            {user.email}
          </Typography>
          <Box
            width="100%"
            mt={2}
            pt={2}
            borderTop={1}
            borderColor="rgba(255, 255, 255, 0.5)"
          >
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                UID:
              </Typography>
              <Typography variant="body2">{user.uid}</Typography>
            </Box>
          </Box>
        </Box>
      </StyledCard>
    </Container>
  );
};

export default Profile;
