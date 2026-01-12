// src/pages/mypage/MyPage.tsx
import Header from "@/components/common/header/Header";
import AcornHistory from "./components/AcornHistory";
import AcornSummary from "./components/AcornSummary";
import Calendar from "./components/Calendar";
import MissionList from "./components/MissionList";
import MyPageTabs from "./components/MyPageTabs";
import PerformanceSection from "./components/PerformanceSection";
import { useMyPageTab } from "./hooks/useMyPageTab";
import {
  calendarMarks,
  mockAcornCount,
  mockAcornHistory,
  mockPerformance,
} from "./mocks/mypage.mock";

export default function MyPage() {
  const { activeTab, changeTab } = useMyPageTab("all");

  return (
    <div className="px-4">
      <Header title="내 스페이스" />

      <MyPageTabs activeTab={activeTab} onChange={changeTab} />

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
