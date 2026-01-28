import WeeklyChart from "./chart/WeeklyChart";

interface WeeklyGoalSectionProps {
  weekData: number[];
  dailyGoal: number;
  totalGoal: number;
  completed: number;
  lastWeekGap: number;
}

export default function WeeklyGoalSection({
  weekData,
  dailyGoal,
  totalGoal,
  completed,
  lastWeekGap,
}: WeeklyGoalSectionProps) {
  return (
    <div className="mt-20 rounded-xl bg-gray-100 px-22 pt-21 pb-18">
      <h3 className="heading-3 text-center text-black">
        이번 주 목표 진행 현황
      </h3>

      <div className="mt-23">
        <WeeklyChart weekData={weekData} dailyGoal={dailyGoal} />
      </div>

      <div className="mt-22 flex flex-col items-center gap-4 rounded-xl bg-moamoa-50 px-16 py-12">
        <p className="body-2 text-center text-black">
          {totalGoal}개 중 {completed}개의 미션을 성공했어요!
        </p>
        <p className="body-4 text-center text-gray-600">
          지난주보다 {lastWeekGap > 0 ? `+${lastWeekGap}` : lastWeekGap}개
          성장중
        </p>
      </div>
    </div>
  );
}
