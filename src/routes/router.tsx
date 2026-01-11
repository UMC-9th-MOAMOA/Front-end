import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/auth/login/Login";
import SignUpPage from "@/pages/auth/signup/SignUp";
import AccountSettingsPage from "@/pages/settings/AccountSettingsPage";
import SettingsPage from "@/pages/settings/SettingsPage";
import RootLayout from "../layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "settings/account", element: <AccountSettingsPage /> },
    ],
  },
]);

export default router;
