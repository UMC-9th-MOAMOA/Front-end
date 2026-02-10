import DailyGoalFailure from "@/pages/mission/goal/DailyGoalFailure";
import WeeklyGoalFailure from "@/pages/mission/goal/WeeklyGoalFailure";
import type { GoalPopup } from "@/types/goal/goal";

interface GoalPopupsProps {
  currentPopup: GoalPopup | null;
  onClose: () => void;
  onMissionExplore: () => void;
}

export default function GoalPopups({
  currentPopup,
  onClose,
  onMissionExplore,
}: GoalPopupsProps) {
  if (!currentPopup) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white px-layout-side">
      {currentPopup.goalType === "DAILY" && (
        <DailyGoalFailure
          completedMissions={currentPopup.achievedCount}
          totalMissions={currentPopup.targetCount}
          onClose={onClose}
          onMissionExplore={onMissionExplore}
        />
      )}
      {currentPopup.goalType === "WEEKLY" && (
        <WeeklyGoalFailure
          completedMissions={currentPopup.achievedCount}
          totalMissions={currentPopup.targetCount}
          onClose={onClose}
        />
      )}
    </div>
  );
}
