import ChartAxis from "./ChartAxis";
import ChartBars from "./ChartBars";
import ChartDayLabels from "./ChartDayLabels";
import ChartGoalLine from "./ChartGoalLine";

interface WeeklyChartProps {
  weekData: number[];
  dailyGoal: number;
}

export default function WeeklyChart({ weekData, dailyGoal }: WeeklyChartProps) {
  const validWeekData = weekData.slice(0, 7);

  const maxVal = Math.max(0, ...validWeekData, dailyGoal);
  const yAxisMax = Math.max(6, maxVal % 2 === 0 ? maxVal : maxVal + 1);

  const TICK_GAP = 20;
  const chartHeight = yAxisMax * TICK_GAP;

  const safeYAxisMax = yAxisMax || 1;
  const goalPosition = ((safeYAxisMax - dailyGoal) / safeYAxisMax) * 100;

  return (
    <div className="flex w-full flex-col">
      <div className="relative ml-60" style={{ height: `${chartHeight}px` }}>
        <ChartAxis yAxisMax={yAxisMax} />
        <ChartGoalLine goalPosition={goalPosition} />
        <ChartBars weekData={validWeekData} yAxisMax={yAxisMax} />
      </div>

      <ChartDayLabels />
    </div>
  );
}
