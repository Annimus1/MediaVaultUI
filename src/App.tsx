import { RouterProvider } from "react-router";
import AppRoutes from "./routes/routes";

function App() {
  //>
  return (
    <RouterProvider
      router={AppRoutes}
    ></RouterProvider>
  )
}

export default App
