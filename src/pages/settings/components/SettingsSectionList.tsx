import type { CSSProperties } from "react";
import IcLeft from "@/assets/icons/ic_left.svg?react";

type SectionItem = {
  label: string;
  path: string;
};

type Section = {
  id: string;
  title: string;
  wrapperClass: string;
  innerClass: string;
  titleClass: string;
  listClass: string;
  buttonClass: string;
  items: SectionItem[];
};

type Props = {
  onNavigate: (path: string) => void;
  dividerStyle: CSSProperties;
};

const sections: Section[] = [
  {
    id: "account",
    title: "계정 설정",
    wrapperClass:
      "flex min-h-174 w-full flex-col items-center gap-22 self-stretch",
    innerClass: "flex min-h-150 w-full flex-col items-start gap-16",
    titleClass: "flex min-h-25 w-full items-center",
    listClass: "flex w-full flex-col gap-3",
    buttonClass:
      "flex min-h-53 w-full items-center justify-between self-stretch py-12",
    items: [
      { label: "회원 정보 수정", path: "/settings/account-info" },
      { label: "비밀번호 변경", path: "/settings/password-change" },
    ],
  },
  {
    id: "goal-mission",
    title: "목표 및 미션 설정",
    wrapperClass:
      "flex min-h-174 w-full flex-col items-center gap-22 self-stretch",
    innerClass: "flex min-h-150 w-full flex-col items-start gap-16",
    titleClass: "flex min-h-25 w-full items-center",
    listClass: "flex w-full flex-col gap-3",
    buttonClass:
      "flex min-h-53 w-full items-center justify-between self-stretch py-12",
    items: [
      { label: "목표 미션 개수", path: "/settings/target-mission-count" },
      { label: "관심사 변경", path: "/settings/interests" },
    ],
  },
  {
    id: "service-tools",
    title: "서비스 편의 기능",
    wrapperClass:
      "flex min-h-174 w-full flex-col items-center gap-22 self-stretch",
    innerClass: "flex min-h-147 w-full flex-col items-start gap-8",
    titleClass: "flex min-h-25 w-full items-center",
    listClass: "flex w-full flex-col gap-8",
    buttonClass:
      "flex min-h-53 w-full items-center justify-between self-stretch py-12",
    items: [
      { label: "FAQ", path: "/settings/faq" },
      { label: "문의하기", path: "/settings/inquiry" },
    ],
  },
];

export default function SettingsSectionList({
  onNavigate,
  dividerStyle,
}: Props) {
  const dividerClass = "h-2 w-full";

  return (
    <div className="flex flex-col gap-20">
      {sections.map((section, index) => (
        <div key={section.id}>
          <div className={section.wrapperClass}>
            <div className={section.innerClass}>
              <div className={section.titleClass}>
                <span className="heading-5 text-black">
                  {section.title}
                </span>
              </div>

              <div className={section.listClass}>
                {section.items.map((item) => (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => onNavigate(item.path)}
                    className={section.buttonClass}
                  >
                    <span className="body-2 font-medium text-black">
                      {item.label}
                    </span>
                    <IcLeft
                      className="h-24 w-24 rotate-180 text-black"
                      aria-hidden
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          {index < sections.length - 1 && (
            <div className={`-mt-20 ${dividerClass}`} style={dividerStyle} />
          )}
        </div>
      ))}
    </div>
  );
}
