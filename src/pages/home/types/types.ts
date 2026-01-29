export type CustomizationType =
  | "background"
  | "expression"
  | "top"
  | "bottom"
  | "haberdashery";

export type ItemStatus = "owned" | "locked" | "selected";

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  icon?: React.ComponentType<{ className?: string }>;
  image?: string;
}

export interface ToolbarItem {
  type: CustomizationType;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export interface BottomSheetProps {
  type: CustomizationType;
  items: ToolbarItem[];
  isExpanded: boolean;
  onExpandChange: (expanded: boolean) => void;
}
