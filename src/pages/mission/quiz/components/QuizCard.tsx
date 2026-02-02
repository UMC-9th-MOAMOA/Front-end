import QuizAnswer from "./QuizAnswer";

interface Question {
  questionId: string;
  questionNumber: number;
  questionType: "subjective" | "ox" | "multiple";
  questionText: string;
  options?: string[];
  correctAnswer: string;
}

interface QuizCardProps {
  question: Question;
  userInput: string;
  selectedOption: string | null;
  showFeedback: boolean;
  onInputChange: (value: string) => void;
  onOptionSelect: (option: string) => void;
}

export default function QuizCard({
  question,
  userInput,
  selectedOption,
  showFeedback,
  onInputChange,
  onOptionSelect,
}: QuizCardProps) {
  return (
    <div className="flex w-full flex-col rounded-2xl bg-white px-18 pt-30 pb-32">
      <div className="flex flex-col items-center justify-center px-10">
        <p className="body-2 whitespace-pre-line text-center text-black">
          {question.questionText}
        </p>
      </div>

      <div className="relative flex w-full items-center justify-center pt-49">
        <div className="inline-flex w-full gap-4 px-12">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="h-4 flex-1 items-start rounded-md bg-moamoa-50 px-4 py-4"
            />
          ))}
        </div>
        {/* 양옆 동그라미 추가 */}
      </div>

      {!showFeedback && (
        <QuizAnswer
          questionType={question.questionType}
          userInput={userInput}
          selectedOption={selectedOption}
          options={question.options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
        />
      )}
    </div>
  );
}
