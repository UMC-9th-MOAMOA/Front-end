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

    onCheckAttendance();
    onCheckGoalPopups();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const currentToken = storage.getToken();
        if (currentToken) {
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
