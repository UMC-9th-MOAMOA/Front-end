import { useEffect, useRef } from "react";
import { storage } from "@/apis/storage";
import router from "@/routes/router";

interface UseAppInitializerProps {
  onCheckAttendance: () => void;
  onCheckGoalPopups: () => void;
}

export const useAppInitializer = ({
  onCheckAttendance,
  onCheckGoalPopups,
}: UseAppInitializerProps) => {
  const callbacksRef = useRef({ onCheckAttendance, onCheckGoalPopups });
  callbacksRef.current = { onCheckAttendance, onCheckGoalPopups };

  useEffect(() => {
    const runChecks = () => {
      const token = storage.getToken();
      if (!token) return;

      const isOnboardingPage =
        window.location.pathname.startsWith("/onboarding");
      if (isOnboardingPage) return;

      callbacksRef.current.onCheckAttendance();
      callbacksRef.current.onCheckGoalPopups();
    };

    runChecks();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        runChecks();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 온보딩 → 홈 등 SPA 네비게이션 시 체크 재실행
    const unsubscribe = router.subscribe((state) => {
      const pathname = state.location.pathname;
      if (!pathname.startsWith("/onboarding")) {
        runChecks();
      }
    });

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      unsubscribe();
    };
  }, []);
};