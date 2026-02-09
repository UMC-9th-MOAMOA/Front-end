import IcTutorialCheck from "@/assets/icons/home/tutorial/ic_tutorial_check.svg?react";

interface TutorialControlsProps {
  currentStep: number;
  totalSteps: number;
  dontShowAgain: boolean;
  onDontShowAgainToggle: () => void;
  onNext: () => void;
  onClose: () => void;
}

const TutorialControls = ({
  currentStep,
  totalSteps,
  dontShowAgain,
  onDontShowAgainToggle,
  onNext,
  onClose,
}: TutorialControlsProps) => {
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="pointer-events-auto absolute right-0 bottom-50 left-0 flex items-center justify-between px-layout-side">
      <button
        type="button"
        onClick={onDontShowAgainToggle}
        className="flex items-center gap-6"
      >
        <IcTutorialCheck
          className={dontShowAgain ? "text-moamoa-300" : "text-transparent"}
        />
        <span className="body3 text-white">다시보지않기</span>
      </button>

      <button
        type="button"
        onClick={isLastStep ? onClose : onNext}
        className="body3 rounded-md border border-white px-13 py-7 text-white"
      >
        {isLastStep ? "닫기" : "다음"}
      </button>
    </div>
  );
};

export default TutorialControls;
