import IcBackShevron from "@/assets/icons/ic_back_chevron.svg?react";

interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
}

export default function OnboardingHeader({
  currentStep,
  totalSteps,
  onBack,
}: OnboardingHeaderProps) {
  const safeTotal = Math.max(totalSteps, 1);
  const safeStep = Math.min(Math.max(currentStep, 1), safeTotal);
  const segmentPercent = 100 / safeTotal;
  const centerPercent =
    safeTotal === 1 ? 50 : ((safeStep - 1) / (safeTotal - 1)) * 100;
  const halfSegment = segmentPercent / 2;
  const clampedCenter = Math.min(
    100 - halfSegment,
    Math.max(halfSegment, centerPercent)
  );
  const showBack = safeStep > 1 && Boolean(onBack);

  const handleBack = () => {
    onBack?.();
  };

  return (
    <div className="mt-18">
      <header className="flex w-full items-center gap-41">
        {showBack ? (
          <button
            type="button"
            aria-label="뒤로가기"
            onClick={handleBack}
            className="flex h-33 w-33 items-center justify-center"
          >
            <IcBackShevron className="h-24 w-24 text-gray-400" />
          </button>
        ) : (
          <div className="h-33 w-33" aria-hidden="true" />
        )}
        <div
          className="relative ml-auto h-8 min-w-240 max-w-700 flex-1 rounded-full bg-moamoa-50"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={safeTotal}
          aria-valuenow={safeStep}
          aria-label="온보딩 진행률"
        >
          <div
            className="absolute top-0 left-0 h-full -translate-x-1/2 rounded-full bg-moamoa-400 transition-all"
            style={{ left: `${clampedCenter}%`, width: `${segmentPercent}%` }}
          />
        </div>
      </header>
      <p className="body-5 text-center text-gray-700">
        {safeStep}/{safeTotal}
      </p>
    </div>
  );
}
