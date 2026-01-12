import { useState } from "react";

export type CustomizationType =
  | "expression"
  | "top"
  | "bottom"
  | "haberdashery";

interface BottomSheetProps {
  type: CustomizationType;
  items: {
    type: CustomizationType;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
  }[];
  sheetTop: number;
  setSheetTop: (top: number) => void;
}

const BottomSheet = ({
  type,
  items,
  sheetTop,
  setSheetTop,
}: BottomSheetProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startTop, setStartTop] = useState(533);

  const selectedItem = items.find((item) => item.type === type);
  const Icon = selectedItem?.icon;

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setStartTop(sheetTop);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaY = e.touches[0].clientY - startY;
    const newTop = Math.max(412, Math.min(533, startTop + deltaY));
    setSheetTop(newTop);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (sheetTop < 472.5) {
      setSheetTop(412);
    } else {
      setSheetTop(533);
    }
  };

  return (
    <div
      className="fixed right-0 left-0 z-15 mx-auto flex max-w-(--width-app) flex-col rounded-t-xl bg-white pb-96 transition-all duration-300"
      style={{
        top: `${sheetTop}px`,
        bottom: 0,
        ...(isDragging && { transition: "none" }),
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex justify-center pt-12">
        <div className="h-4 w-65 rounded-md bg-gray-300" />
      </div>

      <div className="px-37">
        <div className="flex h-41 items-center gap-2 py-15">
          {Icon && <Icon className="h-40 w-40 text-moamoa-200" />}
          <span className="body-2 text-black">{selectedItem?.label}</span>
        </div>
        <div className="h-1 w-full bg-moamoa-200" />
      </div>
      {/* 추후 추가 예정 */}
      <div className="mt-15 flex-1 overflow-y-auto px-37">
        <p className="text-gray-500">커스터마이징 아이템 목록</p>
      </div>
    </div>
  );
};

export default BottomSheet;
