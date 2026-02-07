import { authAPI } from "@/apis/axios";
import type { ApiResponse } from "@/types/api/api";
import type {
  EquipResult,
  ItemCategory,
  PurchaseResult,
  ShopItemsResult,
} from "@/types/home/shop";

export const getShopItems = async (category: ItemCategory) => {
  const { data } = await authAPI.get<ApiResponse<ShopItemsResult>>("/items", {
    params: { category },
  });

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};

export const purchaseItem = async (itemId: number) => {
  const { data } = await authAPI.post<ApiResponse<PurchaseResult>>(
    "/members/me/purchases",
    { itemId },
  );

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};

export const equipItem = async (itemId: number) => {
  const { data } = await authAPI.patch<ApiResponse<EquipResult>>(
    "/members/me/avatar/equipment",
    { itemId },
  );

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};
