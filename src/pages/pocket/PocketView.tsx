import { useState } from "react";
import Header from "@/components/common/header/Header";
import { cn } from "@/utils/cn/cn";
import AcornSection from "./components/AcornSection";
import TimeCard from "./components/TimeCard";
import WeeklyAttendanceSection from "./components/WeeklyAttendanceSection";
import WeeklyGoalSection from "./components/WeeklyGoalSection";
import { MOCK_POCKET_DATA } from "./mock/pocketData";

export default function PocketView() {
  const [userData] = useState(MOCK_POCKET_DATA);

  return (
    <div className="min-h-screen bg-white">
      <Header
        title="주머니"
        property="common"
        leftIcon="quit"
        className="mt-24"
      />

      <div className="-mx-layout-side mt-14 h-2 bg-gray-200" />

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

      <div className={cn(!userData.hasGoal && "-mb-59")}>
        <WeeklyAttendanceSection
          currentDay={userData.weekAttendance.currentDay}
          attendance={userData.weekAttendance.attendance}
        />
      </div>

      {/* 목표 설정한 경우에만 표시 */}
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
