import BottomIcon from "@/assets/icons/ic_bottom.svg?react";
import ExpressionIcon from "@/assets/icons/ic_expression.svg?react";
import HaberdasheryIcon from "@/assets/icons/ic_haberdashery.svg?react";
import TopIcon from "@/assets/icons/ic_top.svg?react";
import type { CustomizationType } from "../components/BottomSheet";

export const CUSTOMIZATION_ITEMS: {
  type: CustomizationType;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}[] = [
  { type: "expression", icon: ExpressionIcon, label: "표정" },
  { type: "top", icon: TopIcon, label: "상의" },
  { type: "bottom", icon: BottomIcon, label: "하의" },
  { type: "haberdashery", icon: HaberdasheryIcon, label: "잡화" },
];
