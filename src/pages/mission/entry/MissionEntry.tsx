import { Component, Suspense, useEffect, useRef, useState } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import Header from "@/components/common/header/Header";
// import { useMissionDetail } from "@/pages/mission/hooks/useQuery/useMissionDetail";
// import { useWatchMission } from "@/pages/mission/hooks/useMutation/useWatchMission";
// import { useChangeMissionStatus } from "@/pages/mission/hooks/useMutation/useChangeMissionStatus";
import MissionInfoCard from "./components/MissionInfoCard";

// TODO: DB 데이터 들어오면 삭제하고 위 import 주석 해제
const MOCK_MISSION = {
  missionId: 1,
  title: "기준금리와 주식 시장의 상관관계",
  description: "금리 변동이 주식 시장에 미치는 영향을 알기 쉽게 설명합니다.",
  interest: "경제와 금융",
  videoUrl: "https://www.youtube.com/watch?v=example123",
  durationMinutes: 12,
  totalReward: 21,
  keyword: ["경제", "금리", "주식"],
  quizzes: [],
  isContentWatched: false,
  attemptCount: 0,
  rewardAt: null,
};

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

  // TODO: DB 데이터 들어오면 아래 주석 해제하고 MOCK_MISSION 제거
  // const { data: mission } = useMissionDetail(missionId);
  const mission = MOCK_MISSION;

  const [isContentWatched, setIsContentWatched] = useState(
    mission.isContentWatched
  );
  const watchTimeoutRef = useRef<number | null>(null);

  // TODO: DB 데이터 들어오면 아래 주석 해제
  // const watchMission = useWatchMission();
  // const changeMissionStatus = useChangeMissionStatus();

  const handleContentClick = () => {
    if (isContentWatched) return;
    if (watchTimeoutRef.current) window.clearTimeout(watchTimeoutRef.current);
    // TODO: 실제 배포 시 아래 시간으로 변경
    // const watchDuration = mission.durationMinutes * 60 * 1000;
    const watchDuration = 3000; // 테스트용 3초

    watchTimeoutRef.current = window.setTimeout(() => {
      // TODO: DB 데이터 들어오면 아래 주석 해제하고 setIsContentWatched(true) 제거
      // watchMission.mutate(missionId, {
      //   onSuccess: (data) => {
      //     setIsContentWatched(data.isContentWatched);
      //   },
      // });
      setIsContentWatched(true);
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
    // TODO: DB 데이터 들어오면 아래 주석 해제하고 navigate만 남기기
    // changeMissionStatus.mutate(
    //   { missionId, status: "NONE" },
    //   {
    //     onSuccess: () => {
    //       navigate(`/mission/quiz/${missionId}`);
    //     },
    //   }
    // );
    navigate(`/mission/quiz/${missionId}`);
  };

  // attemptCount > 0이면 이미 푼 적 있으므로 영상 안 봐도 퀴즈 버튼 활성화
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
