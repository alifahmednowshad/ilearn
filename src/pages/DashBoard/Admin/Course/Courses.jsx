import { Box, Container, Typography } from "@mui/material";
import ManageCourse from "../../../../components/Dashboard/Course/ManageCourse";


const Courses = () => {
    return (
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Manage Course
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            fontWeight="bold"
            mb={5}
          >
            Here you manage your course
          </Typography>
          <ManageCourse />
        </Box>
      </Container>
    );
};

export default Courses;