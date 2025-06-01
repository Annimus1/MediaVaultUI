import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { createBrowserRouter } from "react-router";
import RootLayout from "./RootLayout";
import ProtectedRoute from "./ProtectedRoutes";
import PageNotFound from "../pages/404";

const routes = createBrowserRouter([{
  path: "/",
        element: <RootLayout />,
        errorElement: <PageNotFound/>, 
        children:[
          {path: "/", index:true, element: <ProtectedRoute><Home/></ProtectedRoute>},
          {path: "/login", element: <Login />},
          {path: "/register", element: <Register />}
        ]
      }
    ]);

export default routes;