import { Button } from "@/components/common/button/Button";
import AttendanceCard from "@/pages/pocket/components/attendance/AttendanceCard";
import SpecialAttendanceCard from "@/pages/pocket/components/attendance/SpecialAttendanceCard";
import Modal from "./Modal";

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToCalendar: () => void;
  count: number;
  attendance: boolean[];
}

export default function AttendanceModal({
  isOpen,
  onClose,
  onGoToCalendar,
  count,
  attendance,
}: AttendanceModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center">
        <h2 className="heading-2 mt-14 text-black">출석체크 완료!</h2>

        <p className="body-1 mt-8 text-center text-black">
          벌써 <span className="heading-3 text-moamoa-400">{count}번째</span>{" "}
          만남이네요!
          <br />
          오늘도 반가워요
        </p>

        <div className="mt-27 grid w-full grid-cols-3 gap-12">
          {attendance.slice(0, 6).map((isActive, index) => (
            <AttendanceCard
              key={`day-${index + 1}`}
              day={index + 1}
              isActive={isActive}
            />
          ))}
        </div>

        <div className="mt-12 w-full">
          <SpecialAttendanceCard isActive={attendance[6]} />
        </div>

        <div className="mt-29 flex w-full gap-12">
          <Button
            onClick={onClose}
            className="body-2 rounded-lg bg-moamoa-50 px-30 py-12 text-moamoa-600"
          >
            닫기
          </Button>
          <Button
            onClick={onGoToCalendar}
            className="body-2 rounded-lg bg-moamoa-300 px-30 py-12 text-white"
          >
            캘린더 보러가기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
