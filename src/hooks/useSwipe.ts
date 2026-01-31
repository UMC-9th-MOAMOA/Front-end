import { useDrag } from "@use-gesture/react";

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

const SWIPE_THRESHOLD = 50;

export function useSwipe({ onSwipeLeft, onSwipeRight }: SwipeHandlers) {
  const bind = useDrag(
    ({ movement: [mx, my], direction: [dx], velocity: [vx], last }) => {
      if (!last) return;

      const isHorizontalSwipe = Math.abs(mx) > Math.abs(my) * 1.5;
      const hasEnoughDistance = Math.abs(mx) > SWIPE_THRESHOLD;
      const hasEnoughVelocity = vx > 0.3;

      if (isHorizontalSwipe && (hasEnoughDistance || hasEnoughVelocity)) {
        if (dx < 0) {
          onSwipeLeft?.();
        } else if (dx > 0) {
          onSwipeRight?.();
        }
      }
    },
    {
      axis: "lock",
      filterTaps: true,
      pointer: { touch: true },
    }
  );

  return {
    ...bind(),
    style: { touchAction: "pan-y" },
  };
}
