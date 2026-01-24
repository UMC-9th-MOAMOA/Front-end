import { createBrowserRouter, type RouteObject } from "react-router-dom";
import FindId from "@/pages/auth/find-id/FindId";
import LoginPage from "@/pages/auth/login/Login";
import ResetPassword from "@/pages/auth/reset-password/ResetPassword";
import SignUpPage from "@/pages/auth/signup/SignUp";
import Terms from "@/pages/auth/signup/Terms";
import HomePage from "@/pages/home/Home";
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
        path: "terms",
        element: <Terms />,
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
