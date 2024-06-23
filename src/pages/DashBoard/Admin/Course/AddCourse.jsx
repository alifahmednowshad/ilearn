import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import { useForm } from "react-hook-form";

const AddCourse = () => {
  const token = localStorage.getItem("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/courses", data, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Product added successfully");
      reset(); // Reset form fields
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product");
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Add a Product
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              fullWidth
              {...register("title", { required: "Title is required" })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price"
              type="number"
              fullWidth
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
                validate: (value) =>
                  value > 0 || "Price must be a positive number",
              })}
              className="appearance-none"
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              {...register("description", {
                required: "Description is required",
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Image URL"
              fullWidth
              {...register("image", { required: "Image URL is required" })}
              error={!!errors.image}
              helperText={errors.image?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Instructor"
              fullWidth
              {...register("instructor", {
                required: "Instructor is required",
              })}
              error={!!errors.instructor}
              helperText={errors.instructor?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Category"
              fullWidth
              {...register("category", { required: "Category is required" })}
              error={!!errors.category}
              helperText={errors.category?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Add Product
            </Button>
          </Grid>
        </Grid>
      </form>
      <Toaster />
    </Container>
  );
};

export default AddCourse;
