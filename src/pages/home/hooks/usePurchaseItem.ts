import { useMutation, useQueryClient } from "@tanstack/react-query";
import { purchaseItem } from "@/apis/shop/shop";
import { useApiError } from "@/hooks/api/useApiError";

export const usePurchaseItem = () => {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: (itemId: number) => purchaseItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shopItems"] });
      queryClient.invalidateQueries({ queryKey: ["home"] });
    },
    onError: handleError,
  });
};
