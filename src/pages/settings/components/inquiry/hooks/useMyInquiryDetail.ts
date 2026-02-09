import { useSuspenseQuery } from "@tanstack/react-query";
import { getMyInquiryDetail } from "@/apis/inquiry/inquiry";

export const useMyInquiryDetail = (inquiryId: number) => {
  return useSuspenseQuery({
    queryKey: ["inquiry", "my", "detail", inquiryId],
    queryFn: () => getMyInquiryDetail(inquiryId),
  });
};
