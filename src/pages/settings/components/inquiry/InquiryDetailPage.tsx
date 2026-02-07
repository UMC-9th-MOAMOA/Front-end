import { useParams } from "react-router-dom";
import IcReply from "@/assets/icons/ic_reply.svg?react";
import Header from "@/components/common/header/Header";
import { useMyInquiryDetail } from "./hooks/useMyInquiryDetail";

import StatusPill from "./StatusPill";

// TODO(API 연결 시): GET /inquiries/{inquiryId} 결과로 교체

function formatIsoToDotDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

export default function InquiryDetailPage() {
  const params = useParams();
  const inquiryId = Number(params.inquiryId);
  const isValidId = Number.isFinite(inquiryId);

  const { data } = useMyInquiryDetail(inquiryId);

  if (!isValidId) return null;

  const answerStatus = data.answered ? "COMPLETED" : "PENDING";

  return (
    <div className="min-h-screen w-full bg-white">
      <Header title="문의하기" property="common" />

      <div className="-mx-25 mt-14 h-2 bg-gray-200" />

      <div className="flex w-full flex-col items-center">
        <div className="mt-28 flex w-full flex-col items-start gap-0">
          <div className="flex items-center gap-12">
            <StatusPill status={answerStatus} />
            <span className="body-4 whitespace-nowrap text-black">
              {formatIsoToDotDate(data.createdAt)}
            </span>
          </div>
          <p className="heading-2 mt-20 w-full truncate text-black">
            {data.title}
          </p>
          {data.inquiryImageUrls.length > 0 && (
            <div className="mt-16 grid w-full grid-cols-3 gap-20">
              {data.inquiryImageUrls.map((url, index) => (
                <div
                  key={`${url}-${index}`}
                  className="h-139 w-139 overflow-hidden rounded-lg bg-gray-100"
                >
                  <img
                    src={url}
                    alt={`inquiry-attachment-${index + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
          <p className="body-4 mt-16 w-full text-black">{data.content}</p>
          <div
            className="mt-23 mb-23 h-2 w-full rounded-md"
            style={{ background: "var(--MOAMOA-G-200, #EEE)" }}
          />
          <div className="flex w-full flex-col items-start gap-20 self-stretch">
            <div className="flex items-center gap-12">
              <IcReply className="h-24 w-24" aria-hidden />
              <span className="body-4 text-center text-black">담당자 OOO</span>
            </div>

            <div className="flex items-start gap-20">
              <div className="h-139 w-139 rounded-lg bg-moamoa-50" />
              <div className="h-139 w-139 rounded-lg bg-moamoa-50" />
            </div>

            <p className="body-4 text-black">
              {data.answerStatus === "COMPLETED"
                ? "답변 내용이 표시됩니다."
                : "아직 답변이 등록되지 않았어요."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
