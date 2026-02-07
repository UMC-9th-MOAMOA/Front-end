import type { ItemCategory } from "@/types/home/shop";

export type ItemStatus = "owned" | "locked" | "selected";

export interface ToolbarItem {
  category: ItemCategory;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export interface BottomSheetProps {
  category: ItemCategory;
  items: ToolbarItem[];
  isExpanded: boolean;
  onExpandChange: (expanded: boolean) => void;
}
