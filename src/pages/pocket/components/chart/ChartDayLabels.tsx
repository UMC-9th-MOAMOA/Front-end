const DAYS = ["월", "화", "수", "목", "금", "토", "일"];

export default function ChartDayLabels() {
  return (
    <div className="mt-8 ml-60 flex justify-around gap-14 px-10">
      {DAYS.map((day) => (
        <div key={day} className="flex flex-1 justify-center">
          <span className="body-4 text-gray-600">{day}</span>
        </div>
      ))}
    </div>
  );
}
