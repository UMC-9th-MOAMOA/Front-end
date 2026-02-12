import SquirrelOnboarding from "@/assets/images/squirrel_onboarding.svg";
import { Button } from "@/components/common/button/Button";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import type { OnboardingPayload } from "@/types/onboarding/onboarding";
import OnboardingCard from "../components/OnboardingCard";
import { useInterests } from "../hooks/useInterests";

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
  const { data: interests = [], isLoading, isError } = useInterests();

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

  if (isLoading) {
    return (
      <section className="mt-60 flex flex-1 flex-col items-center justify-center gap-16 pb-24">
        <div className="scale-125">
          <LoadingSpinner />
        </div>
        <p className="body-2 text-black">관심사를 불러오는 중...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mt-60 flex flex-1 items-center justify-center pb-24">
        <p className="body-2 text-black">
          관심사를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
        </p>
      </section>
    );
  }

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
        {interests.map((interest) => {
          const interestId = interest.id;
          const isSelected = payload.selections.some(
            (selection) => selection.interestId === interestId
          );

          return (
            <button
              key={interest.id}
              type="button"
              className="text-left"
              onClick={() => toggleTopic(interestId)}
            >
              <OnboardingCard
                variant="chip"
                title={interest.name}
                selected={isSelected}
              />
            </button>
          );
        })}
      </div>
      <p className="body-5 mt-40 text-center text-gray-600">
        관심사는 추후 변경 및 복수 선택이 가능합니다.
      </p>
      <div className="sticky bottom-0 mt-40 w-full bg-gray-50">
        <Button
          type="button"
          className="heading-5 w-full rounded-lg bg-moamoa-300 py-12 text-white active:bg-moamoa-500 disabled:text-gray-600"
          disabled={payload.selections.length === 0}
          onClick={() => {
            onChange(payload);
            onNext();
          }}
        >
          계속하기
        </Button>
      </div>
    </section>
  );
}
