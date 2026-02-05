import IcOxO from "@/assets/icons/mission/ic_ox_o.svg?react";
import IcOxX from "@/assets/icons/mission/ic_ox_x.svg?react";

interface QuizAnswerProps {
  questionType: "subjective" | "ox" | "multiple";
  userInput: string;
  selectedOption: string | null;
  options?: string[];
  onInputChange: (value: string) => void;
  onOptionSelect: (option: string) => void;
}

export default function QuizAnswer({
  questionType,
  userInput,
  selectedOption,
  options,
  onInputChange,
  onOptionSelect,
}: QuizAnswerProps) {
  if (questionType === "subjective") {
    return (
      <div className="pt-39">
        <textarea
          value={userInput}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
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
    return (
      <div className="flex gap-20 pt-38 pb-53">
        <button
          type="button"
          onClick={() => onInputChange("O")}
          className="flex flex-1 flex-col items-center"
        >
          <span className="body-2 text-moamoa-300">주장했다</span>
          <div
            className={`mt-8 flex w-full items-center justify-center rounded-xl border-2 px-25 py-24 transition-colors ${
              userInput === "O"
                ? "border-moamoa-300 bg-moamoa-50"
                : "border-gray-200 bg-white"
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
          <span className="body-2 text-red-400">주장하지 않았다</span>
          <div
            className={`mt-8 flex w-full items-center justify-center rounded-xl border-2 p-28 transition-colors ${
              userInput === "X"
                ? "border-red-400 bg-red-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <IcOxX />
          </div>
        </button>
      </div>
    );
  }

  if (questionType === "multiple" && options) {
    return (
      <div className="pt-29">
        <p className="body-3 text-center text-moamoa-300">정답을 골라보세요!</p>
        <div className="flex flex-col gap-20 pt-16 pb-40">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onOptionSelect(option)}
              className={`body-2 flex h-42 w-full items-center justify-center rounded-md border transition-colors ${
                selectedOption === option
                  ? "border-moamoa-300 bg-moamoa-50 text-moamoa-500"
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
