import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IcColoredAcorn from "@/assets/icons/mission/ic_colored_acorn.svg?react";
import IcEatingHeartSquirrel from "@/assets/icons/mission/ic_eating_heart_squirrel.svg?react";
import IcExpand from "@/assets/icons/mission/ic_expand.svg?react";
import IcSimple from "@/assets/icons/mission/ic_simple.svg?react";

const QUESTION_TYPE_LABELS: Record<string, string> = {
  SHORT: "단답식",
  OX: "OX",
  MULTIPLE: "객관식",
};

const QUESTION_TYPE_REWARDS: Record<string, number> = {
  OX: 3,
  MULTIPLE: 5,
  SHORT: 10,
};

interface QuestionResult {
  type: string;
  isCorrect: boolean;
}

interface DailyWeeklyGoalAchievementProps {
  totalAcorns: number;
  goalReward: number;
  missionName: string;
  questionResults: QuestionResult[];
  onConfirm: () => void;
}

export default function DailyWeeklyGoalAchievement({
  totalAcorns,
  goalReward,
  missionName,
  questionResults,
  onConfirm,
}: DailyWeeklyGoalAchievementProps) {
  const navigate = useNavigate();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isMissionOpen, setIsMissionOpen] = useState(false);

  const missionAcorns = questionResults.reduce(
    (sum, r) => sum + (r.isCorrect ? (QUESTION_TYPE_REWARDS[r.type] ?? 1) : 0),
    0
  );
  const grandTotal = totalAcorns;

  return (
    <div className="relative -mb-96 flex min-h-screen flex-col items-center">
      <h2 className="heading-2 z-40 mt-40 text-center">
        <span className="text-black">오늘의 </span>
        <span className="text-moamoa-400">MVP</span>
        <span className="text-black">는 바로 당신 !</span>
      </h2>
      <div className="absolute top-86 z-50 flex w-full justify-center">
        <IcEatingHeartSquirrel className="h-308 w-auto" />
      </div>

      <div className="z-35 mt-313 w-full">
        <h1 className="heading-0 flex items-center justify-center gap-5">
          <span className="text-acorn">+ {totalAcorns}</span>
          <span className="text-black">획득 !</span>
        </h1>

        <div
          className={`mt-20 rounded-xl border-2 ${isDetailOpen ? "border-moamoa-100 bg-white" : "border-moamoa-100 bg-moamoa-50"}`}
        >
          <button
            type="button"
            className="flex w-full items-center justify-between py-12 pr-14 pl-22"
            onClick={() => setIsDetailOpen((prev) => !prev)}
          >
            <span className="body-2 text-black">상세 내역 확인하기</span>
            {isDetailOpen ? (
              <IcSimple className="size-24" />
            ) : (
              <IcExpand className="h-24 w-24" />
            )}
          </button>

          {isDetailOpen && (
            <div className="px-20 pb-17">
              <div className="mb-16 border-moamoa-300 border-t border-dashed" />
              <div>
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-8"
                  onClick={() => setIsMissionOpen((prev) => !prev)}
                >
                  <span className="body-2 line-clamp-2 min-w-0 flex-1 text-left text-black">{missionName}</span>
                  <div className="flex shrink-0 items-center">
                    <span className="body-2 text-black">+{missionAcorns}</span>
                    <IcColoredAcorn className="h-24 w-24" />
                    <span className="w-12" />
                    {isMissionOpen ? (
                      <IcSimple className="size-16" />
                    ) : (
                      <IcExpand className="size-16" />
                    )}
                  </div>
                </button>

                {isMissionOpen && (
                  <div className="pl-20">
                    {questionResults.map((result, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-4 pl-9"
                      >
                        <span className="body-4 text-gray-500">
                          {QUESTION_TYPE_LABELS[result.type] || result.type}
                        </span>
                        <div className="flex items-center">
                          <span className="body-4 text-gray-500">
                            +{result.isCorrect ? (QUESTION_TYPE_REWARDS[result.type] ?? 1) : 0}
                          </span>
                          <IcColoredAcorn className="h-24 w-24" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between py-8 pl-10">
                <span className="body-2 text-black">목표 달성 보너스</span>
                <div className="flex items-center gap-10">
                  <span className="body-2 text-black">+{goalReward}</span>
                  <IcColoredAcorn className="h-24 w-24" />
                </div>
              </div>

              <div className="my-17 h-px bg-black" />

              <div className="flex items-center justify-between pl-30">
                <span className="heading-3 text-black">Total</span>
                <div className="flex items-center pr-30">
                  <span className="heading-3 text-black">+{grandTotal}</span>
                  <IcColoredAcorn className="h-30 w-30" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto flex w-full flex-col items-center px-25 pt-22 pb-30">
        <p className="body-4 mb-20 text-center text-gray-600">
          일간과 주간 목표를 동시에 달성하셨어요!
        </p>

        <div className="flex w-full gap-12">
          <button
            type="button"
            onClick={onConfirm}
            className="body-2-1 h-50 flex-1 rounded-xl bg-moamoa-50 py-12 text-moamoa-600"
          >
            확인
          </button>
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="body-2-1 h-50 flex-1 rounded-xl bg-moamoa-300 py-12 text-white"
          >
            상점으로
          </button>
        </div>
      </div>
    </div>
  );
}
