import IcAcorn from "@/assets/icons/ic_acorn.svg?react";

export default function AcornSummary({ count }: { count: number }) {
  const goUseAcorn = () => {
    // TODO(API/라우팅 연결 시): navigate("/store") 혹은 상점 페이지로 변경
    // navigate("/store");
  };

  return (
    <section className="relative mt-23 h-106 w-325 rounded-xl bg-white shadow-sm">
      <div>
        <h2 className="heading-5 color-black absolute top-12 left-24">
          내 도토리
        </h2>
        <div className="absolute top-43 left-17 flex h-50 w-299 items-center">
          <IcAcorn className="h-40 w-29" aria-hidden />

          <div className="color-black flex items-center gap-8">
            <span className="heading-1">{count}</span>
            <span className="heading-5">개</span>
          </div>

          <div className="w-70" />

          <button
            type="button"
            onClick={goUseAcorn}
            className="heading-5 flex h-43 w-143 items-center justify-center rounded-lg bg-[var(--color-moamoa-50)] text-[var(--color-moamoa-600)] active:bg-[var(--color-moamoa-100)]"
          >
            도토리 사용하기
          </button>
        </div>
      </div>
    </section>
  );
}
