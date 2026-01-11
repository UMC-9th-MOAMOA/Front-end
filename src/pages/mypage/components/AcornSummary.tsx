import { useNavigate } from "react-router-dom";
import IcAcorn from "@/assets/icons/ic_acorn.svg?react";

export default function AcornSummary({ count }: { count: number }) {
  const navigate = useNavigate();

  const goUseAcorn = () => {
    // TODO(API/라우팅 연결 시): navigate("/store") 혹은 상점 페이지로 변경
    console.log("go to store");
    // navigate("/store");
  };

  return (
    <section className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-base text-black">내 도토리</h2>
          <div className="mt-2 flex items-center gap-2 text-gray-800">
            <IcAcorn className="h-[40px] w-[29px]" aria-hidden />
            <span className="font-semibold">{count}</span>
            <span className="text-gray-500 text-sm">개</span>
          </div>
        </div>

        <button
          type="button"
          onClick={goUseAcorn}
          className="rounded-xl bg-blue-50 px-4 py-2 font-semibold text-blue-600 text-sm active:bg-blue-100"
        >
          도토리 사용하기
        </button>
      </div>
    </section>
  );
}
