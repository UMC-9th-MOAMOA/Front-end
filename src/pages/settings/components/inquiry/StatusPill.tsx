import type { AnswerStatus } from "../../types/inquiry.type";

type Props = {
  status: AnswerStatus;
};

export default function StatusPill({ status }: Props) {
  const isCompleted = status === "COMPLETED";

  return (
    <div
      className={[
        "flex h-30 items-center justify-center rounded-sm px-16",
        isCompleted ? "bg-moamoa-100" : "bg-gray-300",
      ].join(" ")}
    >
      <span className="body-4 whitespace-nowrap text-black">
        {isCompleted ? "답변 완료" : "답변 대기"}
      </span>
    </div>
  );
}
