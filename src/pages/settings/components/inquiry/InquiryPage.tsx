import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/common/header/Header";
import InquiryList from "./InquiryList";
import InquiryTabs from "./InquiryTabs";
import InquiryWriteForm from "./InquiryWriteForm";
import type { TabKey } from "../../types/inquiry.type";

export default function InquiryPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>("write");

  return (
    <div className="min-h-screen w-full bg-[var(--color-white)]">
      <Header title="문의하기" property="common" />

      <div className="flex min-h-1137 w-full flex-col items-center">
        <div className="h-14" />
        <div className="h-2 w-full bg-[var(--color-gray-200)]" />

        <div className="h-24" />
        <InquiryTabs tab={tab} onChange={setTab} />
        <div className="h-2 w-full bg-[var(--color-gray-200)]" />

        {tab === "write" ? (
          <InquiryWriteForm />
        ) : (
          <InquiryList onSelect={(id) => navigate(`/settings/inquiry/${id}`)} />
        )}
      </div>
    </div>
  );
}
