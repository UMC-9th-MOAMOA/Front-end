import { useEffect, useState } from "react";
import { Button } from "@/components/common/button/Button";
import type { OnboardingPayload } from "@/types/onboarding";
import OnboardingCard from "../components/OnboardingCard";
import { ONBOARDING_TOPICS } from "../constants/onboardingData";

interface OnboardingStep2ViewProps {
  payload: OnboardingPayload;
  onChange: (next: OnboardingPayload) => void;
  onNext: () => void;
}

export default function OnboardingStep2View({
  payload,
  onChange,
  onNext,
}: OnboardingStep2ViewProps) {
  const selectedTopics = payload.selections
    .map((selection) => ({
      selection,
      topic: ONBOARDING_TOPICS[selection.interestId - 1],
    }))
    .filter((item) => item.topic);

  const [topicIndex, setTopicIndex] = useState(0);

  useEffect(() => {
    setTopicIndex((prev) =>
      Math.min(prev, Math.max(selectedTopics.length - 1, 0))
    );
  }, [selectedTopics.length]);

  const currentTopic = selectedTopics[topicIndex];

  const toggleSubtopic = (interestId: number, subtopicId: number) => {
    const nextSelections = payload.selections.map((selection) => {
      if (selection.interestId !== interestId) {
        return selection;
      }

      const exists = selection.subInterestIds.includes(subtopicId);
      return {
        ...selection,
        subInterestIds: exists
          ? selection.subInterestIds.filter((id) => id !== subtopicId)
          : [...selection.subInterestIds, subtopicId],
      };
    });

    onChange({ ...payload, selections: nextSelections });
  };

  const canContinue =
    payload.selections.length > 0 &&
    payload.selections.every(
      (selection) => selection.subInterestIds.length > 0
    );

  const canContinueCurrent =
    (currentTopic?.selection.subInterestIds.length ?? 0) > 0;
  const titleLabel = currentTopic?.topic?.label ?? "관심사";
  const topicObjectParticle =
    titleLabel === "경제와 금융" || titleLabel === "인문" ? "을" : "를";

  return (
    <section className="mt-47 flex flex-col items-center pb-24">
      <h2 className="heading-3 whitespace-pre-line text-center text-black">
        {`${titleLabel}${topicObjectParticle} 고르셨군요 !\n당신의 세부 관심사를 골라주세요.`}
      </h2>

      {selectedTopics.length > 0 && (
        <div className="mt-67 flex w-full flex-col gap-14">
          {currentTopic?.topic.subtopics.map((subtopic, index) => {
            const subtopicId = index + 1;
            const isSelected =
              currentTopic.selection.subInterestIds.includes(subtopicId);
            return (
              <button
                key={subtopic}
                type="button"
                className="text-left"
                onClick={() =>
                  toggleSubtopic(currentTopic.selection.interestId, subtopicId)
                }
              >
                <OnboardingCard
                  variant="chip"
                  title={subtopic}
                  selected={isSelected}
                />
              </button>
            );
          })}
        </div>
      )}
      <p className="body-5 mt-95 text-gray-600">
        관심사는 추후 변경 및 복수 선택이 가능합니다.
      </p>
      <Button
        type="button"
        className="heading-5 mt-27 w-full rounded-lg bg-moamoa-300 py-12 text-white active:bg-moamoa-500 disabled:text-gray-600"
        disabled={selectedTopics.length === 0 ? true : !canContinueCurrent}
        onClick={() => {
          onChange(payload);
          if (topicIndex < selectedTopics.length - 1) {
            setTopicIndex((prev) => prev + 1);
            return;
          }

          if (canContinue) {
            onNext();
          }
        }}
      >
        계속하기
      </Button>
    </section>
  );
}
