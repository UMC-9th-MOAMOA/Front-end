import IcAcorn from "@/assets/icons/ic_acorn.svg?react";
import { Button } from "@/components/common/button/Button";
import { useNavigate } from "react-router-dom";

export default function AcornSummary({ count }: { count: number }) {
  const navigate = useNavigate();

  const goUseAcorn = () => {
    navigate("/");
  };

  return (
    <section className="mt-23 w-full px-2">
      <div className="mx-auto flex w-full justify-center">
        <div className="flex h-106 w-full min-w-[325px] max-w-full flex-col justify-between gap-2 rounded-lg bg-white shadow-sm">
          <span className="body-2 pt-12 pl-28 text-gray-700">내 도토리</span>

          <div className="flex items-center justify-between pb-14">
            <div className="flex items-center gap-1.5 pl-21.5 text-black">
              <IcAcorn className="h-40 w-29" aria-hidden />
              <div className="flex items-center gap-1.5">
                <span className="heading-2">{count}</span>
                <span className="heading-5">개</span>
              </div>
            </div>

            <div className="pr-20.5">
              <Button
                type="button"
                onClick={goUseAcorn}
                className="body-2 h-40 min-w-131 whitespace-nowrap rounded-lg bg-moamoa-50 px-0 px-16 py-10 text-moamoa-600 active:bg-moamoa-100"
              >
                도토리 사용하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
