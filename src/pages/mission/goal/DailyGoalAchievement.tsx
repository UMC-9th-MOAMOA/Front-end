import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IcColoredAcorn from "@/assets/icons/mission/ic_colored_acorn.svg?react";
import IcExpand from "@/assets/icons/mission/ic_expand.svg?react";
import IcSimple from "@/assets/icons/mission/ic_simple.svg?react";
import IcSuccessOX from "@/assets/icons/mission/ic_success_ox.svg?react";
import Header from "@/components/common/header/Header";

const QUESTION_TYPE_LABELS: Record<string, string> = {
  subjective: "단답형",
  ox: "OX",
  multiple: "객관식",
};

interface QuestionResult {
  type: string;
  isCorrect: boolean;
}

interface DailyGoalAchievementProps {
  totalAcorns: number;
  questionResults: QuestionResult[];
  correctCount: number;
  onClose: () => void;
}

export default function DailyGoalAchievement({
  totalAcorns,
  questionResults,
  correctCount,
  onClose,
}: DailyGoalAchievementProps) {
  const navigate = useNavigate();
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col items-center">
      <Header leftIcon="quit" title="" property="common" onBack={onClose} />
      <h2 className="heading-2 z-40 text-center">
        <span className="text-moamoa-400">오늘의 목표</span>
        <span className="text-black"> 모두 달성 !</span>
      </h2>
      <div className="absolute top-86 z-30 flex w-full justify-center">
        <IcSuccessOX className="h-277 w-275" />
      </div>

      <div className="z-35 mt-213 w-full rounded-[20px] border-2 border-moamoa-100 bg-white px-25 py-26">
        <h1 className="heading-0 flex items-center justify-center gap-5">
          <span className="text-acorn">+ {totalAcorns}</span>
          <span className="text-black">획득 !</span>
        </h1>

        <div
          className={`mt-20 rounded-xl border border-2 ${isDetailOpen ? "border-moamoa-100 bg-white" : "border-moamoa-100 bg-moamoa-50"}`}
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

              {questionResults.map((result, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-8 pl-10"
                >
                  <span className="body-2 text-black">
                    {QUESTION_TYPE_LABELS[result.type] || result.type}
                  </span>
                  <div className="flex items-center gap-10">
                    <span className="body-2 text-black">
                      +{result.isCorrect ? 1 : 0}
                    </span>
                    <IcColoredAcorn className="h-24 w-24" />
                  </div>
                </div>
              ))}

              <div className="my-17 h-px bg-black" />

              <div className="flex items-center justify-between pl-30">
                <span className="heading-3 text-black">Total</span>
                <div className="flex items-center pr-30">
                  <span className="heading-3 text-black">+{correctCount}</span>
                  <IcColoredAcorn className="h-30 w-30" />
                </div>
              </div>
            </div>
          )}
        </div>
        {!isDetailOpen && (
          <div className="mt-48 px-23 py-3">
            <p className="heading-6 text-center text-black">
              획득한 도토리로
              <br />
              다람쥐를 꾸며볼까요?
            </p>
          </div>
        )}
      </div>

      <div className="mt-auto flex w-full flex-col items-center px-25 pb-30">
        <p className="body-4 mb-18 text-center text-gray-600">
          획득한 도토리로 다람쥐를 꾸며볼까요?
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
            상점으로
          </button>
        </div>
      </div>
    </div>
  );
}
