import { useSuspenseQuery } from "@tanstack/react-query";
import { getShopItems } from "@/apis/shop/shop";
import type { ItemCategory } from "@/types/home/shop";

export const useShopItems = (category: ItemCategory) => {
  return useSuspenseQuery({
    queryKey: ["shopItems", category],
    queryFn: () => getShopItems(category),
  });
};
