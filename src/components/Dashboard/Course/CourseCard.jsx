/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

const CourseCard = ({ product, onDelete }) => {
  const token = localStorage.getItem("token");
  const { _id, title, price, category, instructor, image } = product;
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/course/${_id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      onDelete(_id);
      enqueueSnackbar("Product Deleted", { variant: "success" });
    } catch (error) {
      console.error("Error deleting product:", error);
      enqueueSnackbar("Error deleting product", { variant: "error" });
    }
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia component="img" height="250" image={image} alt={category} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Instructor: {instructor}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Price: ${price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        <Button
          component={Link}
          to={`update/${_id}`}
          variant="contained"
          color="warning"
          startIcon={<EditIcon />}
          sx={{ ml: 1 }}
        >
          Update
        </Button>
        <Button
          component={Link}
          to={`details/${_id}`}
          variant="contained"
          color="success"
          startIcon={<VisibilityIcon />}
          sx={{ ml: 1 }}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
