import { useMutation, useQueryClient } from "@tanstack/react-query";
import { equipItem } from "@/apis/shop/shop";

export const useEquipItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: number) => equipItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shopItems"] });
      queryClient.invalidateQueries({ queryKey: ["home"] });
    },
  });
};
