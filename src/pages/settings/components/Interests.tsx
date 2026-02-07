import { useEffect, useRef, useState } from "react";
import Header from "@/components/common/header/Header";
import BottomActionBar from "./common/BottomActionBar";
import InterestCategoryCard from "./interests/InterestCategoryCard";
import InterestsSuccessModal from "./InterestsSuccessModal";
import { useSettingInterests } from "./interests/hooks/useSettingInterests";
import { useSettingOnboarding, useUpdateSettingOnboarding } from "./interests/hooks/useSettingOnboarding";

type SelectedMap = Record<number, number[]>;

export default function InterestPage() {
  const { data: interests } = useSettingInterests();
  const { data: selectedFromServer } = useSettingOnboarding();
  const { mutate, isPending } = useUpdateSettingOnboarding();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [selected, setSelected] = useState<SelectedMap>({});
  const didInitRef = useRef(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  useEffect(() => {
    if (didInitRef.current) {
      return;
    }
    const next: SelectedMap = {};
    interests.forEach((interest) => {
      next[interest.id] = [];
    });
    Object.entries(selectedFromServer).forEach(([interestId, subInterestIds]) => {
      next[Number(interestId)] = subInterestIds;
    });
    setSelected(next);
    didInitRef.current = true;
  }, [interests, selectedFromServer]);

  const toggle = (interestId: number) => {
    setExpanded((prev) => (prev === interestId ? null : interestId));
  };

  const handleToggleSub = (interestId: number, subInterestId: number) => {
    setSelected((prev) => {
      const current = prev[interestId] ?? [];
      const exists = current.includes(subInterestId);
      return {
        ...prev,
        [interestId]: exists
          ? current.filter((id) => id !== subInterestId)
          : [...current, subInterestId],
      };
    });
  };

  const handleSave = () => {
    const selections = Object.entries(selected)
      .filter(([, subInterestIds]) => subInterestIds.length > 0)
      .map(([interestId, subInterestIds]) => ({
        interestId: Number(interestId),
        subInterestIds,
      }));

    mutate(
      { selections },
      {
        onSuccess: () => {
          setIsSuccessOpen(true);
        },
      }
    );
  };

  return (
    <div className="flex w-full flex-col bg-white">
      <Header title="관심사 변경" property="common" />

      <div className="-mx-25 mt-14 h-2 bg-gray-200" />

      <div className="mt-24 w-full px-25 text-center">
        <p className="body-4 whitespace-nowrap text-moamoa-300">
          관심사를 변경하실 수 있습니다
        </p>
      </div>

      <div className="mt-26 flex w-full flex-1 flex-col items-start gap-30">
        {interests.map((cat) => (
          <InterestCategoryCard
            key={cat.id}
            category={cat}
            isOpen={expanded === cat.id}
            selected={selected}
            onToggle={() => toggle(cat.id)}
            onToggleSub={handleToggleSub}
          />
        ))}
      </div>

      <BottomActionBar
        label={isPending ? "저장 중..." : "설정 저장하기"}
        onClick={handleSave}
        disabled={isPending}
      />

      <InterestsSuccessModal
        open={isSuccessOpen}
        onConfirm={() => setIsSuccessOpen(false)}
      />
    </div>
  );
}
