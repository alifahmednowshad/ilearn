
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const ErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h1" component="h1" align="center" gutterBottom>
        404
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body2" align="center" gutterBottom>
        You are on: {location.pathname}
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        mt={2}
      >
        <Grid item>
          <Button variant="contained" onClick={handleNavigateBack}>
            Go Back
          </Button>
        </Grid>
        <Grid item>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Go to Home
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ErrorPage;
