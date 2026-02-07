export type ItemCategory = "FACE" | "TOP" | "BOTTOM" | "MISC" | "BACKGROUND";

export type ItemType =
  | "FACE"
  | "TOP"
  | "BOTTOM"
  | "HAT"
  | "GLASSES"
  | "SCARF"
  | "SHOES"
  | "GLOVES"
  | "BACKGROUND";

export interface ShopItem {
  itemId: number;
  category: ItemCategory;
  type: ItemType;
  name: string;
  price: number;
  imageUrl: string;
  onSale: boolean;
  owned: boolean;
  equipped: boolean;
  affordable: boolean;
}

export interface ShopItemsResult {
  type: ItemType | null;
  walletPoint: number;
  items: ShopItem[];
}
