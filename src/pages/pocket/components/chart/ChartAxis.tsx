interface ChartAxisProps {
  yAxisMax: number;
}

export default function ChartAxis({ yAxisMax }: ChartAxisProps) {
  return (
    <>
      <div className="absolute top-0 left-0 z-10 h-full w-1.5 bg-gray-600" />

      <svg
        className="absolute z-10"
        style={{ top: "-2px", left: "-4px" }}
        width="10"
        height="10"
        viewBox="0 0 10 10"
        aria-hidden="true"
      >
        <title>Y축 화살표</title>
        <polyline
          points="0,8 5,0 10,8"
          fill="none"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {Array.from({ length: yAxisMax + 1 }).map((_, i) => (
        <div
          key={`tick-${yAxisMax - i}`}
          className="absolute z-10 h-1 w-4 bg-gray-600"
          style={{
            top: `${(i / yAxisMax) * 100}%`,
            left: "0.75px",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      <div className="absolute right-0 bottom-0 left-0 z-10 h-1.5 bg-gray-600" />

      <svg
        className="absolute z-10"
        style={{ right: "-2px", bottom: "-4px" }}
        width="10"
        height="10"
        viewBox="0 0 10 10"
        aria-hidden="true"
      >
        <title>X축 화살표</title>
        <polyline
          points="2,0 10,5 2,10"
          fill="none"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
