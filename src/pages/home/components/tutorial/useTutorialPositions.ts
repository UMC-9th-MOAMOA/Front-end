import type { RefObject } from "react";
import { useEffect, useState } from "react";
import type { ComponentPositions } from "./TutorialOverlay";

export const useTutorialPositions = (
  acornRef: RefObject<HTMLDivElement | null>,
  pocketRef: RefObject<HTMLButtonElement | null>,
  boomerangRef: RefObject<HTMLButtonElement | null>,
  toolbarRef: RefObject<HTMLDivElement | null>,
  questionBoxRef: RefObject<HTMLDivElement | null>
) => {
  const [positions, setPositions] = useState<ComponentPositions>({});

  useEffect(() => {
    const updatePositions = () => {
      setPositions({
        acorn: acornRef.current?.getBoundingClientRect(),
        pocket: pocketRef.current?.getBoundingClientRect(),
        boomerang: boomerangRef.current?.getBoundingClientRect(),
        toolbar: toolbarRef.current?.getBoundingClientRect(),
        questionBox: questionBoxRef.current?.getBoundingClientRect(),
      });
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, [acornRef, pocketRef, boomerangRef, toolbarRef, questionBoxRef]);

  return positions;
};
