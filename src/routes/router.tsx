import { createBrowserRouter, type RouteObject } from "react-router-dom";
import FindId from "@/pages/auth/find-id/FindId";
import LoginPage from "@/pages/auth/login/Login";
import ResetPassword from "@/pages/auth/reset-password/ResetPassword";
import SignUpPage from "@/pages/auth/signup/SignUp";
import HomePage from "@/pages/home/Home";
import Search from "@/pages/search/Search";
import AccountSettingsPage from "@/pages/settings/AccountSettingsPage";
import Interests from "@/pages/settings/components/Interests";
import TargetMissionCount from "@/pages/settings/components/TargetMissionCount";
import SettingsPage from "@/pages/settings/SettingsPage";
import RootLayout from "../layouts/RootLayout";

export interface RouteHandle {
  bgColor?: "bg-white" | "bg-moamoa-50" | "bg-gray-100" | "bg-gray-50";
  hideBottomNav?: boolean;
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
        handle: { bgColor: "bg-white", hideBottomNav: true },
      },
      {
        path: "signup",
        element: <SignUpPage />,
        handle: { bgColor: "bg-white", hideBottomNav: true },
      },
      {
        path: "find-id",
        element: <FindId />,
        handle: { bgColor: "bg-white", hideBottomNav: true },
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
        handle: { bgColor: "bg-white", hideBottomNav: true },
      },
      {
        path: "onboarding",
        element: <div>온보딩</div>,
        handle: { bgColor: "bg-gray-50", hideBottomNav: true },
      },
      {
        path: "mission",
        element: <div>미션</div>,
        handle: { bgColor: "bg-gray-50", hideBottomNav: true },
      },
      {
        path: "search",
        element: <Search />,
        handle: { bgColor: "bg-gray-50" },
      },
      {
        path: "mypage",
        element: <div>마이페이지</div>,
        handle: { bgColor: "bg-gray-100" },
      },
      {
        path: "settings",
        element: <SettingsPage />,
        handle: { bgColor: "bg-gray-50" },
      },
      {
        path: "/settings/interests",
        element: <Interests />,
      },
      {
        path: "/settings/target-mission-count",
        element: <TargetMissionCount />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
