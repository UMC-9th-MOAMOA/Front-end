import { cn } from "@/utils/cn/cn";
import type { CustomizationType, ToolbarItem } from "../types/types";

interface CustomizationToolbarProps {
  items: ToolbarItem[];
  activeCustomization: CustomizationType | null;
  onItemClick: (type: CustomizationType) => void;
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
        const isActive = activeCustomization === item.type;
        return (
          <button
            key={item.type}
            type="button"
            onClick={() => onItemClick(item.type)}
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
