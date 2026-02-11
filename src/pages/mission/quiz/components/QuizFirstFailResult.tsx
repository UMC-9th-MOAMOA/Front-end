import IcFirstFailBook from "@/assets/icons/mission/ic_first_fail_book.svg?react";
import IcFirstFailSquirrel from "@/assets/icons/mission/ic_first_fail_squirrel.svg?react";
import IcOxO from "@/assets/icons/mission/ic_ox_o.svg?react";
import IcOxX from "@/assets/icons/mission/ic_ox_x.svg?react";

interface QuizFirstFailResultProps {
  userAnswer: string;
  questionType: "subjective" | "ox" | "multiple";
  isLastQuestion: boolean;
  onNext: () => void;
}

export default function QuizFirstFailResult({
  userAnswer,
  questionType,
  isLastQuestion,
  onNext,
}: QuizFirstFailResultProps) {
  return (
    <div className="-mb-96 flex min-h-screen flex-col items-center">
      <div className="absolute top-50 z-10 flex items-end justify-center">
        <IcFirstFailSquirrel />
      </div>
      <div className="absolute top-163 right-1/2 z-30 flex -translate-x-1/2 translate-x-35 items-center justify-center">
        <IcFirstFailBook />
      </div>

      <div className="z-20 mt-234 w-full rounded-[20px] bg-white px-25 pb-50">
        <h1 className="heading-0 pt-25 text-center text-black">FAIL..</h1>
        <p className="heading-3 mt-15 text-center text-black">
          아쉽게도 오답이에요
        </p>
        {questionType === "subjective" && (
          <div className="mx-31 mt-58 flex items-center justify-center rounded-xl border-2 border-red-400 bg-[#FFF1F2] px-9 py-9">
            <span className="body-4 text-black">{userAnswer}</span>
          </div>
        )}
        {questionType === "ox" && (
          <div className="mt-39 flex items-center justify-center">
            <div className="flex h-82 w-82 items-center justify-center rounded-[10px] border border-red-300 bg-red-200">
              {userAnswer === "O" ? (
                <IcOxO className="h-35 w-35" />
              ) : (
                <IcOxX className="h-35 w-35" />
              )}
            </div>
          </div>
        )}
        {questionType === "multiple" && (
          <div className="mx-31 mt-58 flex items-center justify-center rounded-xl border-2 border-red-400 bg-[#FFF1F2] px-9 py-9">
            <span className="body-4 text-black">{userAnswer}</span>
          </div>
        )}
        <p
          className={`body-2 whitespace-pre-line text-center text-black ${questionType === "ox" ? "mt-56" : "mt-77"}`}
        >
          {"아쉽지만 다음기회에..\n다시 공부해볼까요?"}
        </p>
      </div>

      <div className="mt-auto flex w-full flex-col items-center pt-22 pb-42">
        <p className="body-2 text-gray-600">다시 한 번 도전해볼까요?</p>
        <button
          type="button"
          onClick={onNext}
          className="body-2-1 mt-18 h-48 w-full rounded-xl bg-moamoa-300 text-white"
        >
          {isLastQuestion ? "미션 완료하기" : "다음 문제"}
        </button>
      </div>
    </div>
  );
}
