import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/common/header/Header";
import type { AnswerStatus } from "../../types/inquiry.type";
import StatusPill from "./StatusPill";

type InquiryDetail = {
  inquiryId: number;
  title: string;
  content: string;
  createdAt: string;
  answerStatus: AnswerStatus;
};

// TODO(API 연결 시): GET /inquiries/{inquiryId} 결과로 교체
const MOCK_DETAIL: Record<number, InquiryDetail> = {
  101: {
    inquiryId: 101,
    title: "문의 제목입니다. 문의 제목이 길어질 수 있어요.",
    content:
      "문의 내용입니다. 문의 내용이 길어질 수 있어요. 문의 내용이 길어질 수 있어요.",
    createdAt: "2026.01.24",
    answerStatus: "COMPLETED",
  },
  102: {
    inquiryId: 102,
    title: "문의 제목입니다. 문의 제목이 길어질 수 있어요.",
    content:
      "문의 내용입니다. 문의 내용이 길어질 수 있어요. 문의 내용이 길어질 수 있어요.",
    createdAt: "2026.01.20",
    answerStatus: "PENDING",
  },
  103: {
    inquiryId: 103,
    title: "문의 제목입니다. 문의 제목이 길어질 수 있어요.",
    content:
      "문의 내용입니다. 문의 내용이 길어질 수 있어요. 문의 내용이 길어질 수 있어요.",
    createdAt: "2026.01.12",
    answerStatus: "COMPLETED",
  },
};

export default function InquiryDetailPage() {
  const params = useParams();
  const inquiryId = Number(params.inquiryId);

  const data = useMemo(() => {
    return MOCK_DETAIL[inquiryId] ?? MOCK_DETAIL[101];
  }, [inquiryId]);

  return (
    <div className="min-h-screen w-full bg-[var(--color-white)]">
      <Header title="문의하기" property="common" />

      <div className="flex w-full flex-col items-center">
        <div className="h-14" />
        <div className="h-2 w-full bg-[var(--color-gray-200)]" />
        <div className="h-28" />

        <div className="flex w-full flex-col items-start gap-0">
          <div className="flex items-center gap-12">
            <StatusPill status={data.answerStatus} />
            <span className="body-4 whitespace-nowrap text-[var(--color-black)]">
              {data.createdAt}
            </span>
          </div>

          <div className="h-20" />

          <p className="heading-2 w-full truncate text-[var(--color-black)]">
            {data.title}
          </p>

          <div className="h-16" />

          <p className="body-4 w-full text-[var(--color-black)]">
            {data.content}
          </p>
        </div>
      </div>
    </div>
  );
}
