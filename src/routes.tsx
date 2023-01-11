import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/Layout";
import Details from "./pages/Details";
import ErrorPage from "./pages/Error";
import Home from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:productId",
        element: <Details />,
      },
    ],
  },
]);
