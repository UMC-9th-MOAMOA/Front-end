import { useEffect, useRef, useState } from "react";
import Header from "@/components/common/header/Header";
import MissionInfoCard from "./components/MissionInfoCard";

export default function MissionEntry() {
  const [isContentWatched, setIsContentWatched] = useState(false);
  const watchTimeoutRef = useRef<number | null>(null);

  const missionInfo = {
    // 임시 데이터 (서버 연동 전까지 사용)
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
      // 컴포넌트 언마운트 시 타임아웃 정리
      if (watchTimeoutRef.current) {
        window.clearTimeout(watchTimeoutRef.current);
      }
    };
  }, []);

  const handleStartQuiz = () => {
    console.log("퀴즈 시작");
    // TODO: 퀴즈 페이지로 이동
  };

  return (
    <div className="flex flex-col items-center pt-21">
      <Header title="미션 수행하기" property="common" />

      <div className="mx-auto mt-30 flex w-full max-w-[375px] flex-col items-center px-21">
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
