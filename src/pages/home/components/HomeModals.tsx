import { useAttendanceStore } from "@/store/attendance/attendance";
import { getWeeklyAttendance } from "@/utils/attendance/attendance";
import AttendanceModal from "./modal/AttendanceModal";

const HomeModals = () => {
  const { showModal, setShowModal, attendanceData } = useAttendanceStore();

  if (!attendanceData) return null;

  return (
    <AttendanceModal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      onGoToCalendar={() => setShowModal(false)}
      count={attendanceData.streak}
      attendance={getWeeklyAttendance(attendanceData.streak)}
    />
  );
};

export default HomeModals;
