import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/common/button/Button";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import type { OnboardingPayload } from "@/types/onboarding/onboarding";
import OnboardingCard from "../components/OnboardingCard";
import OnboardingToast from "../components/OnboardingToast";
import { useInterestDetails } from "../hooks/useInterestDetails";
import { useInterests } from "../hooks/useInterests";

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
  const {
    data: interests = [],
    isLoading: isInterestsLoading,
    isError: isInterestsError,
  } = useInterests();
  const selectedTopics = payload.selections
    .map((selection) => ({
      selection,
      topic: interests.find(
        (interest) => interest.id === selection.interestId
      ),
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
  const currentInterestId = currentTopic?.selection.interestId;
  const {
    data: currentSubtopics = [],
    isLoading: isDetailsLoading,
    isError: isDetailsError,
  } = useInterestDetails(currentInterestId);

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
  const titleLabel = currentTopic?.topic?.name ?? "관심사";
  const topicObjectParticle = getObjectParticle(titleLabel);

  if (isInterestsLoading || (currentInterestId && isDetailsLoading)) {
    return (
      <section className="mt-60 flex flex-1 flex-col items-center justify-center gap-16 pb-24">
        <div className="scale-125">
          <LoadingSpinner />
        </div>
        <p className="body-2 text-black">관심사를 불러오는 중...</p>
      </section>
    );
  }

  if (isInterestsError || isDetailsError) {
    return (
      <section className="mt-60 flex flex-1 items-center justify-center pb-24">
        <p className="body-2 text-black">
          관심사를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-47 flex flex-col items-center pb-24">
      <h2 className="heading-3 whitespace-pre-line text-center text-black">
        {`${titleLabel}${topicObjectParticle} 고르셨군요 !\n당신의 세부 관심사를 골라주세요.`}
      </h2>

      {selectedTopics.length > 0 && (
        <div className="mt-67 flex w-full flex-col gap-14">
          {currentSubtopics.map((subtopic) => {
            const subtopicId = subtopic.id;
            const isSelected =
              currentTopic.selection.subInterestIds.includes(subtopicId);
            return (
              <button
                key={subtopic.id}
                type="button"
                className="text-left"
                onClick={() =>
                  toggleSubtopic(currentTopic.selection.interestId, subtopicId)
                }
              >
                <OnboardingCard
                  variant="chip"
                  title={subtopic.name}
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

const getObjectParticle = (label: string) => {
  const lastChar = label.trim().slice(-1);
  if (!lastChar) return "를";

  const code = lastChar.charCodeAt(0);
  const isHangul = code >= 0xac00 && code <= 0xd7a3;
  if (!isHangul) return "를";

  const hasJongseong = (code - 0xac00) % 28 !== 0;
  return hasJongseong ? "을" : "를";
};
