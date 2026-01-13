import { createBrowserRouter, type RouteObject } from "react-router-dom";
import FindId from "@/pages/auth/find-id/FindId";
import LoginPage from "@/pages/auth/login/Login";
import ResetPassword from "@/pages/auth/reset-password/ResetPassword";
import SignUpPage from "@/pages/auth/signup/SignUp";
import HomePage from "@/pages/home/Home";
import AccountSettingsPage from "@/pages/settings/AccountSettingsPage";
import SettingsPage from "@/pages/settings/SettingsPage";
import RootLayout from "../layouts/RootLayout";

export interface RouteHandle {
  bgColor?: "bg-white" | "bg-moamoa-50" | "bg-gray-100" | "bg-gray-50";
}

const routes: (RouteObject & { handle?: RouteHandle })[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <HomePage />, handle: { bgColor: "bg-moamoa-50" } },
      {
        path: "login",
        element: <LoginPage />,
        handle: { bgColor: "bg-white" },
      },
      {
        path: "signup",
        element: <SignUpPage />,
        handle: { bgColor: "bg-white" },
      },
      {
        path: "find-id",
        element: <FindId />,
        handle: { bgColor: "bg-white" },
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
        handle: { bgColor: "bg-white" },
      },
      {
        path: "onboarding",
        element: <div>온보딩</div>,
        handle: { bgColor: "bg-gray-50" },
      },
      {
        path: "mission",
        element: <div>미션</div>,
        handle: { bgColor: "bg-gray-50" },
      },
      {
        path: "search",
        element: <div>검색</div>,
        handle: { bgColor: "bg-gray-50" },
      },
      {
        path: "mypage",
        element: <div>마이페이지</div>,
        handle: { bgColor: "bg-gray-100" },
      },
      {
        path: "settings",
        element: <div>설정</div>,
        handle: { bgColor: "bg-gray-50" },
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
