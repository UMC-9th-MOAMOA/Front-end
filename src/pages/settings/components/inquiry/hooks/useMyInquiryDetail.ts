import { useSuspenseQuery } from "@tanstack/react-query";
import { getMyInquiryDetail } from "@/apis/inquiry/inquiry";
import { useApiError } from "@/hooks/api/useApiError";

export const useMyInquiryDetail = (inquiryId: number) => {
  const { handleError } = useApiError();
  const enabled = Number.isFinite(inquiryId);

  return useSuspenseQuery({
    queryKey: ["inquiry", "my", "detail", inquiryId],
    queryFn: () => getMyInquiryDetail(inquiryId),
    enabled,
    onError: (e) => handleError(e),
  });
};
