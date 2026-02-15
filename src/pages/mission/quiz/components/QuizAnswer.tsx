import { useRef } from "react";
import IcOxO from "@/assets/icons/mission/ic_ox_o.svg?react";
import IcOxX from "@/assets/icons/mission/ic_ox_x.svg?react";

interface QuizAnswerProps {
  questionType: "subjective" | "ox" | "multiple";
  userInput: string;
  selectedOption: string | null;
  options?: string[];
  onInputChange: (value: string) => void;
  onOptionSelect: (option: string) => void;
  previousCorrectAnswer?: string | null;
}

export default function QuizAnswer({
  questionType,
  userInput,
  selectedOption,
  options,
  onInputChange,
  onOptionSelect,
  previousCorrectAnswer,
}: QuizAnswerProps) {
  const shouldBlurRef = useRef(false);
  const isReadOnly = previousCorrectAnswer != null;

  if (questionType === "subjective") {
    if (isReadOnly) {
      return (
        <div className="pt-39">
          <div className="body-2 flex h-139 w-full items-start rounded-xl border-2 border-moamoa-100 bg-moamoa-50 px-14 py-16 text-black">
            {previousCorrectAnswer}
          </div>
        </div>
      );
    }
    return (
      <div className="pt-39">
        <textarea
          value={userInput}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (e.nativeEvent.isComposing) {
                shouldBlurRef.current = true;
              } else {
                e.currentTarget.blur();
              }
            }
          }}
          onCompositionEnd={(e) => {
            if (shouldBlurRef.current) {
              shouldBlurRef.current = false;
              e.currentTarget.blur();
            }
          }}
          placeholder="답안을 작성해주세요"
          className="body-2 h-139 w-full resize-none rounded-xl border-2 border-moamoa-50 bg-white px-14 py-16 text-black placeholder:text-gray-400 focus:border-moamoa-300 focus:outline-none"
        />
      </div>
    );
  }

  if (questionType === "ox") {
    if (isReadOnly) {
      const isOCorrect = previousCorrectAnswer === "O";
      return (
        <div className="flex gap-20 px-13 pt-38 pb-20">
          <div className="flex flex-1 flex-col items-center">
            <span
              className={`body-2 ${isOCorrect ? "text-moamoa-300" : "text-gray-500"}`}
            >
              그렇다
            </span>
            <div
              className={`mt-4 flex w-full items-center justify-center rounded-xl border px-25 py-24 ${
                isOCorrect
                  ? "border-moamoa-400 bg-moamoa-100"
                  : "border-gray-300 bg-gray-100"
              }`}
            >
              <div className={isOCorrect ? "" : "[&_path]:fill-gray-500"}>
                <IcOxO />
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center">
            <span
              className={`body-2 ${!isOCorrect ? "text-red-300" : "text-gray-500"}`}
            >
              아니다
            </span>
            <div
              className={`mt-4 flex w-full items-center justify-center rounded-xl border p-28 ${
                !isOCorrect
                  ? "border-red-300 bg-red-200"
                  : "border-gray-300 bg-gray-100"
              }`}
            >
              <div className={!isOCorrect ? "" : "[&_path]:fill-gray-500"}>
                <IcOxX />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="flex gap-20 px-13 pt-38 pb-20">
        <button
          type="button"
          onClick={() => onInputChange("O")}
          className="flex flex-1 flex-col items-center"
        >
          <span className="body-2 text-moamoa-300">그렇다</span>
          <div
            className={`mt-4 flex w-full items-center justify-center rounded-xl border px-25 py-24 transition-colors ${
              userInput === "O"
                ? "border-moamoa-300 bg-moamoa-50"
                : "border-gray-300 bg-white"
            }`}
          >
            <IcOxO />
          </div>
        </button>
        <button
          type="button"
          onClick={() => onInputChange("X")}
          className="flex flex-1 flex-col items-center"
        >
          <span className="body-2 text-red-300">아니다</span>
          <div
            className={`mt-4 flex w-full items-center justify-center rounded-xl border p-28 transition-colors ${
              userInput === "X"
                ? "border-red-300 bg-red-200"
                : "border-gray-300 bg-white"
            }`}
          >
            <IcOxX />
          </div>
        </button>
      </div>
    );
  }

  if (questionType === "multiple" && options) {
    if (isReadOnly) {
      const correctOptionText = options.includes(previousCorrectAnswer!)
        ? previousCorrectAnswer!
        : options[Number(previousCorrectAnswer!) - 1] || null;

      return (
        <div className="pt-29">
          <p className="body-3 text-center text-moamoa-300">
            정답을 골라보세요!
          </p>
          <div className="flex flex-col gap-20 pt-13">
            {options.map((option) => (
              <div
                key={option}
                className={`body-4 flex w-full items-center justify-center rounded-md border px-10 py-10 ${
                  option === correctOptionText
                    ? "border-moamoa-200 bg-moamoa-50 text-black"
                    : "border-moamoa-100 bg-white text-black"
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="pt-29">
        <p className="body-3 text-center text-moamoa-300">정답을 골라보세요!</p>
        <div className="flex flex-col gap-20 pt-13">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onOptionSelect(option)}
              className={`body-4 flex w-full items-center justify-center rounded-md border px-10 py-10 transition-colors ${
                selectedOption === option
                  ? "border-moamoa-200 bg-moamoa-50 text-black"
                  : "border-moamoa-100 bg-white text-black hover:bg-moamoa-50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
