import { formatTime } from "../../../utils/formatTime";

interface TimeCardProps {
  title: string;
  name: string;
  totalTime: number;
}

export default function TimeCard({ title, name, totalTime }: TimeCardProps) {
  return (
    <div className="flex-1 rounded-xl bg-gray-100 p-20 text-center">
      <h2 className="body-2 text-black">
        {title} {name}님의
        <br className="min-[450px]:hidden" /> 시간 조각은?
      </h2>
      <p className="heading-3 mt-14 text-moamoa-400">{formatTime(totalTime)}</p>
    </div>
  );
}
