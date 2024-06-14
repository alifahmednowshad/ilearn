import { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import CourseCard from "./CourseCard";

const ManageCourse = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/course")
      .then((res) => res.json())
      .then((data) => setProducts(data.reverse()));
  }, []);

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product._id !== id));
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <CourseCard
              product={product}
              onDelete={handleDeleteProduct}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ManageCourse;
