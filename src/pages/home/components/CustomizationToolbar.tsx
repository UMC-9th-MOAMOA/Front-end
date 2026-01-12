import { cn } from "@/utils/cn/cn";
import type { CustomizationType } from "./BottomSheet";

interface CustomizationToolbarProps {
  items: {
    type: CustomizationType;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
  }[];
  activeCustomization: CustomizationType | null;
  onItemClick: (type: CustomizationType) => void;
}

const CustomizationToolbar = ({
  items,
  activeCustomization,
  onItemClick,
}: CustomizationToolbarProps) => {
  return (
    <div className="absolute top-135 right-0 z-10 flex flex-col rounded-lg bg-white">
      {items.map((item) => {
        const Icon = item.icon;
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
                activeCustomization === item.type
                  ? "text-positive"
                  : "text-gray-500"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export default CustomizationToolbar;
