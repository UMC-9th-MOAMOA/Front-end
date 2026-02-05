import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/common/header/Header";
import type { TabKey } from "../../types/inquiry.type";
import BottomActionBar from "../common/BottomActionBar";
import InquiryList from "./InquiryList";
import InquiryTabs from "./InquiryTabs";
import InquiryWriteForm from "./InquiryWriteForm";

export default function InquiryPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>("write");
  const [agreed, setAgreed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const next = (location.state as { consentAgreed?: boolean } | null)?.consentAgreed;
    if (typeof next === "boolean") setAgreed(next);
  }, [location.state]);

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
          <InquiryWriteForm agreed={agreed} />
        ) : (
          <InquiryList onSelect={(id) => navigate(`/settings/inquiry/${id}`)} />
        )}
      </div>

      {tab === "write" && (
        <BottomActionBar
          label="문의 접수"
          disabled={!agreed}
          buttonClassName={agreed ? "bg-moamoa-300" : "bg-gray-300"}
          onClick={() => {
            if (!agreed) return;
            // TODO: 문의 접수 API 호출 로직 구현
          }}
        />
      )}
    </div>
  );
}
