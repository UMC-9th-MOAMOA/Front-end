import type { ErrorInfo, ReactNode } from "react";
import { Component, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AsyncBoundary from "@/components/AsyncBoundary";
import Header from "@/components/common/header/Header";
import MissionErrorToast from "@/pages/mission/components/MissionErrorToast";
import { useChangeMissionStatus } from "@/pages/mission/hooks/useMutation/useChangeMissionStatus";
import { useWatchMission } from "@/pages/mission/hooks/useMutation/useWatchMission";
import { useMissionDetail } from "@/pages/mission/hooks/useQuery/useMissionDetail";
import type { ApiError } from "@/types/api/api";
import MissionInfoCard from "./components/MissionInfoCard";
import RetryConfirmPopup from "./components/RetryConfirmPopup";

class MissionErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("미션 로딩 실패:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-1 flex-col items-center justify-center gap-16 px-24">
          <p className="heading-6 text-gray-600">
            미션 정보를 불러올 수 없습니다
          </p>
          <button
            type="button"
            className="body-2 rounded-xl bg-moamoa-100 px-24 py-12 text-moamoa-500"
            onClick={() => {
              this.setState({ hasError: false });
            }}
          >
            다시 시도
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function MissionEntryContent({ missionId }: { missionId: number }) {
  const navigate = useNavigate();
  const { data: mission } = useMissionDetail(missionId);

  const [isContentWatched, setIsContentWatched] = useState(
    mission.isContentWatched
  );
  const watchTimeoutRef = useRef<number | null>(null);
  const clickedAtRef = useRef<number | null>(null);

  const watchMission = useWatchMission();
  const changeMissionStatus = useChangeMissionStatus();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showRetryPopup, setShowRetryPopup] = useState(false);

  const handleMutationError = (error: unknown) => {
    const apiError = error as ApiError;
    setErrorMessage(apiError.serverMessage || "오류가 발생했습니다.");
  };

  const callWatchApi = () => {
    if (isContentWatched) return;
    watchMission.mutate(missionId, {
      onSuccess: (data) => {
        setIsContentWatched(data.isContentWatched);
        clickedAtRef.current = null;
      },
      onError: handleMutationError,
    });
  };

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const clearMissionSession = () => {
    sessionStorage.removeItem("missionClickedAt");
    sessionStorage.removeItem("missionReturnUrl");
  };

  const startWatchTimer = (duration: number) => {
    watchTimeoutRef.current = window.setTimeout(() => {
      callWatchApi();
      clearMissionSession();
    }, duration);
  };

  const openVideoUrl = () => {
    if (isMobile) {
      const link = document.createElement("a");
      link.href = mission.videoUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    }

    if (!window.open(mission.videoUrl, "_blank")) {
      setErrorMessage("팝업이 차단되었습니다. 팝업 허용 후 다시 시도해주세요.");
      return false;
    }
    return true;
  };

  const handleContentClick = () => {
    if (isContentWatched) {
      openVideoUrl();
      return;
    }

    if (watchTimeoutRef.current) window.clearTimeout(watchTimeoutRef.current);

    const now = Date.now();
    clickedAtRef.current = now;
    sessionStorage.setItem("missionReturnUrl", `/mission/${missionId}`);
    sessionStorage.setItem("missionClickedAt", String(now));

    if (openVideoUrl()) {
      startWatchTimer(mission.videoLength * 1000);
    } else {
      clearMissionSession();
      clickedAtRef.current = null;
    }
  };

  useEffect(() => {
    if (isContentWatched) return;

    const savedClickedAt = sessionStorage.getItem("missionClickedAt");
    if (!savedClickedAt) return;

    const elapsed = Date.now() - Number(savedClickedAt);
    const watchDuration = mission.videoLength * 1000;

    if (elapsed >= watchDuration) {
      clearMissionSession();
      callWatchApi();
    } else {
      clickedAtRef.current = Number(savedClickedAt);
      startWatchTimer(watchDuration - elapsed);
    }
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;

      if (clickedAtRef.current && !isContentWatched) {
        const elapsed = Date.now() - clickedAtRef.current;
        if (elapsed >= mission.videoLength * 1000) {
          callWatchApi();
          clearMissionSession();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (watchTimeoutRef.current) {
        window.clearTimeout(watchTimeoutRef.current);
      }
    };
  }, [isContentWatched, mission.videoLength]);

  const handleStartQuiz = () => {
    changeMissionStatus.mutate(
      { missionId, status: "NONE" },
      {
        onSuccess: () => {
          navigate(`/mission/quiz/${missionId}`, {
            state: { isRetry: mission.attemptCount > 0 },
          });
        },
        onError: handleMutationError,
      }
    );
  };

  const canStartQuiz = isContentWatched || mission.attemptCount > 0;

  return (
    <div className="flex w-full flex-col items-center py-30">
      <MissionInfoCard
        title={mission.title}
        interest={mission.interest}
        keyword={mission.keyword}
        durationMinutes={mission.durationMinutes}
        videoUrl={mission.videoUrl}
        isContentWatched={canStartQuiz}
        attemptCount={mission.attemptCount}
        onContentClick={handleContentClick}
        onQuizStart={
          mission.attemptCount > 0
            ? () => setShowRetryPopup(true)
            : handleStartQuiz
        }
      />
      {showRetryPopup && (
        <RetryConfirmPopup
          onConfirm={() => {
            setShowRetryPopup(false);
            handleStartQuiz();
          }}
          onCancel={() => setShowRetryPopup(false)}
        />
      )}
      {errorMessage && (
        <MissionErrorToast
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
    </div>
  );
}

export default function MissionEntry() {
  const { missionId } = useParams<{ missionId: string }>();
  const numericMissionId = Number(missionId);

  return (
    <div className="-mb-96 flex min-h-screen flex-col">
      <Header title="미션 수행하기" property="common" />

      <MissionErrorBoundary>
        <AsyncBoundary>
          <MissionEntryContent missionId={numericMissionId} />
        </AsyncBoundary>
      </MissionErrorBoundary>
    </div>
  );
}
