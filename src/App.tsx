import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { storage } from "./apis/storage";
import { useAttendanceCheck } from "./hooks/attendance/useAttendanceCheck";
import { useGoalPopupCheck } from "./hooks/goal/useGoalPopupCheck";
import DailyGoalFailure from "./pages/mission/goal/DailyGoalFailure";
import WeeklyGoalFailure from "./pages/mission/goal/WeeklyGoalFailure";
import router from "./routes/router";

function App() {
  const { handleCheckAttendance } = useAttendanceCheck();
  const {
    currentPopup,
    shouldNavigateToSearch,
    handleCheckGoalPopups,
    handleClosePopup,
    handleMissionExplore,
    resetNavigateToSearch,
  } = useGoalPopupCheck();

  useEffect(() => {
    const token = storage.getToken();
    if (!token) return;

    handleCheckAttendance();
    handleCheckGoalPopups();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const currentToken = storage.getToken();
        if (currentToken) {
          handleCheckAttendance();
          handleCheckGoalPopups();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (shouldNavigateToSearch) {
      router.navigate("/search");
      resetNavigateToSearch();
    }
  }, [shouldNavigateToSearch, resetNavigateToSearch]);

  return (
    <>
      <RouterProvider router={router} />

      {currentPopup && (
        <div className="fixed inset-0 z-50 bg-white px-layout-side">
          {currentPopup.goalType === "DAILY" && (
            <DailyGoalFailure
              completedMissions={currentPopup.achievedCount}
              totalMissions={currentPopup.targetCount}
              onClose={handleClosePopup}
              onMissionExplore={handleMissionExplore}
            />
          )}
          {currentPopup.goalType === "WEEKLY" && (
            <WeeklyGoalFailure
              completedMissions={currentPopup.achievedCount}
              totalMissions={currentPopup.targetCount}
              onClose={handleClosePopup}
            />
          )}
        </div>
      )}
    </>
  );
}

export default App;
