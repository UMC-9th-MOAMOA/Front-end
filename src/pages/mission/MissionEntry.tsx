import { useState } from "react";
import MissionHeader from "./components/MissionHeader";
import MissionInfoCard from "./components/MissionInfoCard";

export default function MissionEntry() {
  const [isContentWatched, setIsContentWatched] = useState(false);

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
    // TODO: 실제로는 영상 시청 완료 추적 로직 필요
    // 임시로 3초 후 시청 완료로 설정 (테스트용)
    setTimeout(() => {
      setIsContentWatched(true);
    }, 3000);
  };

  const handleStartQuiz = () => {
    console.log("퀴즈 시작");
    // TODO: 퀴즈 페이지로 이동
  };

  return (
    <div className="flex flex-col items-center pt-21">
      <MissionHeader title="미션 수행하기" />

      <div className="mx-auto mt-50 flex w-full max-w-[375px] flex-col items-center px-21">
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
