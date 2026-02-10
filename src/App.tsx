import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import GlobalModals from "./components/GlobalModals";
import GoalPopups from "./components/GoalPopups";
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
  } = useGoalPopupCheck();
  const showLogoutToast = useSettingsStore((state) => state.showLogoutToast);
  const setShowLogoutToast = useSettingsStore(
    (state) => state.setShowLogoutToast
  );

  useAppInitializer({
    onCheckAttendance: handleCheckAttendance,
    onCheckGoalPopups: handleCheckGoalPopups,
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
    <>
      <RouterProvider router={router} />
      <GoalPopups
        currentPopup={currentPopup}
        onClose={handleClosePopup}
        onMissionExplore={handleMissionExplore}
      />
      <GlobalModals />
    </>
  );
}

export default App;
