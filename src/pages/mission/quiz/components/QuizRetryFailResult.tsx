import IcOxO from "@/assets/icons/mission/ic_ox_o.svg?react";
import IcOxX from "@/assets/icons/mission/ic_ox_x.svg?react";
import IcRetryFailHands from "@/assets/icons/mission/ic_retry_fail_hands.svg?react";
import IcRetryFailSquirrel from "@/assets/icons/mission/ic_retry_fail_squirrel.svg?react";

interface QuizRetryFailResultProps {
  userAnswer: string;
  questionType: "subjective" | "ox" | "multiple";
  isLastQuestion: boolean;
  onNext: () => void;
}

export default function QuizRetryFailResult({
  userAnswer,
  questionType,
  isLastQuestion,
  onNext,
}: QuizRetryFailResultProps) {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="absolute top-33 z-10 flex items-end justify-center">
        <IcRetryFailSquirrel />
      </div>
      <div className="absolute top-163 right-1/2 z-30 flex -translate-x-1/2 translate-x-16 translate-y-50 items-center justify-center">
        <IcRetryFailHands />
      </div>

      <div className="z-20 mt-234 w-full rounded-[20px] bg-white px-25 pb-38">
        <h1 className="heading-0 pt-25 text-center text-black">FAIL..</h1>
        <p className="heading-3 mt-15 text-center text-black">
          아쉽게도 오답이에요
        </p>
        {questionType === "subjective" && (
          <div className="mx-31 mt-58 flex items-center justify-center rounded-xl border-2 border-red-400 bg-[#FFF1F2] px-9 py-9">
            <span className="heading-5 text-black">{userAnswer}</span>
          </div>
        )}
        {questionType === "ox" && (
          <div className="mt-39 flex items-center justify-center">
            <div className="flex h-80 w-82 items-center justify-center rounded-[10px] border border-red-300 bg-red-200">
              {userAnswer === "O" ? <IcOxO /> : <IcOxX />}
            </div>
          </div>
        )}
        {questionType === "multiple" && (
          <div className="mx-31 mt-58 flex items-center justify-center rounded-xl border-2 border-red-400 bg-[#FFF1F2] px-9 py-9">
            <span className="heading-5 text-black">{userAnswer}</span>
          </div>
        )}
        <p
          className={`body-2 whitespace-pre-line text-center text-black ${questionType === "ox" ? "mt-56" : "mt-77"}`}
        >
          {"거의 다 왔어요 !\n조금만 더 신중하게 고민해 보세요"}
        </p>
      </div>

      <div className="mt-auto flex w-full flex-col items-center px-25 pt-34 pb-42">
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
