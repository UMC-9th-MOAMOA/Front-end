import { useEffect } from "react";
import { storage } from "@/apis/storage";

interface UseAppInitializerProps {
  onCheckAttendance: () => void;
  onCheckGoalPopups: () => void;
}

export const useAppInitializer = ({
  onCheckAttendance,
  onCheckGoalPopups,
}: UseAppInitializerProps) => {
  useEffect(() => {
    const token = storage.getToken();
    if (!token) return;

    const isOnboardingPage =
      window.location.pathname.startsWith("/onboarding");
    if (isOnboardingPage) return;

    onCheckAttendance();
    onCheckGoalPopups();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const currentToken = storage.getToken();
        const currentIsOnboarding =
          window.location.pathname.startsWith("/onboarding");

        if (currentToken && !currentIsOnboarding) {
          onCheckAttendance();
          onCheckGoalPopups();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
};
