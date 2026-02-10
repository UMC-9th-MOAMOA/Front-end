import { Suspense, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "@/components/common/header/Header";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useSubmitMissionQuiz } from "@/pages/mission/hooks/useMutation/useSubmitMissionQuiz";
import { useMissionDetail } from "@/pages/mission/hooks/useQuery/useMissionDetail";
import type { Quiz } from "@/types/mission/mission";
import MissionResult from "./components/MissionResult";
import QuizCard from "./components/QuizCard";
import QuizProgress from "./components/QuizProgressBar";
import QuizQuitPopup from "./components/QuizQuitPopup";
import QuizResult from "./components/QuizResult";
import QuizSubmitButton from "./components/QuizSubmitButton";

type AnswerItem = {
  quizId: number;
  userAnswer: string;
  isCorrect: boolean;
};

function mapQuizToQuestion(quiz: Quiz) {
  return {
    questionId: String(quiz.quizId),
    questionNumber: quiz.quizId,
    questionType:
      quiz.type === "SHORT"
        ? ("subjective" as const)
        : quiz.type === "OX"
          ? ("ox" as const)
          : ("multiple" as const),
    questionText: quiz.question,
    options: quiz.option,
    correctAnswer: quiz.answer,
  };
}

function QuizPageContent({ missionId }: { missionId: number }) {
  const navigate = useNavigate();
  const { data: mission } = useMissionDetail(missionId);
  const submitQuiz = useSubmitMissionQuiz();

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
  const [quizResult, setQuizResult] = useState<{
    isSuccess: boolean;
    totalAcorns: number;
    isDailyGoalAchieved: boolean;
    isWeeklyGoalAchieved: boolean;
  } | null>(null);

  const feedbackTimeoutRef = useRef<number | null>(null);

  const isRetry = mission.attemptCount > 0;

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        window.clearTimeout(feedbackTimeoutRef.current);
        feedbackTimeoutRef.current = null;
      }
    };
  }, []);

  if (!mission.quizzes.length) {
    return <Navigate to={`/mission/${missionId}`} replace />;
  }

  const ANIMATION_DURATION = 500;
  const FEEDBACK_DELAY_AFTER_ANIMATION = 400;
  const LAST_QUESTION_EXTRA_DELAY = 400;

  const currentQuestion = mission.quizzes[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === mission.quizzes.length - 1;

  const handleSubmit = () => {
    if (!currentQuestion) return;

    const userAnswer =
      currentQuestion.type === "MULTIPLE" ? selectedOption || "" : userInput;

    const normalize = (s: string) => s.replaceAll(" ", "").toLowerCase();

    let correct = false;
    if (currentQuestion.type === "MULTIPLE") {
      const selectedIndex = currentQuestion.option.indexOf(userAnswer);
      correct = currentQuestion.acceptedAnswers.some(
        (a) => normalize(a) === String(selectedIndex + 1)
      );
    } else {
      const normalizedUserAnswer = normalize(userAnswer);
      correct = currentQuestion.acceptedAnswers.some(
        (a) => normalize(a) === normalizedUserAnswer
      );
    }

    setAnswers([
      ...answers,
      {
        quizId: currentQuestion.quizId,
        userAnswer,
        isCorrect: correct,
      },
    ]);

    setIsCorrect(correct);
    setCompletedQuestions(completedQuestions + 1);
    setIsAnimating(true);

    if (feedbackTimeoutRef.current)
      window.clearTimeout(feedbackTimeoutRef.current);

    const totalDelay = isLastQuestion
      ? ANIMATION_DURATION +
        FEEDBACK_DELAY_AFTER_ANIMATION +
        LAST_QUESTION_EXTRA_DELAY
      : ANIMATION_DURATION + FEEDBACK_DELAY_AFTER_ANIMATION;

    feedbackTimeoutRef.current = window.setTimeout(() => {
      setShowFeedback(true);
      setIsAnimating(false);
      feedbackTimeoutRef.current = null;
    }, totalDelay);
  };

  const handleNext = () => {
    if (submitQuiz.isPending) return;

    if (isLastQuestion) {
      const allAnswers = [
        ...answers,
        ...(answers.find((a) => a.quizId === currentQuestion.quizId)
          ? []
          : [
              {
                quizId: currentQuestion.quizId,
                userAnswer:
                  currentQuestion.type === "MULTIPLE"
                    ? selectedOption || ""
                    : userInput,
                isCorrect: isCorrect || false,
              },
            ]),
      ];

      submitQuiz.mutate(
        {
          missionId,
          submissions: {
            submissions: allAnswers.map((a) => {
              const quiz = mission.quizzes.find((q) => q.quizId === a.quizId);
              let answerToSend = a.userAnswer;

              if (quiz?.type === "MULTIPLE" && quiz.option) {
                const optionIndex = quiz.option.indexOf(a.userAnswer);
                if (optionIndex !== -1) {
                  answerToSend = String(optionIndex + 1);
                }
              }

              return {
                quizId: a.quizId,
                answer: answerToSend,
              };
            }),
          },
        },
        {
          onSuccess: (data) => {
            if (isRetry) {
              navigate("/mypage?tab=mission");
            } else {
              setQuizResult({
                isSuccess: data.isSuccess,
                totalAcorns: data.totalReward,
                isDailyGoalAchieved: data.dailyGoalAchieved,
                isWeeklyGoalAchieved: data.weeklyGoalAchieved,
              });
              setShowFeedback(false);
              setShowMissionResult(true);
            }
          },
        }
      );
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserInput("");
      setSelectedOption(null);
      setShowFeedback(false);
      setIsCorrect(null);
    }
  };

  const isAnswerEmpty = () => {
    if (currentQuestion.type === "MULTIPLE") {
      return !selectedOption;
    }
    return userInput.trim() === "";
  };

  if (showMissionResult && quizResult) {
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const questionResults = answers.map((a) => ({
      type: mission.quizzes.find((q) => q.quizId === a.quizId)?.type || "",
      isCorrect: a.isCorrect,
    }));

    return (
      <MissionResult
        totalAcorns={quizResult.totalAcorns}
        questionResults={questionResults}
        correctCount={correctCount}
        totalQuestions={mission.quizzes.length}
        missionName={mission.interest}
        isDailyGoalAchieved={quizResult.isDailyGoalAchieved}
        isWeeklyGoalAchieved={quizResult.isWeeklyGoalAchieved}
        onClose={() => navigate("/home")}
        onRetryWrong={() => {
          navigate(`/mission/entry/${missionId}`);
        }}
      />
    );
  }

  if (showFeedback && isCorrect !== null) {
    const userAnswer =
      currentQuestion.type === "MULTIPLE" ? selectedOption || "" : userInput;

    return (
      <QuizResult
        isCorrect={isCorrect}
        userAnswer={userAnswer}
        category={mission.interest}
        explanation={currentQuestion.explanation}
        questionType={
          currentQuestion.type === "SHORT"
            ? "subjective"
            : currentQuestion.type === "OX"
              ? "ox"
              : "multiple"
        }
        isLastQuestion={isLastQuestion}
        isRetry={isRetry}
        onNext={handleNext}
      />
    );
  }

  const mappedQuestion = mapQuizToQuestion(currentQuestion);

  return (
    <div className="-mb-96 flex min-h-screen flex-col">
      <Header
        title="미션 수행하기"
        property="common"
        onBack={() => {
          if (isRetry) {
            navigate(-1);
          } else {
            setShowQuitPopup(true);
          }
        }}
      />

      <div className="px-21 pt-24">
        <QuizProgress
          current={completedQuestions}
          total={mission.quizzes.length}
        />
      </div>

      <div className="flex w-full px-21 pt-20">
        <QuizCard
          question={mappedQuestion}
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
            disabled={
              isAnimating ||
              submitQuiz.isPending ||
              (!showFeedback && isAnswerEmpty())
            }
            onClick={showFeedback ? handleNext : handleSubmit}
          />
        </div>
      </div>
      {showQuitPopup && (
        <QuizQuitPopup
          onQuit={() => navigate("/home")}
          onStay={() => setShowQuitPopup(false)}
        />
      )}
    </div>
  );
}

export default function QuizPage() {
  const { missionId } = useParams<{ missionId: string }>();
  const numericMissionId = Number(missionId);
  if (!missionId || Number.isNaN(numericMissionId)) {
    return <Navigate to="/home" replace />;
  }
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <LoadingSpinner className="size-60" />
        </div>
      }
    >
      <QuizPageContent missionId={numericMissionId} />
    </Suspense>
  );
}
