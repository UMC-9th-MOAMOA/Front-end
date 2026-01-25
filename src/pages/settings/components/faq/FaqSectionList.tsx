import { useState } from "react";
import IcLeft from "@/assets/icons/ic_left.svg?react";

type FaqItem = {
  question: string;
  answer: string;
  hasImage?: boolean;
};

type FaqSection = {
  title: string;
  items: FaqItem[];
};

const FAQ_SECTIONS: FaqSection[] = [
  {
    title: "1. 자주 묻는 질문",
    items: [
      { question: "질문/답변 박스", answer: "답변 내용이 들어갑니다." },
      {
        question: "질문/답변 박스",
        answer: "답변 내용이 들어갑니다.",
        hasImage: true,
      },
      { question: "질문/답변 박스", answer: "답변 내용이 들어갑니다." },
    ],
  },
  {
    title: "2. 자주 묻는 질문",
    items: [
      { question: "질문/답변 박스", answer: "답변 내용이 들어갑니다." },
      {
        question: "질문/답변 박스",
        answer: "답변 내용이 들어갑니다.",
        hasImage: true,
      },
      { question: "질문/답변 박스", answer: "답변 내용이 들어갑니다." },
    ],
  },
];

export default function FaqSectionList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex w-full flex-col items-center gap-12">
      {FAQ_SECTIONS.map((section, idx) => (
        <div
          key={section.title}
          className="flex w-full flex-col items-start justify-center gap-20"
        >
          <p className="heading-3 whitespace-nowrap text-[var(--color-black)]">
            {section.title}
          </p>

          <div className="flex w-full flex-col">
            {section.items.map((item, itemIndex) => {
              const numericKey = idx * 100 + itemIndex;
              const isOpen = openIndex === numericKey;

              return (
                <div
                  key={`${idx}-${itemIndex}`}
                  className={[
                    "flex w-full flex-col self-stretch",
                    isOpen
                      ? "h-202 gap-23 pt-11 pr-18 pb-9 pl-16"
                      : "py-8 pr-18 pl-16",
                  ].join(" ")}
                >
                  <div className="flex w-full items-center gap-5">
                    <span className="body-2 h-21 w-15 text-[var(--color-black)]">
                      Q.
                    </span>
                    <span className="body-2 flex-1 text-[var(--color-black)]">
                      {item.question}
                    </span>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : numericKey)}
                      className="flex h-24 w-24 items-center justify-center"
                      aria-label={isOpen ? "닫기" : "열기"}
                    >
                      <IcLeft
                        className={[
                          "h-16 w-16 text-[var(--color-gray-700)]",
                          isOpen ? "rotate-90" : "rotate-270",
                        ].join(" ")}
                        aria-hidden
                      />
                    </button>
                  </div>

                  {isOpen && (
                    <div
                      className={[
                        "flex h-135 w-full rounded-lg bg-[var(--color-white)]",
                        item.hasImage
                          ? "items-center gap-8 pt-16 pr-28 pb-15 pl-14"
                          : "items-center justify-center pt-16 pr-28 pb-15 pl-29",
                      ].join(" ")}
                    >
                      {item.hasImage ? (
                        <>
                          <div className="h-96 w-100 rounded-md bg-[var(--color-gray-300)]" />
                          <div className="h-105 flex-1">
                            <span className="body-4 block truncate text-[var(--color-gray-500)]">
                              {item.answer}
                            </span>
                          </div>
                        </>
                      ) : (
                        <span className="body-4 truncate text-[var(--color-gray-500)]">
                          {item.answer}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="h-2 w-full bg-[var(--color-gray-200)]" />
        </div>
      ))}
    </div>
  );
}
