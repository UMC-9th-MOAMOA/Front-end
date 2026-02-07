import { motion } from "motion/react";
import AsyncBoundary from "@/components/AsyncBoundary";
import { useSheetAnimation } from "../../hooks/useSheetAnimation";
import type { BottomSheetProps } from "../../types/types";
import ShopItemsGrid from "./ShopItemsGrid";

const BottomSheet = ({
  category,
  items,
  isExpanded,
  onExpandChange,
}: BottomSheetProps) => {
  const { y, expandedTop, handlePan, handlePanEnd } = useSheetAnimation(
    isExpanded,
    onExpandChange
  );

  const selectedItem = items.find((item) => item.category === category);
  const Icon = selectedItem?.icon;
  const isBackground = category === "BACKGROUND";

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 z-15 flex w-full flex-col rounded-t-xl bg-white"
      style={{ top: expandedTop, y }}
    >
      <motion.div
        className="cursor-grab touch-none"
        onPan={handlePan}
        onPanEnd={handlePanEnd}
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
      </motion.div>

      <div className="mt-15 mb-10 flex-1 overflow-y-auto px-37 pb-96">
        <AsyncBoundary>
          <ShopItemsGrid category={category} isBackground={isBackground} />
        </AsyncBoundary>
      </div>
    </motion.div>
  );
};

export default BottomSheet;
