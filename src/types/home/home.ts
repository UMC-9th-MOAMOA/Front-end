import type { ItemType } from "./shop";

export interface EquippedItemInfo {
  itemId: number;
  name: string;
  imageUrl: string;
}

export interface HomeResult {
  memberName: string;
  point: number;
  shouldShowTutorial: boolean;
  equippedItems: Partial<Record<ItemType, EquippedItemInfo>>;
}
