import { useState } from "react";
import AsyncBoundary from "@/components/AsyncBoundary";
import Header from "@/components/common/header/Header";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import type {
  SpaceCalendarDayItem,
  SpaceCalendarMonthResult,
} from "@/types/calendar/spaceCalendar";
import AcornSection from "./components/AcornSection";
import Calendar from "./components/calendar/Calendar";
import type { AttendanceDay } from "./components/calendar/calendar.types";
import MyPageTabs from "./components/MyPageTabs";
import MissionList from "./components/missioncard/MissionList";
import PerformanceSection from "./components/PerformanceSection";
import { useMyPageTab } from "./hooks/useMyPageTab";
import { useMyProfile } from "./hooks/useMyProfile";
import { useSpaceCalendarDay } from "./hooks/useSpaceCalendarDay";
import { useSpaceCalendarMonth } from "./hooks/useSpaceCalendarMonth";
import type { PerformanceMissionKind } from "./types/mypage.type";

const toYMD = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const startOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

export default function MyPage() {
  const { activeTab, changeTab } = useMyPageTab("all");
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [selectedYMD, setSelectedYMD] = useState(() => toYMD(new Date()));

  return (
    <div>
      <div>
        <Header title="내 스페이스" property="common" />
      </div>
      <div className="mx-19 mt-26">
        <MyPageTabs activeTab={activeTab} onChange={changeTab} />
      </div>

      {activeTab === "all" && (
        <AsyncBoundary
          loadingFallback={<LoadingSpinner className="mx-auto mt-40 size-40" />}
        >
          <AllTabContent
            month={month}
            selectedYMD={selectedYMD}
            onChangeMonth={setMonth}
            onSelectYMD={setSelectedYMD}
          />
        </AsyncBoundary>
      )}

      {activeTab === "mission" && <MissionList />}

      {activeTab === "acorn" && (
        <AsyncBoundary
          loadingFallback={<LoadingSpinner className="mx-auto mt-40 size-40" />}
        >
          <AcornSection />
        </AsyncBoundary>
      )}
    </div>
  );
}

function AllTabContent({
  month,
  selectedYMD,
  onChangeMonth,
  onSelectYMD,
}: {
  month: Date;
  selectedYMD: string;
  onChangeMonth: (m: Date) => void;
  onSelectYMD: (ymd: string) => void;
}) {
  const year = month.getFullYear();
  const monthNumber = month.getMonth() + 1;
  const { data: monthData } = useSpaceCalendarMonth(year, monthNumber);
  const { data: dayData, isLoading: isDayLoading } =
    useSpaceCalendarDay(selectedYMD);
  const { data: profile } = useMyProfile();

  const marks: AttendanceDay[] = [];
  const datePrefix = `${year}-${String(monthNumber).padStart(2, "0")}-`;
  const monthPayload: SpaceCalendarMonthResult = monthData ?? {
    attendedDays: [],
    missionRewardDays: [],
  };

  monthPayload.attendedDays.forEach((d: number) => {
    marks.push({
      date: `${datePrefix}${String(d).padStart(2, "0")}`,
      attended: true,
    });
  });
  monthPayload.missionRewardDays.forEach((d: number) => {
    const date = `${datePrefix}${String(d).padStart(2, "0")}`;
    const existing = marks.find((x) => x.date === date);
    if (existing) {
      existing.hasAcorn = true;
    } else {
      marks.push({ date, attended: false, hasAcorn: true });
    }
  });

  const dayItems = dayData?.items ?? [];
  const rows = dayItems.map((item: SpaceCalendarDayItem, idx: number) => {
    const isMission = item.type.startsWith("MISSION");
    const isDailyReward = item.type === "DAILY_REWARD";
    const isWeeklyReward = item.type === "WEEKLY_REWARD";
    const isAttendanceStreakBonus = item.type === "ATTENDANCE_STREAK_BONUS";
    const kind: PerformanceMissionKind = isMission
      ? "mission"
      : isDailyReward
        ? "dailyReward"
        : isWeeklyReward
          ? "weeklyReward"
          : isAttendanceStreakBonus
            ? "attendanceStreakBonus"
            : "attendance";
    const title = isMission
      ? (item.missionTitle ?? "??")
      : isDailyReward
        ? "????"
        : isWeeklyReward
          ? "????"
          : isAttendanceStreakBonus
            ? "?? ??"
            : "??";

    return {
      id: `${item.type}-${item.occurredAt}-${idx}`,
      durationMin: isMission ? (item.missionDurationMinutes ?? 0) : 0,
      status: "success" as const,
      missions: [
        {
          id: `${item.type}-${idx}`,
          kind,
          title,
          acornDelta: item.amount,
        },
      ],
    };
  });

  const performance = {
    userName: profile.name,
    items: rows,
  };

  return (
    <>
      <div className="mt-22 -mr-11 -ml-6">
        <Calendar
          marks={marks}
          month={month}
          selectedYMD={selectedYMD}
          onChangeMonth={onChangeMonth}
          onSelectYMD={onSelectYMD}
        />
      </div>
      <div className="mt-16 mr-[-10px] mb-50 ml-[-7px]">
        {isDayLoading && !dayData ? (
          <LoadingSpinner className="mx-auto mt-40 size-40" />
        ) : (
          <PerformanceSection data={performance} />
        )}
      </div>
    </>
  );
}
