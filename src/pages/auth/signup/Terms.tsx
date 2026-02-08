import { useMemo, useState } from "react";
import IcChecked from "@/assets/icons/auth/ic_checked_blue.svg";
import IcUnchecked from "@/assets/icons/auth/ic_unchecked_gray.svg";
import { Button } from "@/components/common/button/Button";
import AuthHeader from "@/pages/auth/components/AuthHeader";
import { cn } from "@/utils/cn/cn";
import { TERMS, type TermKey } from "./constants/terms";

export default function Terms() {
  const [checked, setChecked] = useState<Record<TermKey, boolean>>({
    service: false,
    privacy: false,
    marketing: false,
  });

  const requiredKeys = useMemo(
    () => TERMS.filter((item) => item.required).map((item) => item.key),
    []
  );

  const allChecked = Object.values(checked).every(Boolean);
  const requiredChecked = requiredKeys.every((key) => checked[key]);

  const toggleAll = () => {
    const next = !allChecked;
    setChecked({ service: next, privacy: next, marketing: next });
  };

  const toggleItem = (key: TermKey) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="-mb-96 flex min-h-0 flex-1 flex-col">
      <AuthHeader title="이용 약관 동의" iconType="arrow" />

      <div className="mt-34 flex flex-col">
        <Button
          type="button"
          onClick={toggleAll}
          className={cn(
            "relative mb-44 h-52 w-full justify-start overflow-hidden rounded-lg",
            allChecked ? "bg-moamoa-50" : "bg-gray-100"
          )}
        >
          <div className="ml-17 inline-flex items-center justify-start gap-60">
            <img
              src={allChecked ? IcChecked : IcUnchecked}
              alt=""
              className="h-24 w-24"
            />
            <div className="body-2 text-black">네, 모두 동의합니다</div>
          </div>
        </Button>

        <div className="flex flex-col gap-30">
          {TERMS.map((term) => (
            <section key={term.key} className="flex flex-col gap-10">
              <button
                type="button"
                onClick={() => toggleItem(term.key)}
                aria-pressed={checked[term.key]}
                className="flex items-center gap-8"
              >
                <img
                  src={checked[term.key] ? IcChecked : IcUnchecked}
                  alt=""
                  className="h-20 w-20"
                />
                <span className="heading-6 text-black">{term.title}</span>
                <span className="body-2 text-moamoa-400">
                  ({term.required ? "필수" : "선택"})
                </span>
              </button>

              <div className="max-h-180 w-full overflow-y-auto rounded-lg border border-gray-400 bg-white px-14 py-12">
                <p className="body-4 whitespace-pre-line text-gray-700">
                  {term.content}
                </p>
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 mt-auto bg-white pt-24 pb-40">
        <Button
          type="button"
          disabled={!requiredChecked}
          className={cn(
            "body-2 h-48 w-full text-white",
            requiredChecked ? "bg-moamoa-300" : "bg-gray-300"
          )}
        >
          동의합니다
        </Button>
      </div>
    </div>
  );
}
