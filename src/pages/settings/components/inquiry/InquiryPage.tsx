import { Suspense, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/common/header/Header";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import type { InquiryCategoryServer } from "@/types/inquiry/inquiry";
import type {
  InquiryCategory,
  InquiryDraft,
  TabKey,
} from "../../types/inquiry.type";

import BottomActionBar from "../common/BottomActionBar";
import { useCreateInquiry } from "./hooks/useCreateInquiry";
import InquiryList from "./InquiryList";
import InquiryTabs from "./InquiryTabs";
import InquiryWriteForm from "./InquiryWriteForm";

const CATEGORY_TO_SERVER: Record<InquiryCategory, InquiryCategoryServer> = {
  보상: "REWARD",
  "미션 및 퀴즈": "MISSION_QUIZ",
  "상점 및 꾸미기": "SHOP_DECORATION",
  계정: "ACCOUNT",
  기타: "ETC",
};

export default function InquiryPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>("write");
  const [agreed, setAgreed] = useState(false);
  const [draft, setDraft] = useState<InquiryDraft>({
    category: null,
    title: "",
    content: "",
    images: [],
  });
  const location = useLocation();

  useEffect(() => {
    const state = location.state as {
      consentAgreed?: boolean;
      draft?: InquiryDraft;
    } | null;
    if (typeof state?.consentAgreed === "boolean") {
      setAgreed(state.consentAgreed);
    }
    if (state?.draft) {
      setDraft(state.draft);
    }
  }, [location.state]);

  const { mutate, isPending } = useCreateInquiry();

  const canSubmit =
    draft.category !== null &&
    draft.title.trim().length > 0 &&
    draft.content.trim().length > 0;

  return (
    <div className="min-h-screen w-full bg-white">
      <Header title="문의하기" property="common" />

      <div className="-mx-25 mt-14 h-2 bg-gray-200" />

      <div className="flex w-full flex-col items-center">
        <div className="mt-24">
          <InquiryTabs tab={tab} onChange={setTab} />
        </div>
      </div>

      <div className="-mx-25 h-2 bg-gray-200" />

      <div className="flex w-full flex-col items-center">
        {tab === "write" ? (
          <InquiryWriteForm agreed={agreed} draft={draft} setDraft={setDraft} />
        ) : (
          <Suspense fallback={<LoadingSpinner />}>
            <InquiryList
              onSelect={(id) => navigate(`/settings/inquiry/${id}`)}
            />
          </Suspense>
        )}
      </div>

      {tab === "write" && (
        <BottomActionBar
          label={isPending ? "접수 중..." : "문의 접수"}
          disabled={!agreed || !canSubmit || isPending}
          buttonClassName={agreed ? "bg-moamoa-300" : "bg-gray-300"}
          onClick={() => {
            if (!agreed || !canSubmit || isPending) return;

            mutate(
              {
                category: CATEGORY_TO_SERVER[draft.category!],
                title: draft.title.trim(),
                content: draft.content.trim(),
                termsAgreed: agreed,
                images: draft.images,
              },
              {
                onSuccess: (result) => {
                  // ✅ 성공 후 행동 택1
                  // 1) 상세로 이동
                  navigate(`/settings/inquiry/${result.inquiryId}`);

                  // 2) 또는 탭을 list로 전환
                  // setTab("list");

                  // (선택) 폼 초기화
                  // setDraft({ category: null, title: "", content: "", images: [] });
                },
              }
            );
          }}
        />
      )}
    </div>
  );
}
