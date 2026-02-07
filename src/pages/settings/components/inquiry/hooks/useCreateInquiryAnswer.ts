import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInquiryAnswer } from "@/apis/inquiry/inquiry";
import { useApiError } from "@/hooks/api/useApiError";
import type { CreateInquiryAnswerPayload } from "@/types/inquiry/inquiry";

export const useCreateInquiryAnswer = () => {
  const { handleError } = useApiError();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateInquiryAnswerPayload) =>
      createInquiryAnswer(payload),
    onSuccess: (_data, payload) => {
      qc.invalidateQueries({
        queryKey: ["inquiry", "my", "detail", payload.inquiryId],
      });
      qc.invalidateQueries({ queryKey: ["inquiry", "my"] });
    },
    onError: (e) => handleError(e),
  });
};
