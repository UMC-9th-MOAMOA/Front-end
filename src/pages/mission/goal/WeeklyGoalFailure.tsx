import IcCryingSquirrel from "@/assets/icons/mission/ic_crying_squirrel.svg?react";
import IcTears from "@/assets/icons/mission/ic_tears.svg?react";

interface WeeklyGoalFailureProps {
  completedMissions: number;
  totalMissions: number;
  onClose: () => void;
}

export default function WeeklyGoalFailure({
  completedMissions,
  totalMissions,
  onClose,
}: WeeklyGoalFailureProps) {
  return (
    <div className="relative -mb-96 flex min-h-screen flex-col items-center">
      <h2 className="heading-2 mt-46 text-center text-black">
        더 멀리 뛰기 위한 도움닫기
      </h2>

      <div className="absolute top-100 z-30 flex w-full justify-center">
        <IcCryingSquirrel className="h-244 w-auto" />
      </div>
      <div className="absolute top-307 right-26 z-40 flex w-full justify-center">
        <IcTears className="h-17 w-112" />
      </div>

      <div className="z-35 mt-228 w-full rounded-[20px] border-2 border-moamoa-100 bg-white px-23 pt-32 pb-28">
        <div className="flex flex-col items-center gap-12">
          <p className="heading-2 text-center text-black">
            이번주 목표 중 <br />
            {completedMissions}/{totalMissions}개를 성공했어요.
          </p>
          <p className="heading-4 pt-64 text-center text-gray-800">
            다음주 목표 달성을 위해
            <br />
            미션을 탐색해보시겠어요?
          </p>
          <p className="body-2 mt-20 text-center text-gray-800">
            조금 부족해도 괜찮아요
          </p>
        </div>
      </div>

      <div className="mt-auto flex w-full flex-col items-center px-25 pt-22 pb-30">
        <p className="body-4 mb-20 text-center text-gray-600">
          이번 주에 쌓인 노력은 사라지지 않으니까요!
        </p>

        <button
          type="button"
          onClick={onClose}
          className="body-2-1 h-50 w-full rounded-xl bg-moamoa-300 py-12 text-white"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
