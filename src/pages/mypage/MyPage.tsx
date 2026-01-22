// src/pages/mypage/MyPage.tsx
import Header from "@/components/common/header/Header";
import AcornHistory from "./components/AcornHistory";
import AcornSummary from "./components/AcornSummary";
import Calendar from "./components/calendar/Calendar";
import MyPageTabs from "./components/MyPageTabs";
import MissionList from "./components/missioncard/MissionList";
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
    <div>
      <div className="mt-66">
        <Header title="내 스페이스" property="common" />
      </div>
      <div className="mx-19 mt-26">
        <MyPageTabs activeTab={activeTab} onChange={changeTab} />
      </div>

      {activeTab === "all" && (
        <>
          <div className="mt-22 -mr-11 -ml-6">
            <Calendar marks={calendarMarks} />
          </div>
          <div className="mt-[16px] mr-[-10px] ml-[-7px]">
            <PerformanceSection data={mockPerformance} />
          </div>{" "}
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
