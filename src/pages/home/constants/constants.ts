import BackgroundIcon from "@/assets/icons/ic_background.svg?react";
import BottomIcon from "@/assets/icons/ic_bottom.svg?react";
import ExpressionIcon from "@/assets/icons/ic_expression.svg?react";
import HaberdasheryIcon from "@/assets/icons/ic_haberdashery.svg?react";
import TopIcon from "@/assets/icons/ic_top.svg?react";

import type { ToolbarItem } from "../types/types";

export const CUSTOMIZATION_ITEMS: ToolbarItem[] = [
  { category: "BACKGROUND", icon: BackgroundIcon, label: "배경" },
  { category: "FACE", icon: ExpressionIcon, label: "표정" },
  { category: "TOP", icon: TopIcon, label: "상의" },
  { category: "BOTTOM", icon: BottomIcon, label: "하의" },
  { category: "MISC", icon: HaberdasheryIcon, label: "잡화" },
];
