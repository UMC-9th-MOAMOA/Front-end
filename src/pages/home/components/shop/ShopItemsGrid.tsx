import { useState } from "react";
import type { ItemCategory, ShopItem } from "@/types/home/shop";
import { useShopItems } from "../../hooks/useQuery/useShopItems";
import type { ItemStatus } from "../../types/types";
import ItemCard from "./ItemCard";

interface ShopItemsGridProps {
  category: ItemCategory;
  isBackground: boolean;
}

const ShopItemsGrid = ({ category, isBackground }: ShopItemsGridProps) => {
  const { data } = useShopItems(category);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const getItemStatus = (item: ShopItem): ItemStatus => {
    if (selectedItemId === item.itemId) return "selected";
    if (!item.affordable) return "locked";
    return "owned";
  };

  const handleItemSelect = (itemId: number) => {
    setSelectedItemId(selectedItemId === itemId ? null : itemId);
  };

  return (
    <div className="flex flex-wrap gap-16">
      {data.items.map((item) => (
        <ItemCard
          key={item.itemId}
          item={item}
          isBackground={isBackground}
          status={getItemStatus(item)}
          onSelect={() => handleItemSelect(item.itemId)}
        />
      ))}
    </div>
  );
};

export default ShopItemsGrid;
