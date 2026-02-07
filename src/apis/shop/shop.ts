import { authAPI } from "@/apis/axios";
import type { ApiResponse } from "@/types/api/api";
import type { ItemCategory, ShopItemsResult } from "@/types/home/shop";

export const getShopItems = async (category: ItemCategory) => {
  const { data } = await authAPI.get<ApiResponse<ShopItemsResult>>("/items", {
    params: { category },
  });

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};
