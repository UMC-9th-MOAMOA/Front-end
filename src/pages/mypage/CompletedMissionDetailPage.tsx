import { useLocation } from "react-router-dom";
import IcPolygon from "@/assets/icons/ic_polygon.svg?react";
import IcSubtract from "@/assets/icons/ic_subtract.svg?react";
import IcUnion from "@/assets/icons/ic_union.svg?react";
import Header from "@/components/common/header/Header";
import BottomActionBar from "@/pages/settings/components/common/BottomActionBar";

type MissionDetailState = {
  title?: string;
  keywords?: string[] | null;
  minute?: number;
  category?: string;
  videoUrl?: string | null;
};

const getYoutubeId = (url?: string | null) => {
  if (!url) return null;
  const match =
    url.match(/[?&]v=([^&]+)/) ||
    url.match(/youtu\.be\/([^?&]+)/) ||
    url.match(/youtube\.com\/embed\/([^?&]+)/);
  return match?.[1] ?? null;
};

export default function CompletedMissionDetailPage() {
  const location = useLocation();
  const state = (location.state ?? {}) as MissionDetailState;

  const title = state.title ?? "";
  const keywords = state.keywords ?? [];
  const minute = state.minute ?? 0;
  const category = state.category ?? "";
  const youtubeId = getYoutubeId(state.videoUrl);
  const thumbnailUrl = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    : "";

  const renderShortAnswerSection = (label: string) => (
    <div className="h-[210px] w-full rounded-[20px] bg-white p-16">
      <div className="flex w-full items-center gap-2">
        <span className="heading-3 text-[#424242]">{label}</span>
        <span className="heading-6 text-[#2664ED]">(단답형)</span>
      </div>
      <div className="mt-12 h-[105px] w-full rounded-[12px] bg-transparent px-12 py-8 text-black">
        <p className="body-2">{label} 문제 텍스트가 여기에 들어갑니다.</p>
      </div>
      <div className="mt-26 flex w-full items-start justify-start rounded-[12px] border border-[#B4C9F9] bg-[#E3EBFD] px-10 py-9 text-left text-[#191919]">
        <p className="body-2">답안</p>
      </div>
    </div>
  );

  return (
    <>
      <Header title="완료 미션" property="common" />

      <div className="mt-44 flex w-full flex-col items-center px-6 pb-48">
        <div className="flex w-full max-w-screen-xl flex-col gap-12">
          <h2 className="heading-4 text-black">{title}</h2>

          <div className="flex w-full flex-row flex-wrap items-center gap-4">
            {(keywords.length > 0
              ? keywords.slice(0, 3)
              : ["키워드", "키워드", "키워드"]
            ).map((keyword, idx) => (
              <span
                key={`${keyword}-${idx}`}
                className="body-4 flex items-center justify-center rounded-[8px] bg-[#E3EBFD] px-16 py-8 text-black"
              >
                {keyword}
              </span>
            ))}
          </div>

          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="body-4 text-black">
                예상 소요시간 : {minute}분
              </span>
            </div>
            <span className="body-4 text-black">{category}</span>
          </div>

          <div className="mt-8 h-[172px] w-full overflow-hidden rounded-[12px] bg-gray-100">
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt="미션 썸네일"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                썸네일 없음
              </div>
            )}
          </div>

          <button
            type="button"
            className="mt-24 flex w-full items-center justify-center gap-14 rounded-[12px] bg-moamoa-100 px-[65px] py-10"
          >
            <span className="heading-6 text-black">콘텐츠 다시 보기</span>
            <IcPolygon className="h-16 w-16 text-moamoa-200" aria-hidden />
          </button>

          <div className="-mx-30 mt-[54px] h-[12px] w-screen bg-gray-100" />

          <div className="flex w-full flex-col items-center gap-48">
            <section className="flex w-full flex-col gap-12">
              {renderShortAnswerSection("Q1")}
            </section>

            <section className="flex w-full flex-col gap-12">
              <div className="h-[239px] w-full rounded-[20px] bg-white p-16">
                <div className="flex w-full items-center gap-2">
                  <span className="heading-3 text-[#424242]">Q2</span>
                  <span className="heading-6 text-[#2664ED]">(OX)</span>
                </div>
                <div className="mt-12 h-[63px] w-full rounded-[12px] bg-transparent px-12 py-8 text-black">
                  <p className="body-2">이 접근 방식에 동의하십니까?</p>
                </div>
                <div className="mt-20 flex h-[116px] w-full items-center gap-20 rounded-[12px] px-4 md:px-20">
                  <div className="flex h-full w-[120px] flex-col items-center gap-4">
                    <span className="body-3 text-center text-[#5586F1]">
                      주장했다
                    </span>
                    <button
                      type="button"
                      className="flex h-[94px] w-full items-center justify-center gap-4 rounded-[12px] border border-[#2664ED] bg-[#B4C9F9] px-6 py-6"
                    >
                      <IcSubtract
                        className="h-47 w-47 text-[#2664ED]"
                        aria-hidden
                      />
                    </button>
                  </div>
                  <div className="flex h-full w-[120px] flex-col items-center gap-4">
                    <span className="body-3 text-center text-[#424242]">
                      주장하지 않았다
                    </span>
                    <button
                      type="button"
                      className="flex h-[94px] w-full flex-col items-center justify-center gap-4 rounded-[12px] border border-[#E0E0E0] bg-[#FAFAFA] px-6 py-6"
                    >
                      <IcUnion
                        className="h-47 w-47 text-[#424242]"
                        aria-hidden
                      />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="flex w-full flex-col gap-12">
              {renderShortAnswerSection("Q3")}
            </section>
          </div>
        </div>
      </div>
      <BottomActionBar label="정답 확인하기" onClick={() => {}} />
    </>
  );
}
