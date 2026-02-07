import { useMutation, useQueryClient } from "@tanstack/react-query";
import { equipItem } from "@/apis/shop/shop";
import { useApiError } from "@/hooks/api/useApiError";

export const useEquipItem = () => {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: (itemId: number) => equipItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shopItems"] });
      queryClient.invalidateQueries({ queryKey: ["home"] });
    },
    onError: handleError,
  });
};
