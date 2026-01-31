import Header from "@/components/common/header/Header";
import IcPencil from "@/assets/icons/ic_pencil.svg?react";
import BottomActionBar from "./common/BottomActionBar";
import FaqSectionList from "./faq/FaqSectionList";

export default function FaqPage() {
  return (
    <div className="min-h-screen w-full bg-[var(--color-gray-50)] pb-98">
      <Header title="FAQ" property="common" />

      <div className="flex w-full flex-col items-center">
        <div className="mt-14 h-2 w-full bg-[var(--color-gray-200)]" />

        <p className="mt-17 heading-3 whitespace-nowrap text-center text-moamoa-300">
          자주 묻는 질문
        </p>

        <div className="mt-28 w-full">
          <FaqSectionList />
        </div>
      </div>

      <BottomActionBar
        label="문의하기"
        leftIcon={<IcPencil className="h-16 w-16" aria-hidden />}
      />
    </div>
  );
}
