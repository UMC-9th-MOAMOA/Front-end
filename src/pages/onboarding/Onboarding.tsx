import { useState } from "react";
import type {
  OnboardingPayload,
  OnboardingRequest,
} from "@/types/onboarding/onboarding";
import OnboardingHeader from "./components/OnboardingHeader";
import { useUpdateOnboarding } from "./hooks/useUpdateOnboarding";
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
  const { mutate: updateOnboardingMutation } = useUpdateOnboarding();

  const handleSubmit = (
    nextPayload: OnboardingPayload,
    dailyMissionGoal: number
  ) => {
    const request: OnboardingRequest = {
      selections: nextPayload.selections,
      dailyMissionGoal,
      goalRetention: nextPayload.goalRetention ?? "ONE_WEEK",
    };

    updateOnboardingMutation(request);
    setCurrentStep(5);
  };

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
            onSubmit={handleSubmit}
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
