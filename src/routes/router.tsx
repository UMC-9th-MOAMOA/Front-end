import { createBrowserRouter, type RouteObject } from "react-router-dom";
import LoginPage from "@/pages/auth/login/Login";
import ResetPassword from "@/pages/auth/password/Password";
import SignUpPage from "@/pages/auth/signup/SignUp";
import Terms from "@/pages/auth/signup/Terms";
import HomePage from "@/pages/home/Home";
import MissionEntry from "@/pages/mission/entry/MissionEntry";
import QuizPage from "@/pages/mission/quiz/QuizPage";
import MyPage from "@/pages/mypage/MyPage";
import Onboarding from "@/pages/onboarding/Onboarding";
import Pocket from "@/pages/pocket/Pocket";
import Search from "@/pages/search/Search";
import AccountInfoPage from "@/pages/settings/AccountInfoPage";
import FaqPage from "@/pages/settings/components/FaqPage";
import Interests from "@/pages/settings/components/Interests";
import InquiryConsentPage from "@/pages/settings/components/inquiry/InquiryConsentPage";
import InquiryDetailPage from "@/pages/settings/components/inquiry/InquiryDetailPage";
import InquiryPage from "@/pages/settings/components/inquiry/InquiryPage";
import TargetMissionCount from "@/pages/settings/components/TargetMissionCount";
import PasswordChangePage from "@/pages/settings/PasswordChangePage";
import SettingsPage from "@/pages/settings/SettingsPage";
import TodayMission from "@/pages/today-mission/TodayMission";
import RootLayout from "../layouts/RootLayout";

export interface RouteHandle {
  bgColor?:
    | "bg-white"
    | "bg-moamoa-50"
    | "bg-gray-100"
    | "bg-gray-50"
    | "bg-setting";
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
        path: "password",
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
        element: <Onboarding />,
        handle: { bgColor: "bg-gray-50", hideBottomNav: true },
      },
      {
        path: "mission/:missionId",
        element: <MissionEntry />,
        handle: { bgColor: "bg-gray-100", hideBottomNav: true },
      },
      {
        path: "mission/quiz/:missionId",
        element: <QuizPage />,
        handle: { bgColor: "bg-gray-100", hideBottomNav: true },
      },
      {
        path: "search",
        element: <Search />,
        handle: { bgColor: "bg-gray-50" },
      },
      {
        path: "pocket",
        element: <Pocket />,
        handle: { bgColor: "bg-gray-50", hideBottomNav: true },
      },
      {
        path: "today-mission",
        element: <TodayMission />,
        handle: { bgColor: "bg-gray-50", hideBottomNav: true },
      },
      {
        path: "mypage",
        element: <MyPage />,
        handle: { bgColor: "bg-gray-100" },
      },
      {
        path: "settings",
        element: <SettingsPage />,
        handle: { bgColor: "bg-setting" },
      },
      {
        path: "/settings/interests",
        element: <Interests />,
        handle: { hideBottomNav: true },
      },
      {
        path: "/settings/target-mission-count",
        element: <TargetMissionCount />,
        handle: { hideBottomNav: true },
      },
      {
        path: "/settings/account-info",
        element: <AccountInfoPage />,
        handle: { hideBottomNav: true },
      },
      {
        path: "/settings/password-change",
        element: <PasswordChangePage />,
        handle: { hideBottomNav: true },
      },
      {
        path: "/settings/faq",
        element: <FaqPage />,
        handle: { hideBottomNav: true },
      },
      {
        path: "/settings/inquiry",
        element: <InquiryPage />,
        handle: { hideBottomNav: true },
      },
      {
        path: "/settings/inquiry/consent",
        element: <InquiryConsentPage />,
        handle: { hideBottomNav: true },
      },
      {
        path: "/settings/inquiry/:inquiryId",
        element: <InquiryDetailPage />,
        handle: { hideBottomNav: true },
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
