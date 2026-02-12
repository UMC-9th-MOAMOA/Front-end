import { useAttendanceStore } from "@/store/attendance/attendance";
import { getWeeklyAttendance } from "@/utils/attendance/attendance";
import AttendanceModal from "./modal/AttendanceModal";

const HomeModals = () => {
  const { showModal, setShowModal, attendanceData, onModalClosed, setOnModalClosed } = useAttendanceStore();

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
      onGoToCalendar={handleClose}
      count={attendanceData.streak}
      attendance={getWeeklyAttendance(attendanceData.streak)}
    />
  );
};

export default HomeModals;
