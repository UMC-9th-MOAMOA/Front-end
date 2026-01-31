import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/common/header/Header";
import type { AnswerStatus } from "../../types/inquiry.type";
import StatusPill from "./StatusPill";
import { mockInquiryDetail } from "../../mocks/inquiry/inquiry.mock";

// TODO(API 연결 시): GET /inquiries/{inquiryId} 결과로 교체

export default function InquiryDetailPage() {
  const params = useParams();
  const inquiryId = Number(params.inquiryId);

  const data = useMemo(() => {
    return mockInquiryDetail[inquiryId] ?? mockInquiryDetail[101];
  }, [inquiryId]);

  return (
    <div className="min-h-screen w-full bg-[var(--color-white)]">
      <Header title="문의하기" property="common" />

      <div className="flex w-full flex-col items-center">
        <div className="mt-14 h-2 w-full bg-[var(--color-gray-200)]" />

        <div className="mt-28 flex w-full flex-col items-start gap-0">
          <div className="flex items-center gap-12">
            <StatusPill status={data.answerStatus} />
            <span className="body-4 whitespace-nowrap text-black">
              {data.createdAt}
            </span>
          </div>

          <p className="mt-20 heading-2 w-full truncate text-black">
            {data.title}
          </p>

          <p className="mt-16 body-4 w-full text-black">
            {data.content}
          </p>
        </div>
      </div>
    </div>
  );
}
