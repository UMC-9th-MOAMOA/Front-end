import Header from "@/components/common/header/Header";
import FaqSectionList from "./faq/FaqSectionList";

export default function FaqPage() {
  return (
    <div className="min-h-screen w-full bg-[var(--color-gray-50)]">
      <Header title="FAQ" property="common" />

      <div className="flex w-full flex-col items-center">
        <div className="h-14" />
        <div className="h-2 w-full bg-[var(--color-gray-200)]" />
        <div className="h-17" />

        <p className="heading-3 whitespace-nowrap text-center text-[var(--color-moamoa-300)]">
          자주 묻는 질문
        </p>

        <div className="h-28" />
        <FaqSectionList />
      </div>
    </div>
  );
}
