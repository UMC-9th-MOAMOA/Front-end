import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IcAllCorrect from "@/assets/icons/mission/ic_all_correct.svg?react";
import IcColoredAcorn from "@/assets/icons/mission/ic_colored_acorn.svg?react";
import IcResultHands from "@/assets/icons/mission/ic_result_fail_hands.svg?react";
import IcResultSquirrel from "@/assets/icons/mission/ic_result_fail_squirrel.svg?react";
import Header from "@/components/common/header/Header";
import DailyGoalAchievement from "@/pages/mission/goal/DailyGoalAchievement";
import DailyWeeklyGoalAchievement from "@/pages/mission/goal/DailyWeeklyGoalAchievement";
import WeeklyGoalAchievement from "@/pages/mission/goal/WeeklyGoalAchievement";

const QUESTION_TYPE_LABELS: Record<string, string> = {
  subjective: "단답형",
  ox: "OX",
  multiple: "객관식",
};

interface QuestionResult {
  type: string;
  isCorrect: boolean;
}

interface MissionResultProps {
  totalAcorns: number;
  questionResults: QuestionResult[];
  correctCount: number;
  totalQuestions: number;
  isDailyGoalAchieved?: boolean;
  isWeeklyGoalAchieved?: boolean;
  missionName?: string;
  onClose: () => void;
  onRetryWrong: () => void;
}

export default function MissionResult({
  totalAcorns,
  questionResults,
  correctCount,
  totalQuestions,
  isDailyGoalAchieved = false,
  isWeeklyGoalAchieved = false,
  missionName = "",
  onClose,
  onRetryWrong,
}: MissionResultProps) {
  const navigate = useNavigate();
  const isAllCorrect = correctCount === totalQuestions;
  const [showGoalScreen, setShowGoalScreen] = useState(false);

  const handleExit = () => {
    if (isDailyGoalAchieved || isWeeklyGoalAchieved) {
      setShowGoalScreen(true);
    } else {
      onClose();
    }
  };

  if (showGoalScreen) {
    if (isDailyGoalAchieved && isWeeklyGoalAchieved) {
      return (
        <DailyWeeklyGoalAchievement
          totalAcorns={totalAcorns}
          missionName={missionName}
          questionResults={questionResults}
          onClose={() => navigate("/")}
        />
      );
    }
    if (isDailyGoalAchieved) {
      return (
        <DailyGoalAchievement
          totalAcorns={totalAcorns}
          questionResults={questionResults}
          correctCount={correctCount}
          onClose={() => navigate("/")}
        />
      );
    }
    if (isWeeklyGoalAchieved) {
      return (
        <WeeklyGoalAchievement
          totalAcorns={totalAcorns}
          questionResults={questionResults}
          correctCount={correctCount}
          onClose={() => navigate("/")}
        />
      );
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center">
      <Header leftIcon="quit" title="" property="common" onBack={handleExit} />

      <div className="absolute top-36 left-20 z-30 flex w-full justify-center">
        {isAllCorrect ? (
          <IcAllCorrect className="h-260 w-auto" />
        ) : (
          <IcResultSquirrel className="h-280.8 w-auto" />
        )}
      </div>
      {!isAllCorrect && (
        <div className="absolute top-200 right-15 z-40 flex w-full justify-center">
          <IcResultHands className="h-36 w-147" />
        </div>
      )}

      <div className="z-35 mt-178 w-full rounded-[20px] border-2 border-moamoa-100 bg-white px-25 pb-23">
        <h1 className="heading-0 flex items-center justify-center gap-5 pt-47">
          <span className="text-acorn">+ {totalAcorns}</span>
          <span className="text-black">획득 !</span>
        </h1>

        <div className="mt-16 rounded-xl border border-moamoa-100 px-20 py-17">
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
            <div className="flex items-center gap-10 pr-30">
              <span className="heading-3 text-black">+{correctCount}</span>
              <IcColoredAcorn className="h-30 w-30" />
            </div>
          </div>
        </div>

        <div className="mt-19 px-23 py-3">
          <p className="body-2 text-center text-black">
            {isAllCorrect ? (
              <>
                문제를 모두 맞추셨어요!
                <br />
                얻은 도토리로 다람쥐를 꾸며볼까요?
              </>
            ) : (
              <>
                {totalQuestions}개 중 {correctCount}개를 맞추셨어요 !
                <br />
                틀린 문제를 다시 풀어볼까요?
              </>
            )}
          </p>
        </div>
      </div>

      <div className="mt-auto flex w-full flex-col items-center px-25 pb-30">
        <p className="body-4 mb-18 text-center text-gray-600">
          {isAllCorrect
            ? "이제 보상을 받으러 가볼까요?"
            : "다시 한 번 도전해볼까요?"}
        </p>

        <div className="flex w-full gap-12">
          {isAllCorrect ? (
            <>
              <button
                type="button"
                onClick={handleExit}
                className="body-2-1 h-50 flex-1 rounded-xl bg-moamoa-50 py-12 text-moamoa-600"
              >
                미션 탐색
              </button>
              <button
                type="button"
                onClick={handleExit}
                className="body-2-1 h-50 flex-1 rounded-xl bg-moamoa-300 py-12 text-white"
              >
                상점으로
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleExit}
                className="body-2-1 h-50 flex-1 rounded-xl bg-moamoa-50 py-12 text-moamoa-600"
              >
                상점으로
              </button>
              <button
                type="button"
                onClick={onRetryWrong}
                className="body-2-1 h-50 flex-1 rounded-xl bg-moamoa-300 py-12 text-white"
              >
                오답 풀기
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
