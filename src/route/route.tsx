import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductPage from "../pages/ProductPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import EditProductPage from "../pages/EditProductPage";
import LoginPage from "../pages/LoginPage";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/products",
    element: <ProductPage />,
  },
  {
    path: "/products/:id",
    element: <ProductDetailPage />,
  },
  {
    path: "/products/:id/edit",
    element: <EditProductPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default route;
