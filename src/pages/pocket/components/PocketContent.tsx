import { useAttendanceStore } from "@/store/attendance/attendance";
import { getWeeklyAttendance } from "@/utils/attendance/attendance";
import { cn } from "@/utils/cn/cn";
import { usePocket } from "../hooks/useQuery/usePocket";
import AcornSection from "./AcornSection";
import TimeCard from "./TimeCard";
import WeeklyAttendanceSection from "./WeeklyAttendanceSection";
import WeeklyGoalSection from "./WeeklyGoalSection";

export default function PocketContent() {
  const { data } = usePocket();
  const { attendanceData } = useAttendanceStore();

  const hasGoal = data.goalProgress !== null;

  return (
    <>
      <div className="mt-43 flex gap-18">
        <TimeCard
          title="오늘"
          name={data.name}
          totalTime={data.todayMissionMinutes}
        />
        <TimeCard
          title="이번주"
          name={data.name}
          totalTime={data.thisWeekMissionMinutes}
        />
      </div>

      <div className="-mx-layout-side mt-32 h-4 bg-gray-100" />

      <AcornSection acornCount={data.walletPoint} />

      {attendanceData && (
        <div className={cn(!hasGoal && "-mb-59")}>
          <WeeklyAttendanceSection
            currentDay={((attendanceData.streak - 1) % 7) + 1}
            attendance={getWeeklyAttendance(attendanceData.streak)}
          />
        </div>
      )}

      {data.goalProgress && (
        <div className="mt-20 -mb-59">
          <WeeklyGoalSection
            weekData={data.goalProgress.thisWeekDailyMissionCounts}
            dailyGoal={data.goalProgress.dailyGoal}
            totalGoal={data.goalProgress.dailyGoal * 7}
            completed={data.goalProgress.thisWeekTotalMissionCount}
            lastWeekGap={
              data.goalProgress.thisWeekTotalMissionCount -
              data.goalProgress.lastWeekTotalMissionCount
            }
          />
        </div>
      )}
    </>
  );
}
