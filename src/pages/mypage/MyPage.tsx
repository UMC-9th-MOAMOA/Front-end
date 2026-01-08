import { useState } from "react";
import Header from "@/components/common/Header";
import AcornHistory from "./components/AcornHistory";
import AcornSummary from "./components/AcornSummary";
import Calendar from "./components/Calendar";
import MissionList from "./components/MissionList"; // 지금 네가 만든 “찜/완료” 화면
import MissionTable from "./components/MissionList"; // 전체 탭에서 쓰던 “성과 아래 표” 컴포넌트
import MyPageTabs from "./components/MyPageTabs";
import PerformanceSection from "./components/PerformanceSection";
import {
  calendarMarks,
  mockAcornCount,
  mockAcornHistory,
  mockPerformance,
} from "./mocks/mypage.mock";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<"all" | "mission" | "acorn">(
    "all"
  );

  return (
    <div className="px-4">
      <Header title="내 스페이스" property="menu" />

      <MyPageTabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "all" && (
        <>
          <Calendar marks={calendarMarks} />
          <PerformanceSection data={mockPerformance} />
        </>
      )}

      {activeTab === "mission" && <MissionList />}

      {activeTab === "acorn" && (
        <>
          <AcornSummary count={mockAcornCount} />
          <AcornHistory items={mockAcornHistory} />
        </>
      )}
    </div>
  );
}
