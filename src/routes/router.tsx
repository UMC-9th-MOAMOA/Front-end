import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/auth/login/Login";
import SignUpPage from "@/pages/auth/signup/SignUp";
import HomePage from "@/pages/home/Home";
import MyPage from "@/pages/my/My";
import SearchPage from "@/pages/search/Search";
import SettingsPage from "@/pages/settings/Settings";
import RootLayout from "../layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "search", element: <SearchPage /> },
      { path: "my", element: <MyPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
    ],
  },
]);

export default router;
