import { useDrag } from "@use-gesture/react";
import { useState } from "react";

const SWIPE_THRESHOLD = 50;

interface UseCarouselDragParams {
  totalItems: number;
  onActiveIndexChange?: (nextIndex: number) => void;
}

export function useCarouselDrag({
  totalItems,
  onActiveIndexChange,
}: UseCarouselDragParams) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const bind = useDrag(
    ({ movement: [mx, my], direction: [dx], velocity: [vx], active, last }) => {
      const isHorizontal = Math.abs(mx) > Math.abs(my) * 1.5;

      if (active && isHorizontal) {
        setIsDragging(true);
        setDragX(mx);
      }

      if (last) {
        setIsDragging(false);
        if (isHorizontal && (Math.abs(mx) > SWIPE_THRESHOLD || vx > 0.3)) {
          if (dx < 0) {
            setActiveIndex((prev) => {
              const next = (prev + 1) % totalItems;
              onActiveIndexChange?.(next);
              return next;
            });
          } else if (dx > 0) {
            setActiveIndex((prev) => {
              const next = (prev - 1 + totalItems) % totalItems;
              onActiveIndexChange?.(next);
              return next;
            });
          }
        }
        setDragX(0);
      }
    },
    { axis: "lock", filterTaps: true, pointer: { touch: true } }
  );

  return { activeIndex, dragX, isDragging, bind };
}
