import type { ErrorInfo, ReactNode } from "react";
import { Component, Suspense, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/common/header/Header";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useChangeMissionStatus } from "@/pages/mission/hooks/useMutation/useChangeMissionStatus";
import { useWatchMission } from "@/pages/mission/hooks/useMutation/useWatchMission";
import { useMissionDetail } from "@/pages/mission/hooks/useQuery/useMissionDetail";
import MissionInfoCard from "./components/MissionInfoCard";

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
            onClick={() => this.setState({ hasError: false })}
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

  const watchMission = useWatchMission();
  const changeMissionStatus = useChangeMissionStatus();

  const handleContentClick = () => {
    if (isContentWatched) return;
    if (watchTimeoutRef.current) window.clearTimeout(watchTimeoutRef.current);

    const watchDuration = mission.videoLength;

    watchTimeoutRef.current = window.setTimeout(() => {
      watchMission.mutate(missionId, {
        onSuccess: (data) => {
          setIsContentWatched(data.isContentWatched);
        },
      });
    }, watchDuration);
  };

  useEffect(() => {
    return () => {
      if (watchTimeoutRef.current) {
        window.clearTimeout(watchTimeoutRef.current);
      }
    };
  }, []);

  const handleStartQuiz = () => {
    changeMissionStatus.mutate(
      { missionId, status: "NONE" },
      {
        onSuccess: () => {
          navigate(`/mission/quiz/${missionId}`);
        },
      }
    );
  };

  const canStartQuiz = isContentWatched || mission.attemptCount > 0;

  return (
    <div className="flex w-full flex-col items-center py-31">
      <MissionInfoCard
        title={mission.title}
        interest={mission.interest}
        keyword={mission.keyword}
        durationMinutes={mission.durationMinutes}
        videoUrl={mission.videoUrl}
        isContentWatched={canStartQuiz}
        attemptCount={mission.attemptCount}
        onContentClick={handleContentClick}
        onQuizStart={handleStartQuiz}
      />
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
        <Suspense
          fallback={
            <div className="flex flex-1 items-center justify-center">
              <LoadingSpinner className="size-60" />
            </div>
          }
        >
          <MissionEntryContent missionId={numericMissionId} />
        </Suspense>
      </MissionErrorBoundary>
    </div>
  );
}
