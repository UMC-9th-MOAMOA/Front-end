import { useCallback, useEffect, useRef, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import AsyncBoundary from "@/components/AsyncBoundary";
import Header from "@/components/common/header/Header";
import MissionErrorToast from "@/pages/mission/components/MissionErrorToast";
import DailyGoalAchievement from "@/pages/mission/goal/DailyGoalAchievement";
import DailyWeeklyGoalAchievement from "@/pages/mission/goal/DailyWeeklyGoalAchievement";
import WeeklyGoalAchievement from "@/pages/mission/goal/WeeklyGoalAchievement";
import { useChangeMissionStatus } from "@/pages/mission/hooks/useMutation/useChangeMissionStatus";
import { useSubmitMissionQuiz } from "@/pages/mission/hooks/useMutation/useSubmitMissionQuiz";
import { useMissionDetail } from "@/pages/mission/hooks/useQuery/useMissionDetail";
import type { ApiError } from "@/types/api/api";
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
  const location = useLocation();
  const { data: mission } = useMissionDetail(missionId);
  const submitQuiz = useSubmitMissionQuiz();
  const changeMissionStatus = useChangeMissionStatus();

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
  const [showGoalAchievement, setShowGoalAchievement] = useState(false);
  const [quizResult, setQuizResult] = useState<{
    isSuccess: boolean;
    totalAcorns: number;
    goalReward: number;
    isDailyGoalAchieved: boolean;
    isWeeklyGoalAchieved: boolean;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const feedbackTimeoutRef = useRef<number | null>(null);

  const isRetry =
    (location.state as { isRetry?: boolean })?.isRetry ??
    mission.attemptCount > 0;

  const handleMutationError = useCallback((error: unknown) => {
    const apiError = error as ApiError;
    setErrorMessage(apiError.serverMessage || "오류가 발생했습니다.");
  }, []);

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
  const isPreviouslyCorrect =
    isRetry && currentQuestion.previousCorrectAnswer != null;

  const getPreviousCorrectDisplayValue = () => {
    const prev = currentQuestion.previousCorrectAnswer;
    if (!prev) return null;
    if (currentQuestion.type === "MULTIPLE") {
      const idx = Number(prev);
      if (!Number.isNaN(idx) && currentQuestion.option[idx - 1]) {
        return currentQuestion.option[idx - 1];
      }
    }
    return prev;
  };

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

  const handleRetryCorrectSkip = () => {
    if (submitQuiz.isPending) return;

    let userAnswer = currentQuestion.previousCorrectAnswer!;
    if (currentQuestion.type === "MULTIPLE") {
      const idx = Number(userAnswer);
      if (!Number.isNaN(idx) && currentQuestion.option[idx - 1]) {
        userAnswer = currentQuestion.option[idx - 1];
      }
    }

    const newAnswers = [
      ...answers,
      { quizId: currentQuestion.quizId, userAnswer, isCorrect: true },
    ];
    setAnswers(newAnswers);
    setCompletedQuestions(completedQuestions + 1);

    if (isLastQuestion) {
      submitQuiz.mutate(
        {
          missionId,
          submissions: {
            submissions: newAnswers.map((a) => {
              const quiz = mission.quizzes.find(
                (q) => q.quizId === a.quizId
              );
              let answerToSend = a.userAnswer;
              if (quiz?.type === "MULTIPLE" && quiz.option) {
                const optionIndex = quiz.option.indexOf(a.userAnswer);
                if (optionIndex !== -1) {
                  answerToSend = String(optionIndex + 1);
                }
              }
              return { quizId: a.quizId, answer: answerToSend };
            }),
          },
        },
        {
          onSuccess: () => {
            navigate("/mypage?tab=mission&view=retry", { replace: true });
          },
          onError: handleMutationError,
        }
      );
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserInput("");
      setSelectedOption(null);
    }
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
              navigate("/mypage?tab=mission&view=retry", { replace: true });
            } else {
              setQuizResult({
                isSuccess: data.isSuccess,
                totalAcorns: data.totalReward,
                goalReward: data.goalReward,
                isDailyGoalAchieved: data.dailyGoalAchieved,
                isWeeklyGoalAchieved: data.weeklyGoalAchieved,
              });
              setShowFeedback(false);
              if (
                data.goalReward > 0 &&
                (data.dailyGoalAchieved || data.weeklyGoalAchieved)
              ) {
                setShowGoalAchievement(true);
              } else {
                setShowMissionResult(true);
              }
            }
          },
          onError: handleMutationError,
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

  if (showGoalAchievement && quizResult) {
    const questionResults = answers.map((a) => ({
      type: mission.quizzes.find((q) => q.quizId === a.quizId)?.type || "",
      isCorrect: a.isCorrect,
    }));
    const goToMyAcorn = () => navigate("/mypage?tab=acorn", { replace: true });

    if (quizResult.isDailyGoalAchieved && quizResult.isWeeklyGoalAchieved) {
      return (
        <DailyWeeklyGoalAchievement
          missionId={missionId}
          totalAcorns={quizResult.totalAcorns}
          goalReward={quizResult.goalReward}
          missionName={mission.title}
          questionResults={questionResults}
          onConfirm={goToMyAcorn}
        />
      );
    }
    if (quizResult.isDailyGoalAchieved) {
      return (
        <DailyGoalAchievement
          missionId={missionId}
          totalAcorns={quizResult.totalAcorns}
          goalReward={quizResult.goalReward}
          questionResults={questionResults}
          onClose={goToMyAcorn}
        />
      );
    }
    if (quizResult.isWeeklyGoalAchieved) {
      return (
        <WeeklyGoalAchievement
          missionId={missionId}
          totalAcorns={quizResult.totalAcorns}
          goalReward={quizResult.goalReward}
          questionResults={questionResults}
          onClose={goToMyAcorn}
        />
      );
    }
  }

  if (showMissionResult && quizResult) {
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const questionResults = answers.map((a) => ({
      type: mission.quizzes.find((q) => q.quizId === a.quizId)?.type || "",
      isCorrect: a.isCorrect,
    }));

    return (
      <MissionResult
        missionId={missionId}
        totalAcorns={quizResult.totalAcorns}
        questionResults={questionResults}
        correctCount={correctCount}
        totalQuestions={mission.quizzes.length}
        onRetryWrong={() => {
          navigate(`/mission/${missionId}`, { replace: true });
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

      <div className="pt-5">
        <QuizProgress
          current={completedQuestions}
          total={mission.quizzes.length}
        />
      </div>

      <div className="flex w-full pt-20">
        <QuizCard
          question={mappedQuestion}
          userInput={userInput}
          selectedOption={selectedOption}
          showFeedback={showFeedback}
          onInputChange={setUserInput}
          onOptionSelect={setSelectedOption}
          previousCorrectAnswer={
            isPreviouslyCorrect ? getPreviousCorrectDisplayValue() : null
          }
        />
      </div>

      <div className="mt-auto flex justify-center pt-44 pb-42">
        <div className="h-48 w-full">
          <QuizSubmitButton
            text={
              showFeedback
                ? "다음 문제"
                : isPreviouslyCorrect && isLastQuestion
                  ? "미션 완료하기"
                  : isPreviouslyCorrect
                    ? "다음 문제"
                    : "정답 확인하기"
            }
            disabled={
              isAnimating ||
              submitQuiz.isPending ||
              (!showFeedback && !isPreviouslyCorrect && isAnswerEmpty())
            }
            onClick={
              showFeedback
                ? handleNext
                : isPreviouslyCorrect
                  ? handleRetryCorrectSkip
                  : handleSubmit
            }
          />
        </div>
      </div>
      {showQuitPopup && (
        <QuizQuitPopup
          onQuit={() => {
            changeMissionStatus.mutate(
              { missionId, status: "FAIL" },
              {
                onError: (error) => {
                  console.error("미션 상태 변경 실패:", error);
                },
                onSettled: () => navigate("/home"),
              }
            );
          }}
          onStay={() => setShowQuitPopup(false)}
        />
      )}
      {errorMessage && (
        <MissionErrorToast
          message={errorMessage}
          onClose={() => {
            setErrorMessage(null);
            handleNext();
          }}
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
    <AsyncBoundary>
      <QuizPageContent missionId={numericMissionId} />
    </AsyncBoundary>
  );
}
