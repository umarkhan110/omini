import { Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Fourzerofour from "../pages/ErrorPages/404";
import Fivehundred from "../pages/ErrorPages/500";
import FourzerofourAlt from "../pages/ErrorPages/404Alt";
import Offline from "../pages/ErrorPages/Offline";
import Signin from "../pages/Authentication/login";
import Users from "../pages/User";
import Blockchain from "../pages/Blockchain";
import SigninWithManager from "../pages/Authentication/loginWithManger";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/", element: <Navigate to="/dashboard" /> },
  { path: "*", element: <Navigate to="/dashboard" /> },
  { path: "/users", component: <Users /> },
  { path: "/blockchain", component: <Blockchain /> },
];

const publicRoutes = [
  // Authentication
  { path: "/login", component: <Signin /> },
  { path: "/login-team-manger", component: <SigninWithManager /> },

  // Error
  { path: "/error-404", component: <Fourzerofour /> },
  { path: "/error-500", component: <Fivehundred /> },
  { path: "/error-404-alt", component: <FourzerofourAlt /> },
  { path: "/error-offline", component: <Offline /> },
];

export { publicRoutes, authProtectedRoutes };
