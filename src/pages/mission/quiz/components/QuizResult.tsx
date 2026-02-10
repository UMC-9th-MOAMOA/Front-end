import QuizFirstFailResult from "./QuizFirstFailResult";
import QuizRetryFailResult from "./QuizRetryFailResult";
import QuizSuccessResult from "./QuizSuccessResult";

interface QuizResultProps {
  isCorrect: boolean;
  userAnswer: string;
  category: string;
  questionText: string;
  explanation?: string;
  questionType: "subjective" | "ox" | "multiple";
  isLastQuestion: boolean;
  isRetry?: boolean;
  onNext: () => void;
}

export default function QuizResult({
  isCorrect,
  userAnswer,
  category,
  questionText,
  explanation,
  questionType,
  isLastQuestion,
  isRetry = false,
  onNext,
}: QuizResultProps) {
  if (isCorrect) {
    return (
      <QuizSuccessResult
        userAnswer={userAnswer}
        category={category}
        questionText={questionText}
        explanation={explanation}
        questionType={questionType}
        isLastQuestion={isLastQuestion}
        isRetry={isRetry}
        onNext={onNext}
      />
    );
  }

  if (isRetry) {
    return (
      <QuizRetryFailResult
        userAnswer={userAnswer}
        questionType={questionType}
        isLastQuestion={isLastQuestion}
        onNext={onNext}
      />
    );
  }

  return (
    <QuizFirstFailResult
      userAnswer={userAnswer}
      questionType={questionType}
      isLastQuestion={isLastQuestion}
      onNext={onNext}
    />
  );
}
