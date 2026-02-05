import { Button } from "@/components/common/button/Button";
import type { OnboardingPayload } from "@/types/onboarding";

interface OnboardingStep4ViewProps {
  payload: OnboardingPayload;
  onChange: (next: OnboardingPayload) => void;
  onNext: () => void;
}

export default function OnboardingStep4View({
  payload,
  onChange,
  onNext,
}: OnboardingStep4ViewProps) {
  const min = 0;
  const max = 5;
  const value = payload.dailyMissionGoal ?? 0;
  const percent = ((value - min) / (max - min)) * 100;

  const handleSliderChange = (nextValue: number) => {
    onChange({
      ...payload,
      dailyMissionGoal: Math.min(max, Math.max(min, nextValue)),
    });
  };

  return (
    <section className="mt-53 flex flex-col items-center pb-24">
      <h2 className="heading-3 whitespace-pre-line text-center text-black">
        {"하루에 몇 개의 미션을\n수행하고 싶나요?"}
      </h2>
      <p className="body-4 mt-11 text-gray-500">언제든 변경 가능해요 !</p>

      <div className="mt-187 w-full px-12">
        <div className="relative">
          <div className="relative flex items-center">
            <div className="flex w-full">
              {Array.from({ length: max }, (_, index) => {
                const isActive = index < value;
                return (
                  <span
                    key={`segment-${index + 1}`}
                    className={`h-19 flex-1 rounded-full ${
                      isActive ? "bg-moamoa-300" : "bg-moamoa-50"
                    }`}
                  />
                );
              })}
            </div>
            <div
              className="absolute top-1/2 h-18 w-18 -translate-x-1/2 -translate-y-1/2 rounded-full bg-moamoa-400 shadow-[0_0_0_10px_rgba(38,100,237,0.12)]"
              style={{ left: `${percent}%` }}
            />
            <div
              className="absolute -top-96 flex -translate-x-1/2 flex-col items-center"
              style={{ left: `${percent}%` }}
            >
              <div className="heading-2 flex h-60 w-60 items-center justify-center rounded-full bg-moamoa-400 text-white">
                {value}
              </div>
              <div className="-mt-6 h-24 w-24 rounded-full bg-moamoa-400" />
            </div>
            <input
              type="range"
              min={min}
              max={max}
              step={1}
              value={value}
              aria-label="하루 미션 개수"
              className="absolute inset-0 h-32 w-full cursor-pointer opacity-0"
              onChange={(event) =>
                handleSliderChange(Number(event.currentTarget.value))
              }
            />
          </div>
          <div className="body-1 mt-14 flex w-full justify-between text-moamoa-400">
            <span>0</span>
            <span>5</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-24 bottom-42">
        <p className="body-5 mb-27 text-center text-gray-600">
          목표는 설정에서 변경이 가능합니다.
        </p>
        <div className="grid w-full grid-cols-2 gap-12">
          <Button
            type="button"
            className="body-2 h-50 rounded-lg bg-moamoa-50 py-12 text-moamoa-500 active:bg-moamoa-100"
            onClick={() => {
              onChange({ ...payload, dailyMissionGoal: value });
              onNext();
            }}
          >
            계속하기
          </Button>
          <Button
            type="button"
            className="body-2 h-50 rounded-lg bg-moamoa-300 py-12 text-white active:bg-moamoa-500"
            onClick={() => {
              onChange({ ...payload, dailyMissionGoal: null });
              onNext();
            }}
          >
            나중에 설정
          </Button>
        </div>
      </div>
    </section>
  );
}
