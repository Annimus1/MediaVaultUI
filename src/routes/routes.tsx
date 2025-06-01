import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { createBrowserRouter } from "react-router";

const routes = createBrowserRouter([
  {path: "/", element: <Home />},
  {path: "/login", element: <Login />},
  {path: "/register", element: <Register />}
]);

export default routes;