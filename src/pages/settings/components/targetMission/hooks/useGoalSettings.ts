import { useEffect, useRef, useState } from "react";
import type { GoalRetentionValue } from "@/types/onboarding/onboarding.goal.setting";
import type { DurationKey } from "../types";
import {
  useSettingGoalOnboarding,
  useUpdateSettingGoalOnboarding,
} from "./useSettingGoalOnboarding";

const LOCAL_KEY = "settings:lastGoalConfig";
const MIN_COUNT = 0;
const MAX_COUNT = 5;

type LastGoalConfig = {
  count: number;
  duration: DurationKey;
};

const loadLast = (): LastGoalConfig | null => {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as LastGoalConfig) : null;
  } catch {
    return null;
  }
};

const saveLast = (value: LastGoalConfig) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(value));
};

const toGoalRetention = (key: DurationKey): GoalRetentionValue => {
  switch (key) {
    case "1w":
      return "ONE_WEEK";
    case "2w":
      return "TWO_WEEKS";
    case "1m":
      return "ONE_MONTH";
    default:
      return "CONTINUE";
  }
};

const fromGoalRetention = (
  value: GoalRetentionValue | null | undefined
): DurationKey => {
  switch (value) {
    case "ONE_WEEK":
      return "1w";
    case "TWO_WEEKS":
      return "2w";
    case "ONE_MONTH":
      return "1m";
    default:
      return "keep";
  }
};

type UseGoalSettingsOptions = {
  onSaveSuccess?: () => void;
};

export const useGoalSettings = (options?: UseGoalSettingsOptions) => {
  const { data: goalData } = useSettingGoalOnboarding();
  const { mutate, isPending } = useUpdateSettingGoalOnboarding();
  const didInitRef = useRef(false);
  const isDirtyRef = useRef(false);
  const initialRef = useRef<{
    goalEnabled: boolean;
    count: number;
    duration: DurationKey;
  } | null>(null);

  const [isOn, setIsOn] = useState(true);
  const [dailyCount, setDailyCount] = useState<number>(MIN_COUNT);
  const [duration, setDuration] = useState<DurationKey>("keep");

  useEffect(() => {
    if (isDirtyRef.current) return;

    const goalEnabled = goalData.goalEnabled ?? true;
    const last = loadLast();
    const nextCount =
      goalData.pendingDailyMissionGoal ??
      goalData.dailyMissionGoal ??
      last?.count ??
      MIN_COUNT;
    const nextDuration = fromGoalRetention(
      goalData.pendingGoalRetention ?? goalData.goalRetention
    );
    setIsOn(goalEnabled);
    setDailyCount(nextCount);
    setDuration(nextDuration);

    initialRef.current = {
      goalEnabled,
      count: nextCount,
      duration: nextDuration,
    };

    didInitRef.current = true;
  }, [goalData]);

  const panelBg = isOn ? "bg-moamoa-50" : "bg-gray-200";
  const panelText = isOn ? "" : "text-black";

  const isDirty = (() => {
    if (!initialRef.current) return false;
    if (isOn !== initialRef.current.goalEnabled) return true;
    if (!isOn) return false;
    return (
      dailyCount !== initialRef.current.count ||
      duration !== initialRef.current.duration
    );
  })();

  const handleMinus = () => {
    isDirtyRef.current = true;
    setDailyCount((prev) => Math.max(MIN_COUNT, prev - 1));
  };

  const handlePlus = () => {
    isDirtyRef.current = true;
    setDailyCount((prev) => Math.min(MAX_COUNT, prev + 1));
  };

  const handleToggle = (checked: boolean) => {
    isDirtyRef.current = true;
    if (checked) {
      const last = loadLast();
      if (last) {
        setDailyCount(last.count);
        setDuration(last.duration);
      }
    }
    setIsOn(checked);
  };

  const handleDurationChange = (value: DurationKey) => {
    isDirtyRef.current = true;
    setDuration(value);
  };

  const handleSave = () => {
    if (!isDirty || isPending) return;

    if (!isOn) {
      saveLast({ count: dailyCount, duration });
      mutate(
        { goalEnabled: false },
        {
          onSuccess: () => {
            isDirtyRef.current = false;
            initialRef.current = {
              goalEnabled: false,
              count: dailyCount,
              duration,
            };
            didInitRef.current = true;
            options?.onSaveSuccess?.();
          },
        }
      );
      return;
    }

    const initial = initialRef.current;
    const payload = {
      goalEnabled: true,
      ...(initial && !initial.goalEnabled
        ? { dailyMissionGoal: dailyCount }
        : dailyCount !== initial?.count
          ? { dailyMissionGoal: dailyCount }
          : {}),
      ...(duration !== initial?.duration
        ? { goalRetention: toGoalRetention(duration) }
        : {}),
    };

    const hasPayloadChange =
      !initial?.goalEnabled ||
      "dailyMissionGoal" in payload ||
      "goalRetention" in payload;

    if (!hasPayloadChange) return;

    mutate(payload, {
      onSuccess: () => {
        isDirtyRef.current = false;
        initialRef.current = {
          goalEnabled: true,
          count: dailyCount,
          duration,
        };
        didInitRef.current = true;
        options?.onSaveSuccess?.();
      },
    });
  };

  return {
    isOn,
    dailyCount,
    duration,
    panelBg,
    panelText,
    isDirty,
    isPending,
    handleMinus,
    handlePlus,
    handleToggle,
    handleDurationChange,
    handleSave,
  };
};
