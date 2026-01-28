import { useNavigate } from "react-router-dom";
import { Button } from "@/components/common/button/Button";
import AttendanceCard from "./attendance/AttendanceCard";
import SpecialAttendanceCard from "./attendance/SpecialAttendanceCard";

interface WeeklyAttendanceSectionProps {
  currentDay: number;
  attendance: boolean[];
}

export default function WeeklyAttendanceSection({
  currentDay,
  attendance,
}: WeeklyAttendanceSectionProps) {
  const navigate = useNavigate();

  return (
    <div className="mt-20 rounded-xl bg-gray-100 px-30 py-20">
      <div className="flex items-center justify-center gap-18">
        <span className="body-1 text-black">이번주 출석 현황</span>
        <span className="body-1 text-gray-600">{currentDay}/7</span>
      </div>

      <div className="mt-16 grid grid-cols-3 gap-12">
        {attendance.slice(0, 6).map((isActive, index) => (
          <AttendanceCard
            key={`day-${index + 1}`}
            day={index + 1}
            isActive={isActive}
          />
        ))}
      </div>

      <div className="mt-12">
        <SpecialAttendanceCard isActive={attendance[6]} />
      </div>

      <Button
        onClick={() => navigate("/calendar")}
        className="body-2 mt-20 w-full rounded-lg bg-moamoa-50 px-20 py-12 text-moamoa-700"
      >
        캘린더 보러가기
      </Button>
    </div>
  );
}
