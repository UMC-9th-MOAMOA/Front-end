import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useAttendanceCheck } from "./hooks/attendance/useAttendanceCheck";
import router from "./routes/router";

function App() {
  const { handleCheckAttendance } = useAttendanceCheck();

  useEffect(() => {
    handleCheckAttendance();
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        handleCheckAttendance();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
