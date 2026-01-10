import { createBrowserRouter } from "react-router-dom";
import FindId from "@/pages/auth/find-id/FindId";
import LoginPage from "@/pages/auth/login/Login";
import ResetPassword from "@/pages/auth/reset-password/ResetPassword";
import SignUpPage from "@/pages/auth/signup/SignUp";
import RootLayout from "../layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "find-id", element: <FindId /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },
]);

export default router;
