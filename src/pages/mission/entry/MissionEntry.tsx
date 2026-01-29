import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/common/header/Header";
import MissionInfoCard from "./components/MissionInfoCard";

export default function MissionEntry() {
  const navigate = useNavigate();
  const [isContentWatched, setIsContentWatched] = useState(false);
  const watchTimeoutRef = useRef<number | null>(null);

  const missionInfo = {
    // 임시 데이터 (서버 연동 전까지 사용)
    missionId: "1",
    organization: "00분",
    category: "카테고리",
    keywords: ["키워드", "키워드", "키워드"],
    thumbnailUrl: "",
    contentUrl:
      "https://www.youtube.com/watch?v=sgxwL8V39Lc&list=RDnA4Ixnc7c34&index=26",
  };

  const handleContentClick = () => {
    console.log("콘텐츠 보러가기");
    if (watchTimeoutRef.current) window.clearTimeout(watchTimeoutRef.current);
    watchTimeoutRef.current = window.setTimeout(() => {
      setIsContentWatched(true);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (watchTimeoutRef.current) {
        window.clearTimeout(watchTimeoutRef.current);
      }
    };
  }, []);

  const handleStartQuiz = () => {
    console.log("퀴즈 시작");
    navigate(`/mission/quiz/${missionInfo.missionId}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header title="미션 수행하기" property="common" />

      <div className="flex w-full flex-col items-center py-31">
        <MissionInfoCard
          {...missionInfo}
          isContentWatched={isContentWatched}
          onContentClick={handleContentClick}
          onQuizStart={handleStartQuiz}
        />
      </div>
    </div>
  );
}
