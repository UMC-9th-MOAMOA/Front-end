import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { storage } from "./apis/storage";
import { useAttendanceCheck } from "./hooks/attendance/useAttendanceCheck";
import router from "./routes/router";

function App() {
  const { handleCheckAttendance } = useAttendanceCheck();

  useEffect(() => {
    const token = storage.getToken();
    if (!token) return;

    handleCheckAttendance();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const currentToken = storage.getToken();
        if (currentToken) {
          handleCheckAttendance();
        }
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
