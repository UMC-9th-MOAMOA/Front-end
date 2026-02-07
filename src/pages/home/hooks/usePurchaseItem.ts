import { useMutation, useQueryClient } from "@tanstack/react-query";
import { purchaseItem } from "@/apis/shop/shop";

export const usePurchaseItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: number) => purchaseItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shopItems"] });
      queryClient.invalidateQueries({ queryKey: ["home"] });
    },
  });
};
