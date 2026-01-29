import IcAcornOnboarding from "@/assets/icons/ic_acorn_onboarding.svg?react";
import IcCheckOnboarding from "@/assets/icons/ic_check_onboarding.svg?react";

const LOADING_ITEMS = ["내 관심사 분석 중", "나의 미션 목표 분석 중"];

export default function OnboardingLoadingView() {
  return (
    <section className="mt-140 flex flex-1 flex-col items-center pb-24 text-center">
      <div className="mt-64 flex h-112 w-112 items-center justify-center">
        <div className="relative flex h-112 w-112 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-6 border-gray-200" />
          <div
            className="absolute inset-0 animate-spin rounded-full border-6 border-moamoa-300 border-t-transparent"
            style={{ animationDuration: "3.2s" }}
          />
          <div className="flex h-86 w-86 items-center justify-center rounded-full bg-moamoa-300">
            <IcAcornOnboarding className="h-40 w-40 text-white" aria-hidden />
          </div>
        </div>
      </div>

      <p className="body-2 mt-32 text-black">잠시만 기다려주세요 ...</p>
      <p className="heading-2 mt-12 whitespace-pre-line text-black">
        {"내게 꼭 맞는 맞춤 미션이\n만들어지고 있어요!"}
      </p>

      <div className="mt-57 flex w-full flex-col items-start gap-12 pl-70">
        {LOADING_ITEMS.map((item) => (
          <div key={item} className="flex items-center gap-12">
            <span className="flex h-22 w-22 items-center justify-center rounded-full bg-moamoa-50">
              <IcCheckOnboarding className="h-22 w-22" aria-hidden />
            </span>
            <span className="body-2 text-black">{item}</span>
          </div>
        ))}
      </div>

      <p className="body-5 mt-113 text-gray-600">
        관심사는 추후 변경 및 복수선택이 가능합니다.
      </p>
    </section>
  );
}
