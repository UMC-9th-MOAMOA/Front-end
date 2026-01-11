import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/auth/login/Login";
import SignUpPage from "@/pages/auth/signup/SignUp";
import MyPage from "@/pages/mypage/MyPage";
import RootLayout from "../layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "mypage", element: <MyPage /> },
    ],
  },
]);

export default router;
