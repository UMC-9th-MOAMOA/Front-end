import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInquiry } from "@/apis/inquiry/inquiry";
import { useApiError } from "@/hooks/api/useApiError";
import type { CreateInquiryPayload } from "@/types/inquiry/inquiry";

export const useCreateInquiry = () => {
  const { handleError } = useApiError();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateInquiryPayload) => createInquiry(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["inquiry", "my"] });
    },
    onError: (e) => handleError(e),
  });
};
