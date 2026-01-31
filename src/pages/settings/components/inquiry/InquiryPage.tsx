import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/common/header/Header";
import InquiryList from "./InquiryList";
import InquiryTabs from "./InquiryTabs";
import InquiryWriteForm from "./InquiryWriteForm";
import type { TabKey } from "../../types/inquiry.type";
import BottomActionBar from "../common/BottomActionBar";

export default function InquiryPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>("write");

  return (
    <div className="min-h-screen w-full bg-white pb-98">
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
          <InquiryWriteForm />
        ) : (
          <InquiryList onSelect={(id) => navigate(`/settings/inquiry/${id}`)} />
        )}
      </div>

      <BottomActionBar label="문의 접수" />
    </div>
  );
}
