interface TutorialIndicatorsProps {
  currentStep: number;
  totalSteps: number;
}

const TutorialIndicators = ({
  currentStep,
  totalSteps,
}: TutorialIndicatorsProps) => {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-50 flex justify-center">
      <div className="pointer-events-auto flex gap-8">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`size-8 rounded-full ${
              currentStep === index + 1
                ? "bg-moamoa-300"
                : "border border-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TutorialIndicators;
