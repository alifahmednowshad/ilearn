import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import MainLayout from "../layouts/MainLayout";
import Register from "../pages/Register";
import DashboardHome from "../pages/DashBoard/DashboardHome";
import Profile from "../pages/DashBoard/Profile/Profile";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import LogIn from "../pages/LogIn";
import Courses from "../pages/DashBoard/Admin/Course/Courses";
import AddCourse from "../pages/DashBoard/Admin/Course/AddCourse";
import AllUser from "../pages/DashBoard/Admin/AllUser/AllUser";
import AdminRoute from "./AdminRoute";

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
        path: "all-user",
        element: (
          <AdminRoute>
            <AllUser />
          </AdminRoute>
        ),
      },
      {
        path: "courses",
        element: (
          <AdminRoute>
            <Courses />
          </AdminRoute>
        ),
      },
      {
        path: "addcourse",
        element: (
          <AdminRoute>
            <AddCourse />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default Routes;
