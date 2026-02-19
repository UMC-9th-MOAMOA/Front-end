import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import GlobalModals from "./components/GlobalModals";
import GoalPopups from "./components/GoalPopups";
import { RunChecksContext } from "./context/RunChecksContext";
import { useAttendanceCheck } from "./hooks/attendance/useAttendanceCheck";
import { useGoalPopupCheck } from "./hooks/goal/useGoalPopupCheck";
import { useAppInitializer } from "./hooks/useAppInitializer";
import router from "./routes/router";
import { useSettingsStore } from "./store/settings";

function App() {
  const { handleCheckAttendance } = useAttendanceCheck();
  const {
    currentPopup,
    shouldNavigateToSearch,
    handleCheckGoalPopups,
    handleClosePopup,
    handleMissionExplore,
    resetNavigateToSearch,
    resetGoalPopups,
  } = useGoalPopupCheck();
  const showLogoutToast = useSettingsStore((state) => state.showLogoutToast);
  const setShowLogoutToast = useSettingsStore(
    (state) => state.setShowLogoutToast
  );

  const { runChecks } = useAppInitializer({
    onCheckAttendance: handleCheckAttendance,
    onCheckGoalPopups: handleCheckGoalPopups,
    onReset: resetGoalPopups,
  });

  useEffect(() => {
    if (shouldNavigateToSearch) {
      router.navigate("/search");
      resetNavigateToSearch();
    }
  }, [shouldNavigateToSearch, resetNavigateToSearch]);

  useEffect(() => {
    if (showLogoutToast) {
      const timer = setTimeout(() => {
        setShowLogoutToast(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showLogoutToast, setShowLogoutToast]);

  return (
    <RunChecksContext.Provider value={runChecks}>
      <RouterProvider router={router} />
      <GoalPopups
        currentPopup={currentPopup}
        onClose={handleClosePopup}
        onMissionExplore={handleMissionExplore}
      />
      <GlobalModals />
    </RunChecksContext.Provider>
  );
}

export default App;
