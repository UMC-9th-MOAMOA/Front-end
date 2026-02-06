import { useState } from "react";
import type { OnboardingPayload } from "@/types/onboarding";
import OnboardingHeader from "./components/OnboardingHeader";
import OnboardingLoadingView from "./views/OnboardingLoadingView";
import OnboardingStep1View from "./views/OnboardingStep1View";
import OnboardingStep2View from "./views/OnboardingStep2View";
import OnboardingStep3View from "./views/OnboardingStep3View";
import OnboardingStep4View from "./views/OnboardingStep4View";

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [payload, setPayload] = useState<OnboardingPayload>({
    selections: [],
    dailyMissionTime: null,
    dailyMissionGoal: null,
    goalRetention: "ONE_WEEK",
  });

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <OnboardingStep1View
            payload={payload}
            onChange={setPayload}
            onNext={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
          />
        );
      case 2:
        return (
          <OnboardingStep2View
            payload={payload}
            onChange={setPayload}
            onNext={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
          />
        );
      case 3:
        return (
          <OnboardingStep3View
            payload={payload}
            onChange={setPayload}
            onNext={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
          />
        );
      case 4:
        return (
          <OnboardingStep4View
            payload={payload}
            onChange={setPayload}
            onNext={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
          />
        );
      default:
        return <OnboardingLoadingView />;
    }
  };

  return (
    <main className="flex flex-1 flex-col">
      {currentStep !== 5 && (
        <OnboardingHeader
          currentStep={currentStep}
          totalSteps={4}
          onBack={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
        />
      )}
      {renderStep()}
    </main>
  );
}
