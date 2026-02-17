import { useEffect, useRef } from "react";
import { storage } from "@/apis/storage";
import router from "@/routes/router";
import { useAttendanceStore } from "@/store/attendance/attendance";

interface UseAppInitializerProps {
  onCheckAttendance: () => Promise<boolean>;
  onCheckGoalPopups: () => void;
}

export const useAppInitializer = ({
  onCheckAttendance,
  onCheckGoalPopups,
}: UseAppInitializerProps) => {
  const callbacksRef = useRef({ onCheckAttendance, onCheckGoalPopups });
  callbacksRef.current = { onCheckAttendance, onCheckGoalPopups };

  const prevPathnameRef = useRef(window.location.pathname);
  const hasInitRef = useRef(false);

  const runGoalPopupsIfNeeded = () => {
    const store = useAttendanceStore.getState();
    if (!store.onModalClosed) {
      callbacksRef.current.onCheckGoalPopups();
    }
  };

  const runChecks = async () => {
    const token = storage.getToken();
    if (!token) return;

    const isOnboardingPage = window.location.pathname.startsWith("/onboarding");
    if (isOnboardingPage) return;

    try {
      const modalShown = await callbacksRef.current.onCheckAttendance();

      if (modalShown) {
        useAttendanceStore
          .getState()
          .setOnModalClosed(() => callbacksRef.current.onCheckGoalPopups());
      } else {
        runGoalPopupsIfNeeded();
      }
    } catch (error) {
      console.error("출석 체크 실패:", error);
      runGoalPopupsIfNeeded();
    }
  };

  if (!hasInitRef.current) {
    hasInitRef.current = true;
    runChecks();
  }

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        runChecks();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const unsubscribe = router.subscribe((state) => {
      const pathname = state.location.pathname;
      const prevPathname = prevPathnameRef.current;
      if (
        prevPathname.startsWith("/onboarding") &&
        !pathname.startsWith("/onboarding")
      ) {
        runChecks();
      }

      prevPathnameRef.current = pathname;
    });

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      unsubscribe();
    };
  }, []);
};
