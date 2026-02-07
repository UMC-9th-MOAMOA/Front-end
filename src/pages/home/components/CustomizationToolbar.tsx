import type { ItemCategory } from "@/types/home/shop";
import { cn } from "@/utils/cn/cn";
import type { ToolbarItem } from "../types/types";

interface CustomizationToolbarProps {
  items: ToolbarItem[];
  activeCustomization: ItemCategory | null;
  onItemClick: (category: ItemCategory) => void;
}

const CustomizationToolbar = ({
  items,
  activeCustomization,
  onItemClick,
}: CustomizationToolbarProps) => {
  return (
    <div className="flex flex-col rounded-lg bg-white">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeCustomization === item.category;
        return (
          <button
            key={item.category}
            type="button"
            onClick={() => onItemClick(item.category)}
            className="flex items-center justify-center px-7 py-8 transition-colors"
          >
            <Icon
              className={cn(
                "h-40 w-40",
                isActive ? "text-positive" : "text-gray-500"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export default CustomizationToolbar;
