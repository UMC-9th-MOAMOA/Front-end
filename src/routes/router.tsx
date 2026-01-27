import { createBrowserRouter, type RouteObject } from "react-router-dom";
import FindId from "@/pages/auth/find-id/FindId";
import LoginPage from "@/pages/auth/login/Login";
import ResetPassword from "@/pages/auth/reset-password/ResetPassword";
import SignUpPage from "@/pages/auth/signup/SignUp";
import HomePage from "@/pages/home/Home";
import Search from "@/pages/search/Search";
import { AuthProvider } from "@/auth/AuthProvider";
import { RequireAuth, RequireGuest } from "@/auth/AuthGuards";
import RootLayout from "../layouts/RootLayout";

export interface RouteHandle {
  bgColor?: "bg-white" | "bg-moamoa-50" | "bg-gray-100" | "bg-gray-50";
  hideBottomNav?: boolean;
}

const routes: (RouteObject & { handle?: RouteHandle })[] = [
  {
    path: "/",
    element: (
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: "",
        element: (
          <RequireAuth redirectTo="/login">
            <HomePage />
          </RequireAuth>
        ),
        handle: { bgColor: "bg-moamoa-50" },
      },
      {
        path: "login",
        element: (
          <RequireGuest redirectTo="/">
            <LoginPage />
          </RequireGuest>
        ),
        handle: { bgColor: "bg-white", hideBottomNav: true },
      },
      {
        path: "signup",
        element: (
          <RequireGuest redirectTo="/">
            <SignUpPage />
          </RequireGuest>
        ),
        handle: { bgColor: "bg-white", hideBottomNav: true },
      },
      {
        path: "find-id",
        element: (
          <RequireGuest redirectTo="/">
            <FindId />
          </RequireGuest>
        ),
        handle: { bgColor: "bg-white", hideBottomNav: true },
      },
      {
        path: "reset-password",
        element: (
          <RequireGuest redirectTo="/">
            <ResetPassword />
          </RequireGuest>
        ),
        handle: { bgColor: "bg-white", hideBottomNav: true },
      },
      {
        path: "onboarding",
        element: (
          <RequireAuth redirectTo="/login">
            <div>온보딩</div>
          </RequireAuth>
        ),
        handle: { bgColor: "bg-gray-50", hideBottomNav: true },
      },
      {
        path: "mission",
        element: (
          <RequireAuth redirectTo="/login">
            <div>미션</div>
          </RequireAuth>
        ),
        handle: { bgColor: "bg-gray-50", hideBottomNav: true },
      },
      {
        path: "search",
        element: (
          <RequireAuth redirectTo="/login">
            <Search />
          </RequireAuth>
        ),
        handle: { bgColor: "bg-gray-50" },
      },
      {
        path: "mypage",
        element: (
          <RequireAuth redirectTo="/login">
            <div>마이페이지</div>
          </RequireAuth>
        ),
        handle: { bgColor: "bg-gray-100" },
      },
      {
        path: "settings",
        element: (
          <RequireAuth redirectTo="/login">
            <div>설정</div>
          </RequireAuth>
        ),
        handle: { bgColor: "bg-gray-50" },
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
