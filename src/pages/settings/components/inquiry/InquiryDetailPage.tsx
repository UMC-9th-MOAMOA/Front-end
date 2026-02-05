import { useParams } from "react-router-dom";
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

  // ✅ suspense query
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
          {/* ✅ 답변/이미지는 UI 요구 나오면 여기 아래에 추가하면 됨 (지금은 UI 수정 안 하기로 했으니 미출력) */}
        </div>
      </div>
    </div>
  );
}
