import { useEffect, useState } from "react";
import {
  animate,
  useMotionValue,
  usePresence,
  type PanInfo,
} from "motion/react";

const SPRING = { type: "spring" as const, damping: 30, stiffness: 300 };

const getSheetLayout = () => {
  const vh = window.innerHeight;
  const isLandscape = vh < 500;
  return {
    expandedTop: isLandscape ? vh * 0.4 : 412,
    collapsedOffset: isLandscape ? vh * 0.1 : 121,
  };
};

export const useSheetAnimation = (isExpanded: boolean, onExpandChange: (v: boolean) => void) => {
  const [isPresent, safeToRemove] = usePresence();
  const [layout, setLayout] = useState(getSheetLayout);
  const y = useMotionValue(window.innerHeight);

  useEffect(() => {
    const onResize = () => setLayout(getSheetLayout());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (isPresent) {
      animate(y, isExpanded ? 0 : layout.collapsedOffset, SPRING);
    }
  }, [isExpanded, isPresent, y, layout.collapsedOffset]);

  useEffect(() => {
    if (!isPresent) {
      animate(y, window.innerHeight, SPRING).then(() => safeToRemove());
    }
  }, [isPresent, safeToRemove, y]);

  const handlePan = (_: unknown, info: PanInfo) => {
    const base = isExpanded ? 0 : layout.collapsedOffset;
    const newY = base + info.offset.y;
    y.set(Math.max(0, Math.min(layout.collapsedOffset * 1.3, newY)));
  };

  const handlePanEnd = (_: unknown, info: PanInfo) => {
    const { velocity, offset } = info;
    if (velocity.y > 300 || offset.y > 60) {
      onExpandChange(false);
    } else if (velocity.y < -300 || offset.y < -60) {
      onExpandChange(true);
    } else {
      animate(y, isExpanded ? 0 : layout.collapsedOffset, SPRING);
    }
  };

  return { y, expandedTop: layout.expandedTop, handlePan, handlePanEnd };
};
