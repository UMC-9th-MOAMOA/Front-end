import { useQueryClient } from "@tanstack/react-query";
import { useDrag } from "@use-gesture/react";
import { AnimatePresence, motion } from "motion/react";
import type { RefObject } from "react";
import { useState } from "react";
import { dismissPopup } from "@/apis/home/home";
import TutorialControls from "./TutorialControls";
import TutorialIndicators from "./TutorialIndicators";
import TutorialStep1 from "./TutorialStep1";
import TutorialStep2 from "./TutorialStep2";
import { useTutorialPositions } from "./useTutorialPositions";

export interface ComponentPositions {
  acorn?: DOMRect;
  pocket?: DOMRect;
  boomerang?: DOMRect;
  toolbar?: DOMRect;
  questionBox?: DOMRect;
}

interface TutorialOverlayProps {
  onClose: () => void;
  acornRef: RefObject<HTMLDivElement | null>;
  pocketRef: RefObject<HTMLButtonElement | null>;
  boomerangRef: RefObject<HTMLButtonElement | null>;
  toolbarRef: RefObject<HTMLDivElement | null>;
  questionBoxRef: RefObject<HTMLDivElement | null>;
}

const TOTAL_STEPS = 2;
const SWIPE_THRESHOLD = 100;

const TutorialOverlay = ({
  onClose,
  acornRef,
  pocketRef,
  boomerangRef,
  toolbarRef,
  questionBoxRef,
}: TutorialOverlayProps) => {
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const positions = useTutorialPositions(
    acornRef,
    pocketRef,
    boomerangRef,
    toolbarRef,
    questionBoxRef
  );

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleClose = async () => {
    if (dontShowAgain) {
      try {
        await dismissPopup("HOME_TUTORIAL");
        queryClient.invalidateQueries({ queryKey: ["home"] });
      } catch {}
    }
    onClose();
  };

  const bind = useDrag(
    ({ down, movement: [mx] }) => {
      if (!down) {
        if (mx < -SWIPE_THRESHOLD && currentStep < TOTAL_STEPS) {
          setDirection(1);
          setCurrentStep(currentStep + 1);
        } else if (mx > SWIPE_THRESHOLD && currentStep > 1) {
          setDirection(-1);
          setCurrentStep(currentStep - 1);
        }
      }
    },
    { axis: "x" }
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50"
    >
      <div
        className="relative h-full w-full touch-none overflow-hidden"
        {...bind()}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial={{ x: direction > 0 ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: direction > 0 ? "-100%" : "100%" }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            {currentStep === 1 ? (
              <TutorialStep1 positions={positions} />
            ) : (
              <TutorialStep2 positions={positions} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ zIndex: 30, position: "relative" }}>
        <TutorialIndicators currentStep={currentStep} totalSteps={TOTAL_STEPS} />
      </div>

      <div style={{ zIndex: 30, position: "relative" }}>
        <TutorialControls
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          dontShowAgain={dontShowAgain}
          onDontShowAgainToggle={() => setDontShowAgain(!dontShowAgain)}
          onNext={handleNext}
          onClose={handleClose}
        />
      </div>
    </motion.div>
  );
};

export default TutorialOverlay;