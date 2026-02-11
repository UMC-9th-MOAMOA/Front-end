import IcOxO from "@/assets/icons/mission/ic_ox_o.svg?react";
import IcOxX from "@/assets/icons/mission/ic_ox_x.svg?react";
import IcSubjectiveCheck from "@/assets/icons/mission/ic_subjective_check.svg?react";
import IcSuccessMultiple from "@/assets/icons/mission/ic_success_multiple.svg?react";
import IcSuccessOx from "@/assets/icons/mission/ic_success_ox.svg?react";
import IcSuccessSubjective from "@/assets/icons/mission/ic_success_subjective.svg?react";

interface QuizSuccessResultProps {
  userAnswer: string;
  category: string;
  explanation?: string;
  questionType: "subjective" | "ox" | "multiple";
  isLastQuestion: boolean;
  isRetry?: boolean;
  onNext: () => void;
}

export default function QuizSuccessResult({
  userAnswer,
  category,
  explanation,
  questionType,
  isLastQuestion,
  isRetry = false,
  onNext,
}: QuizSuccessResultProps) {
  return (
    <div className="-mb-96 flex min-h-screen flex-col items-center">
      {questionType === "subjective" && (
        <div className="absolute top-32 z-10 flex w-full justify-center">
          <IcSuccessSubjective className="h-267 w-auto" />
        </div>
      )}
      {questionType === "ox" && (
        <div className="absolute top-23 z-10 flex w-full justify-center">
          <IcSuccessOx className="h-255 w-auto" />
        </div>
      )}
      {questionType === "multiple" && (
        <div className="absolute top-33 z-10 flex w-full justify-center">
          <IcSuccessMultiple className="h-266 w-auto" />
        </div>
      )}

      <div className="z-20 mt-234 w-full rounded-[20px] bg-white px-23 pt-25 pb-19">
        <h1 className="heading-0 text-center text-black">SUCCESS !</h1>
        {questionType === "subjective" && (
          <>
            <p className="heading-3 pt-8 text-center text-black">정답이에요</p>
            <div className="mt-17 flex items-center justify-center gap-4 rounded-xl border-2 border-blue-400 bg-moamoa-50 px-9 py-9">
              <span className="body-4 text-black">{userAnswer}</span>
              <IcSubjectiveCheck className="h-24 w-24" />
            </div>
          </>
        )}
        {questionType === "ox" && (
          <div className="mt-14 flex items-center justify-center">
            <div className="flex h-82 w-82 items-center justify-center rounded-[10px] border border-blue-400 bg-moamoa-100">
              {userAnswer === "O" ? (
                <IcOxO className="h-35 w-35" />
              ) : (
                <IcOxX className="h-35 w-35" />
              )}
            </div>
          </div>
        )}
        {questionType === "multiple" && (
          <div className="mt-18 flex items-center justify-center gap-4 rounded-xl border-2 border-blue-400 bg-moamoa-50 px-9 py-9">
            <span className="body-4 text-black">{userAnswer}</span>
            <IcSubjectiveCheck className="h-24 w-24" />
          </div>
        )}

        <div
          className={`${questionType === "multiple" ? "mt-40" : "mt-18"} rounded-2xl bg-[#F3F7FE] pt-14 pr-20 pb-23 pl-20`}
        >
          <span className="body-3 text-moamoa-300">{category} 미션</span>
          {explanation && (
            <div className="mt-18 flex items-center gap-9">
              <div className="w-2 shrink-0 self-stretch rounded-full bg-moamoa-200" />
              <p className="body-4 text-moamoa-700">{explanation}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto flex w-full flex-col items-center pt-22 pb-42">
        <p className="body-4 text-gray-700">
          {isLastQuestion
            ? "모든 문제를 풀었어요!"
            : "다음 문제를 풀어 볼까요?"}
        </p>
        <button
          type="button"
          onClick={onNext}
          className="body-2-1 mt-18 h-48 w-full rounded-xl bg-moamoa-300 text-white"
        >
          {isLastQuestion
            ? isRetry
              ? "미션 완료하기"
              : "결과 확인하기"
            : "다음 문제"}
        </button>
      </div>
    </div>
  );
}
