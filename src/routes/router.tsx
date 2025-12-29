import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/auth/login/Login";
import SignUpPage from "@/pages/auth/signup/SignUp";
import RootLayout from "../layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
    ],
  },
]);

export default router;
