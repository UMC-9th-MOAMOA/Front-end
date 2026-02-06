import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import IcLeft from "@/assets/icons/ic_left.svg?react";
import IcReload from "@/assets/icons/ic_reload.svg?react";
import AsyncBoundary from "@/components/AsyncBoundary";
import { Button } from "@/components/common/button/Button";
import TodayMissionList from "./components/TodayMissionList";

export default function TodayMissionListView() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const time = searchParams.get("time");
  const timeValue = time ? Number(time) : null;

  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: ["missions", "recommended", { time: timeValue }],
    });
  };

  return (
    <div>
      <div className="mt-32">
        <IcLeft
          className="size-24 cursor-pointer"
          onClick={() => navigate(-1)}
        />
      </div>

      <h2 className="heading-2 -mt-19 text-center text-black">
        오늘의 미션
        <br className="min-[450px]:hidden" /> 추천 리스트입니다!
      </h2>

      <div className="mt-19 flex justify-end">
        <Button
          onClick={handleRefresh}
          leftIcon={<IcReload className="size-19" />}
          className="body-2 gap-6 rounded-2xl bg-moamoa-50 px-16 py-8 text-moamoa-400"
        >
          새로고침
        </Button>
      </div>

      <AsyncBoundary>
        <TodayMissionList />
      </AsyncBoundary>
    </div>
  );
}
