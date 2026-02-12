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

  useEffect(() => {
    const runChecks = async () => {
      const token = storage.getToken();
      if (!token) return;

      const isOnboardingPage =
        window.location.pathname.startsWith("/onboarding");
      if (isOnboardingPage) return;

      const modalShown =
        await callbacksRef.current.onCheckAttendance();

      if (modalShown) {
        useAttendanceStore
          .getState()
          .setOnModalClosed(() => callbacksRef.current.onCheckGoalPopups());
      } else {
        callbacksRef.current.onCheckGoalPopups();
      }
    };

    runChecks();

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