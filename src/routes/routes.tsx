import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { createBrowserRouter } from "react-router";
import RootLayout from "./RootLayout";
import ProtectedRoute from "./ProtectedRoutes";
import PageNotFound from "../pages/404";
import AddMedia from "../pages/AddMedia";

const routes = createBrowserRouter([{
  path: "/",
        element: <RootLayout />,
        errorElement: <PageNotFound/>, 
        children:[
          {path: "/", index:true, element: <ProtectedRoute><Home/></ProtectedRoute>},
          {path: "/add", element: <ProtectedRoute><AddMedia/></ProtectedRoute>},
          {path: "/login", element: <Login />},
          {path: "/register", element: <Register />}
        ]
      }
    ]);

export default routes;