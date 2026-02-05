import { useNavigate } from "react-router-dom";
import IcPencil from "@/assets/icons/ic_pencil.svg?react";
import Header from "@/components/common/header/Header";
import BottomActionBar from "./common/BottomActionBar";
import FaqSectionList from "./faq/FaqSectionList";

export default function FaqPage() {
  const navigate = useNavigate();
  const handleInquiry = () => navigate("/settings/inquiry");
  return (
    <div className="w-full bg-gray-50">
      <Header title="FAQ" property="common" />

      <div className="-mx-25 mt-14 h-2 bg-gray-200" />

      <div className="flex w-full flex-col items-center">
        <p className="heading-3 mt-17 whitespace-nowrap text-center text-moamoa-300">
          자주 묻는 질문
        </p>

        <div className="mt-28 w-full">
          <FaqSectionList />
        </div>
      </div>

      <BottomActionBar
        label="문의하기"
        leftIcon={<IcPencil className="h-16 w-16" aria-hidden />}
        onClick={handleInquiry}
      />
    </div>
  );
}
