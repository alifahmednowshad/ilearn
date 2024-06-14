import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import MainLayout from "../layouts/MainLayout";
import Register from "../pages/Register";
import LogIn from "../pages/LogIn";
import DashboardHome from "../pages/DashBoard/DashboardHome";
import Profile from "../pages/DashBoard/Profile/Profile";
import DashboardLayout from "../layouts/DashboardLayout";
import Courses from "../pages/DashBoard/Course/Courses";
import PrivateRoute from "./PrivateRoute";
import AddCourse from "../pages/DashBoard/Course/AddCourse";



const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    errorElement: <ErrorPage />,
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "addcourse",
        element: <AddCourse/>,
      },
    ],
  },
]);

export default Routes;