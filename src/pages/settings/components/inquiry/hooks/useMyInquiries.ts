import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getMyInquiries } from "@/apis/inquiry/inquiry";
import type {
  InquiryAnswerStatusServer,
  InquiryCategoryServer,
  InquiryPeriodServer,
} from "@/types/inquiry/inquiry";

type Cursor = { cursorCreatedAt?: string; cursorId?: number } | undefined;

type Args = {
  category?: InquiryCategoryServer;
  period: InquiryPeriodServer;
  answerStatus: InquiryAnswerStatusServer;
  size?: number;
};

export const useMyInquiries = ({
  category,
  period,
  answerStatus,
  size = 10,
}: Args) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["inquiry", "my", { category, period, answerStatus, size }],
    queryFn: ({ pageParam }: { pageParam: Cursor }) =>
      getMyInquiries({
        category,
        period,
        answerStatus,
        size,
        cursorCreatedAt: pageParam?.cursorCreatedAt,
        cursorId: pageParam?.cursorId,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext || !lastPage.nextCursor) return undefined;
      return {
        cursorCreatedAt: lastPage.nextCursor.createdAt,
        cursorId: lastPage.nextCursor.id,
      };
    },
  });
};
