import { useNavigate } from "react-router-dom";
import { useAttendanceStore } from "@/store/attendance/attendance";
import { getWeeklyAttendance } from "@/utils/attendance/attendance";
import AttendanceModal from "./modal/AttendanceModal";

const HomeModals = () => {
  const navigate = useNavigate();
  const {
    showModal,
    setShowModal,
    attendanceData,
    onModalClosed,
    setOnModalClosed,
  } = useAttendanceStore();

  const handleClose = () => {
    setShowModal(false);
    if (onModalClosed) {
      onModalClosed();
      setOnModalClosed(null);
    }
  };

  if (!attendanceData) return null;

  return (
    <AttendanceModal
      isOpen={showModal}
      onClose={handleClose}
      onGoToCalendar={() => {
        handleClose();
        navigate("/mypage");
      }}
      count={attendanceData.streak}
      attendance={getWeeklyAttendance(attendanceData.streak)}
    />
  );
};

export default HomeModals;
