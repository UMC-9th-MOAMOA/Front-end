import SquirrelOnboarding from "@/assets/images/squirrel_onboarding.svg";
import { Button } from "@/components/common/button/Button";
import type { OnboardingPayload } from "@/types/onboarding";
import OnboardingCard from "../components/OnboardingCard";
import { ONBOARDING_TOPICS } from "../constants/onboardingData";

interface OnboardingStep1ViewProps {
  payload: OnboardingPayload;
  onChange: (next: OnboardingPayload) => void;
  onNext: () => void;
}

export default function OnboardingStep1View({
  payload,
  onChange,
  onNext,
}: OnboardingStep1ViewProps) {
  const topics = ONBOARDING_TOPICS.slice(0, 5);

  const toggleTopic = (interestId: number) => {
    const exists = payload.selections.some(
      (selection) => selection.interestId === interestId
    );
    const nextSelections = exists
      ? payload.selections.filter(
          (selection) => selection.interestId !== interestId
        )
      : [...payload.selections, { interestId, subInterestIds: [] }];

    onChange({ ...payload, selections: nextSelections });
  };

  return (
    <section className="mt-13 flex flex-col items-center pb-24">
      <img
        src={SquirrelOnboarding}
        alt="온보딩 다람쥐"
        className="h-74 w-auto"
      />
      <h2 className="heading-2 mt-9 text-black">
        당신의 관심사를 골라주세요 !
      </h2>
      <div className="mt-46 flex w-full flex-col gap-14">
        {topics.map((topic, index) => {
          const interestId = index + 1;
          const isSelected = payload.selections.some(
            (selection) => selection.interestId === interestId
          );

          return (
            <button
              key={topic.id}
              type="button"
              className="text-left"
              onClick={() => toggleTopic(interestId)}
            >
              <OnboardingCard
                variant="chip"
                title={topic.label}
                selected={isSelected}
              />
            </button>
          );
        })}
      </div>
      <p className="body-5 mt-95 text-gray-600">
        관심사는 추후 변경 및 복수 선택이 가능합니다.
      </p>
      <Button
        type="button"
        className="heading-5 mt-25 w-full rounded-lg bg-moamoa-300 py-12 text-white active:bg-moamoa-500 disabled:text-gray-600"
        disabled={payload.selections.length === 0}
        onClick={() => {
          onChange(payload);
          onNext();
        }}
      >
        계속하기
      </Button>
    </section>
  );
}
