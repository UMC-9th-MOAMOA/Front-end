import { Button } from "@/components/common/button/Button";
import type { OnboardingPayload } from "@/types/onboarding";
import OnboardingCard from "../components/OnboardingCard";
import { ONBOARDING_TIME_PANELS } from "../constants/onboardingData";

interface OnboardingStep3ViewProps {
  payload: OnboardingPayload;
  onChange: (next: OnboardingPayload) => void;
  onNext: () => void;
}

export default function OnboardingStep3View({
  payload,
  onChange,
  onNext,
}: OnboardingStep3ViewProps) {
  const handleSelectPanel = (index: number) => {
    onChange({
      ...payload,
      dailyMissionTime:
        payload.dailyMissionTime === index + 1 ? null : index + 1,
    });
  };

  return (
    <section className="mt-47 flex flex-col items-center pb-24">
      <h2 className="heading-2 whitespace-pre-line text-center text-black">
        {"평소 00님의\n하루 속 빈칸은 어떤 모습인가요?"}
      </h2>

      <div className="mt-71 grid grid-cols-2 gap-16">
        {ONBOARDING_TIME_PANELS.map((panel, index) => (
          <button
            key={panel.id}
            type="button"
            className="text-left"
            onClick={() => handleSelectPanel(index)}
          >
            <OnboardingCard
              variant="panel"
              title={panel.title}
              titleClassName={panel.titleClassName}
              description={panel.description}
              descriptionClassName={panel.descriptionClassName}
              selected={payload.dailyMissionTime === index + 1}
            />
          </button>
        ))}
      </div>
      <div className="absolute inset-x-24 bottom-42">
        <p className="body-5 mb-27 text-center text-gray-600">
          자투리 시간 선택은 필수 선택입니다.
        </p>
        <Button
          type="button"
          className="heading-5 w-full rounded-lg bg-moamoa-300 py-12 text-white active:bg-moamoa-500 disabled:text-gray-600"
          disabled={payload.dailyMissionTime === null}
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
