import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  CreateProduct,
  CreateUser,
  EditProduct,
  EditUser,
  HomeLayout,
  Login,
  Products,
  Profile,
  Register,
  Users,
} from "./pages";
import ProtectedRoute from "./components/ProtectedRoute";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <HomeLayout />,
        children: [
          {
            index: true,
            element: <Products />,
          },
          {
            path: "/products",
            element: <Products />,
          },
          {
            path: "/products/create-product",
            element: <CreateProduct />,
          },
          {
            path: "/products/:id",
            element: <EditProduct />,
          },
          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/users/:id",
            element: <EditUser />,
          },
          {
            path: "/users/create-user",
            element: <CreateUser />,
          },
          {
            path: "/orders",
            element: <Users />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],

      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
