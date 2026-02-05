import { useState } from "react";
import Header from "@/components/common/header/Header";
import { useAttendanceStore } from "@/store/attendance/attendance";
import { getWeeklyAttendance } from "@/utils/attendance/attendance";
import { cn } from "@/utils/cn/cn";
import AcornSection from "./components/AcornSection";
import TimeCard from "./components/TimeCard";
import WeeklyAttendanceSection from "./components/WeeklyAttendanceSection";
import WeeklyGoalSection from "./components/WeeklyGoalSection";
import { MOCK_POCKET_DATA } from "./mock/pocketData";

export default function PocketView() {
  const [userData] = useState(MOCK_POCKET_DATA);
  const { attendanceData } = useAttendanceStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50 -mx-layout-side bg-white px-layout-side">
        <Header
          title="주머니"
          property="common"
          leftIcon="quit"
          className="mt-0! pt-28"
        />
        <div className="-mx-layout-side mt-14 h-2 bg-gray-200" />
      </div>

      <div className="mt-43 flex gap-18">
        <TimeCard
          title="오늘"
          name={userData.name}
          totalTime={userData.todayTime}
        />
        <TimeCard
          title="이번주"
          name={userData.name}
          totalTime={userData.weekTime}
        />
      </div>

      <div className="-mx-layout-side mt-32 h-4 bg-gray-100" />

      <AcornSection acornCount={userData.acornCount} />

      {attendanceData && (
        <div className={cn(!userData.hasGoal && "-mb-59")}>
          <WeeklyAttendanceSection
            currentDay={((attendanceData.streak - 1) % 7) + 1}
            attendance={getWeeklyAttendance(attendanceData.streak)}
          />
        </div>
      )}

      {userData.hasGoal && (
        <div className="mt-20 -mb-59">
          <WeeklyGoalSection
            weekData={userData.weeklyGoal.weekData}
            dailyGoal={userData.weeklyGoal.dailyGoal}
            totalGoal={userData.weeklyGoal.totalGoal}
            completed={userData.weeklyGoal.completed}
            lastWeekGap={userData.weeklyGoal.lastWeekGap}
          />
        </div>
      )}
    </div>
  );
}
