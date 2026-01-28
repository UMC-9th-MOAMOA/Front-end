import ChartAxis from "./ChartAxis";
import ChartBars from "./ChartBars";
import ChartDayLabels from "./ChartDayLabels";
import ChartGoalLine from "./ChartGoalLine";

interface WeeklyChartProps {
  weekData: number[];
  dailyGoal: number;
}

export default function WeeklyChart({ weekData, dailyGoal }: WeeklyChartProps) {
  const maxVal = Math.max(...weekData, dailyGoal);
  const yAxisMax = Math.max(6, maxVal % 2 === 0 ? maxVal : maxVal + 1);

  const TICK_GAP = 20;
  const chartHeight = yAxisMax * TICK_GAP;
  const goalPosition = ((yAxisMax - dailyGoal) / yAxisMax) * 100;

  return (
    <div className="flex w-full flex-col">
      <div className="relative ml-60" style={{ height: `${chartHeight}px` }}>
        <ChartAxis yAxisMax={yAxisMax} />
        <ChartGoalLine goalPosition={goalPosition} />
        <ChartBars weekData={weekData} yAxisMax={yAxisMax} />
      </div>

      <ChartDayLabels />
    </div>
  );
}
