import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LayoutMaster from "./components/LayoutMaster";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import OnlyCustomer from "./protectedRoutes/OnlyCustomer";
import OnlyKitchen from "./protectedRoutes/OnlyKitchen";
import OnlyManager from "./protectedRoutes/OnlyManager";
import OrderPage from "./pages/OrderPage";
import KitchenPage from "./pages/KitchenPage";
import CreateMenuPage from "./pages/CreateMenuPage";
import MenusPage from "./pages/MenusPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutMaster />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/order",
        element: <OnlyCustomer element={<OrderPage />} />,
      },
      {
        path: "/kitchen",
        element: <OnlyKitchen element={<KitchenPage />} />,
      },
      {
        path: "/create-menu",
        element: <OnlyManager element={<CreateMenuPage />} />,
      },
      {
        path: "/menus",
        element: <OnlyManager element={<MenusPage />} />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;