import { useNavigate } from "react-router-dom";
import IcBlueBook from "@/assets/icons/mission/ic_blue_book.svg?react";
import IcFirstFailSquirrel from "@/assets/icons/mission/ic_first_fail_squirrel.svg?react";

interface DailyGoalFailureProps {
  completedMissions: number;
  totalMissions: number;
}

export default function DailyGoalFailure({
  completedMissions,
  totalMissions,
}: DailyGoalFailureProps) {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col items-center">
      <h2 className="heading-2 mt-46 text-center text-black">
        이 날은 잠시 쉬어갔네요
      </h2>
      <div className="absolute top-129 z-30 flex w-full justify-center">
        <IcFirstFailSquirrel className="h-217 w-auto" />
      </div>
      <div className="absolute top-244 right-38 z-40 flex w-full justify-center">
        <IcBlueBook className="h-88.6 w-auto" />
      </div>

      <div className="z-35 mt-235 w-full rounded-[20px] border-2 border-moamoa-100 bg-white px-23 pt-32 pb-28">
        <div className="flex flex-col items-center gap-12">
          <p className="heading-2 text-center text-black">
            오늘 목표 중 <br />
            {completedMissions}/{totalMissions}개를 성공했어요.
          </p>
          <p className="heading-4 pt-64 text-center text-gray-800">
            목표 달성을 위해
            <br />
            미션을 탐색해보시겠어요?
          </p>
          <p className="body-2 mt-20 text-center text-gray-800">
            완벽하지 않아도 괜찮아요
          </p>
        </div>
      </div>

      <div className="mt-auto flex w-full flex-col items-center px-25 pb-30">
        <p className="body-4 mb-20 text-center text-gray-600">
          이 날 못한 몫까지 <br />
          오늘 더 힘차게 달려볼까요?
        </p>

        <div className="flex w-full gap-12">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="body-2-1 h-50 flex-1 rounded-xl bg-moamoa-50 py-12 text-moamoa-600"
          >
            확인
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="body-2-1 h-50 flex-1 rounded-xl bg-moamoa-300 py-12 text-white"
          >
            미션 탐색
          </button>
        </div>
      </div>
    </div>
  );
}
