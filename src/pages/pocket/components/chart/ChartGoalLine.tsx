import IcPolygon from "@/assets/icons/ic_polygon.svg?react";

interface ChartGoalLineProps {
  goalPosition: number;
}

export default function ChartGoalLine({ goalPosition }: ChartGoalLineProps) {
  return (
    <>
      <div
        className="absolute -left-60 z-40 flex items-center gap-4 transition-all duration-300 ease-in-out"
        style={{ top: `${goalPosition}%`, transform: "translateY(-50%)" }}
      >
        <span className="body-2 whitespace-nowrap text-black">목표</span>
        <IcPolygon className="size-12 text-warning" />
      </div>

      <div
        className="absolute right-0 left-0 z-30 border-warning border-dashed transition-all duration-300 ease-in-out"
        style={{
          top: `${goalPosition}%`,
          borderTopWidth: "2px",
        }}
      />
    </>
  );
}
