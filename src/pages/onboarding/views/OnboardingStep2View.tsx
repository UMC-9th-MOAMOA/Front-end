import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/common/button/Button";
import type { OnboardingPayload } from "@/types/onboarding";
import OnboardingCard from "../components/OnboardingCard";
import OnboardingToast from "../components/OnboardingToast";
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
  const [showToast, setShowToast] = useState(false);
  const toastTimerRef = useRef<number | null>(null);
  const buttonWrapperRef = useRef<HTMLDivElement | null>(null);
  const [toastStyle, setToastStyle] = useState<{
    left: number;
    bottom: number;
    width: number;
  } | null>(null);

  useEffect(() => {
    setTopicIndex((prev) =>
      Math.min(prev, Math.max(selectedTopics.length - 1, 0))
    );
  }, [selectedTopics.length]);

  useEffect(() => {
    if (!showToast) {
      setToastStyle(null);
      return;
    }

    const updateToastPosition = () => {
      const buttonEl =
        buttonWrapperRef.current?.querySelector("button") ?? null;
      if (!buttonEl) {
        return;
      }
      const rect = buttonEl.getBoundingClientRect();
      setToastStyle({
        left: rect.left + rect.width / 2,
        bottom: window.innerHeight - rect.top + 20,
        width: rect.width,
      });
    };

    updateToastPosition();

    window.addEventListener("resize", updateToastPosition);
    window.addEventListener("scroll", updateToastPosition, true);

    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = window.setTimeout(() => {
      setShowToast(false);
      toastTimerRef.current = null;
    }, 2000);

    return () => {
      window.removeEventListener("resize", updateToastPosition);
      window.removeEventListener("scroll", updateToastPosition, true);
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
        toastTimerRef.current = null;
      }
    };
  }, [showToast]);

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
      {showToast && toastStyle && (
        <div
          className="fixed z-50 -translate-x-1/2"
          style={{
            left: toastStyle.left,
            bottom: toastStyle.bottom,
            width: toastStyle.width,
          }}
        >
          <OnboardingToast message="세부 관심사를 1개 이상 선택해 주세요" />
        </div>
      )}
      <div className="absolute inset-x-24 bottom-42">
        <p className="body-5 mb-27 text-center text-gray-600">
          관심사는 추후 변경 및 복수 선택이 가능합니다.
        </p>
        <div ref={buttonWrapperRef} className="w-full">
          <Button
            type="button"
            aria-disabled={!canContinueCurrent}
            className={`heading-5 w-full rounded-lg py-12 text-white ${
              canContinueCurrent
                ? "bg-moamoa-300 active:bg-moamoa-500"
                : "bg-gray-300 text-gray-600"
            }`}
            onClick={() => {
              onChange(payload);
              if (!canContinueCurrent) {
                setShowToast(true);
                return;
              }
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
        </div>
      </div>
    </section>
  );
}
