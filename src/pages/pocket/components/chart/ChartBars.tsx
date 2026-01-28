const DAYS = ["월", "화", "수", "목", "금", "토", "일"];

const getBarColor = (count: number): { bg: string; text: string } => {
  if (count <= 2) return { bg: "bg-moamoa-50", text: "text-black" };
  if (count <= 4) return { bg: "bg-moamoa-200", text: "text-black" };
  if (count <= 6) return { bg: "bg-moamoa-300", text: "text-white" };
  return { bg: "bg-moamoa-400", text: "text-white" };
};

interface ChartBarsProps {
  weekData: number[];
  yAxisMax: number;
}

export default function ChartBars({ weekData, yAxisMax }: ChartBarsProps) {
  const safeYAxisMax = yAxisMax || 1;

  return (
    <div className="absolute inset-0 z-0 flex items-end justify-around gap-14 px-10">
      {weekData.map((count, index) => {
        const day = DAYS[index] ?? `day-${index}`;
        const { bg, text } = getBarColor(count);
        const height = (count / safeYAxisMax) * 100;

        return (
          <div
            key={`bar-${day}`}
            className="flex h-full flex-1 flex-col items-center justify-end"
          >
            {count > 0 && (
              <div
                className={`flex w-full items-end justify-center rounded-t pb-6 transition-all duration-500 ${bg} ${text}`}
                style={{ height: `${height}%` }}
              >
                <span className="body-5">{count}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
