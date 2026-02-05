import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/common/header/Header";
import MissionResult from "./components/MissionResult";
import QuizCard from "./components/QuizCard";
import QuizProgress from "./components/QuizProgressBar";
import QuizQuitPopup from "./components/QuizQuitPopup";
import QuizResult from "./components/QuizResult";
import QuizSubmitButton from "./components/QuizSubmitButton";

type AnswerItem = {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
};

const MOCK_QUIZ_DATA = {
  missionId: "1",
  totalQuestions: 3,
  rewardAcorns: 4,
  category: "경제 미션",
  questions: [
    {
      questionId: "q1",
      questionNumber: 1,
      questionType: "subjective" as const,
      questionText:
        "케인즈가 주장한 개념으로,\n개인이 합리적으로 생각하여 지출을 늘렸지만,\n\n결과적으로 사회 전체의 수요가 줄어들어\n경제가 나빠지는 현상을 무엇이라고 할까요?",
      correctAnswer: "절약의 역설",
      explanation:
        "케인즈는 개인의 절약이 사회 전체로는 오히려 경기를 악화시킬 수 있다고 주장했습니다.",
    },
    {
      questionId: "q2",
      questionNumber: 2,
      questionType: "ox" as const,
      questionText:
        "케인즈는 불황일 수록\n사람들이 돈을 아끼고 저축하는 것이\n경제 전체에 도움이 된다고 주장했다.",
      correctAnswer: "O",
      explanation:
        "케인즈는 불황기에 정부가 적극적으로 지출해야 한다고 주장했습니다.",
    },
    {
      questionId: "q3",
      questionNumber: 3,
      questionType: "multiple" as const,
      questionText:
        "케인즈가 주장한 개념으로,\n개인이 합리적으로 생각하여 지출을 늘렸지만,\n\n결과적으로 사회 전체의 수요가 줄어들어\n경제가 나빠지는 현상을 무엇이라고 할까요?",
      options: ["답1--------", "답2--------", "답3--------", "답4--------"],
      correctAnswer: "답1--------",
      explanation:
        "절약의 역설은 미시적으로 합리적인 행동이 거시적으로는 부정적 결과를 초래하는 현상입니다.",
    },
  ],
};

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<AnswerItem[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showQuitPopup, setShowQuitPopup] = useState(false);
  const [showMissionResult, setShowMissionResult] = useState(false);
  const feedbackTimeoutRef = useRef<number | null>(null);
  // timings (should match `QuizProgressBar` animation duration)
  const ANIMATION_DURATION = 500; // ms (kept in sync with QuizProgressBar)
  const FEEDBACK_DELAY_AFTER_ANIMATION = 400; // ms pause before showing feedback

  const navigate = useNavigate();

  const currentQuestion = MOCK_QUIZ_DATA.questions[currentQuestionIndex];
  const isLastQuestion =
    currentQuestionIndex === MOCK_QUIZ_DATA.totalQuestions - 1;

  const handleSubmit = () => {
    if (!currentQuestion) return;

    const userAnswer =
      currentQuestion.questionType === "multiple"
        ? selectedOption || ""
        : userInput;

    const correct =
      userAnswer.trim().toLowerCase() ===
      currentQuestion.correctAnswer.toLowerCase();

    setAnswers([
      ...answers,
      {
        questionId: currentQuestion.questionId,
        userAnswer,
        isCorrect: correct,
      },
    ]);

    setIsCorrect(correct);
    setCompletedQuestions(completedQuestions + 1);
    setIsAnimating(true);

    // Fallback: show feedback after animation + extra delay
    if (feedbackTimeoutRef.current)
      window.clearTimeout(feedbackTimeoutRef.current);
    feedbackTimeoutRef.current = window.setTimeout(() => {
      setShowFeedback(true);
      setIsAnimating(false);
      feedbackTimeoutRef.current = null;
    }, ANIMATION_DURATION + FEEDBACK_DELAY_AFTER_ANIMATION);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowFeedback(false);
      setShowMissionResult(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserInput("");
      setSelectedOption(null);
      setShowFeedback(false);
      setIsCorrect(null);
    }
  };

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        window.clearTimeout(feedbackTimeoutRef.current);
        feedbackTimeoutRef.current = null;
      }
    };
  }, []);

  const isAnswerEmpty = () => {
    if (currentQuestion.questionType === "multiple") {
      return !selectedOption;
    }
    return userInput.trim() === "";
  };

  if (showMissionResult) {
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const questionResults = answers.map((a) => ({
      type:
        MOCK_QUIZ_DATA.questions.find((q) => q.questionId === a.questionId)
          ?.questionType || "",
      isCorrect: a.isCorrect,
    }));

    return (
      <MissionResult
        totalAcorns={correctCount}
        questionResults={questionResults}
        correctCount={correctCount}
        totalQuestions={MOCK_QUIZ_DATA.totalQuestions}
        missionName={MOCK_QUIZ_DATA.category}
        // TODO: 임시 테스트 — 확인 후 제거
        isDailyGoalAchieved
        isWeeklyGoalAchieved
        onClose={() => navigate("/")}
        onRetryWrong={() => {
          // TODO: 오답 풀기 로직
          navigate("/");
        }}
      />
    );
  }

  if (showFeedback && isCorrect !== null) {
    const userAnswer =
      currentQuestion.questionType === "multiple"
        ? selectedOption || ""
        : userInput;

    return (
      <QuizResult
        isCorrect={isCorrect}
        userAnswer={userAnswer}
        category={MOCK_QUIZ_DATA.category}
        questionText={currentQuestion.questionText}
        explanation={currentQuestion.explanation}
        questionType={currentQuestion.questionType}
        isLastQuestion={isLastQuestion}
        onNext={handleNext}
      />
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        title="미션 수행하기"
        property="common"
        onBack={() => setShowQuitPopup(true)}
      />

      <div className="px-21 pt-24">
        <QuizProgress
          current={completedQuestions}
          total={MOCK_QUIZ_DATA.totalQuestions}
        />
      </div>

      <div className="flex w-full px-21 pt-20">
        <QuizCard
          question={currentQuestion}
          userInput={userInput}
          selectedOption={selectedOption}
          showFeedback={showFeedback}
          onInputChange={setUserInput}
          onOptionSelect={setSelectedOption}
        />
      </div>

      <div className="mt-auto flex justify-center pt-44 pb-42">
        <div className="h-48 w-full px-25">
          <QuizSubmitButton
            text={showFeedback ? "다음 문제" : "정답 확인하기"}
            disabled={isAnimating || (!showFeedback && isAnswerEmpty())}
            onClick={showFeedback ? handleNext : handleSubmit}
          />
        </div>
      </div>
      {showQuitPopup && (
        <QuizQuitPopup
          acorns={MOCK_QUIZ_DATA.rewardAcorns}
          onQuit={() => navigate("/")}
          onStay={() => setShowQuitPopup(false)}
        />
      )}
    </div>
  );
}
