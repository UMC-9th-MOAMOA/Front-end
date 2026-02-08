import { useEffect, useRef, useState } from "react";
import IcBundledAcorns from "@/assets/icons/mission/ic_bundled_acorns.svg?react";
import IcSquirrelEatingAcorn from "@/assets/icons/mission/ic_squirrel_eating_acorn.svg?react";
import IcWalkingSquirrel from "@/assets/icons/mission/ic_walking_squirrel.svg?react";

interface QuizProgressBarProps {
  current: number;
  total: number;
}

export default function QuizProgressBar({
  current,
  total,
}: QuizProgressBarProps) {
  const currentProgress = (100 / total) * current;
  const isCompleted = current === total;
  const isStart = current === 0;

  const [showEatingSquirrel, setShowEatingSquirrel] = useState(false);
  const squirrelRef = useRef<HTMLDivElement>(null);
  const acornRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isCompleted) {
      setShowEatingSquirrel(false);
      return;
    }

    const checkCollision = () => {
      if (!squirrelRef.current || !acornRef.current) return false;

      const squirrelRect = squirrelRef.current.getBoundingClientRect();
      const acornRect = acornRef.current.getBoundingClientRect();

      if (squirrelRect.right >= acornRect.left) {
        setShowEatingSquirrel(true);
        return true;
      }
      return false;
    };

    const interval = setInterval(() => {
      if (checkCollision()) {
        clearInterval(interval);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isCompleted]);

  return (
    <div className="flex w-full flex-col pt-101">
      <div className="relative w-full">
        {showEatingSquirrel ? (
          <div className="absolute -right-10 bottom-8">
            <IcSquirrelEatingAcorn className="h-88 w-91 drop-shadow-md" />
          </div>
        ) : (
          <div
            ref={squirrelRef}
            className="absolute bottom-10 z-10 transition-all duration-500 ease-in-out"
            style={{
              left: isStart ? "0px" : `${currentProgress}%`,
              transform: isStart
                ? "translateZ(0)"
                : "translateX(-67px) translateZ(0)",
            }}
          >
            <IcWalkingSquirrel className="h-80 w-67 drop-shadow-md" />
          </div>
        )}

        {!showEatingSquirrel && (
          <div ref={acornRef} className="absolute right-0 bottom-8 z-10">
            <IcBundledAcorns className="h-45.3 w-73" />
          </div>
        )}

        <div className="h-8 w-full overflow-hidden rounded-full bg-moamoa-50">
          <div
            className="h-full rounded-full bg-moamoa-300 transition-all duration-500 ease-in-out"
            style={{ width: `${currentProgress}%` }}
          />
        </div>
      </div>

      <p className="body-2 pt-10 text-center text-gray-600">
        {current}/{total}
      </p>
    </div>
  );
}
