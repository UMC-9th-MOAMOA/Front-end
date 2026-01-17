import IcAcorn from "@/assets/icons/ic_acorn.svg?react";

export default function AcornSummary({ count }: { count: number }) {
  const goUseAcorn = () => {
    // TODO(API/라우팅 연결 시): navigate("/store") 혹은 상점 페이지로 변경
    // navigate("/store");
  };

  return (
    <section className="relative mt-[14px] h-[106px] w-[325px] rounded-[12px] bg-white shadow-sm">
      <div>
        <h2 className="absolute top-[12px] left-[24px] font-bold text-base text-black">
          내 도토리
        </h2>{" "}
        <div className="absolute top-[43px] left-[17px] flex h-[50px] w-[299px] items-center">
          <IcAcorn className="h-[40px] w-[29px]" aria-hidden />

          <div className="flex h-[34px] w-[30px] items-center justify-center font-semibold">
            {count}
          </div>

          <div className="flex h-[25px] w-[16px] items-center justify-center text-gray-500 text-sm">
            개
          </div>
          <div className="w-[52px]" />

          <div className="ml-auto h-[50px] w-[154px]">
            <button
              type="button"
              onClick={goUseAcorn}
              className="flex h-[50px] w-[154px] items-center justify-center rounded-[12px] bg-blue-50 font-semibold text-blue-600 text-sm active:bg-blue-100"
            >
              도토리 사용하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
