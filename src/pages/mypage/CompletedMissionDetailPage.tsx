import { useParams } from "react-router-dom";
import IcPolygon from "@/assets/icons/ic_polygon.svg?react";
import IcSubtract from "@/assets/icons/ic_subtract.svg?react";
import IcUnion from "@/assets/icons/ic_union.svg?react";
import AsyncBoundary from "@/components/AsyncBoundary";
import Header from "@/components/common/header/Header";
import type { MissionDetailQuiz } from "@/types/mission/missionDetail";
import { useMissionDetail } from "./hooks/useMissionDetail";

type QuizUiType = "short" | "ox" | "multiple";

const getYoutubeId = (url?: string | null) => {
  if (!url) return null;
  const match =
    url.match(/[?&]v=([^&]+)/) ||
    url.match(/youtu\.be\/([^?&]+)/) ||
    url.match(/youtube\.com\/embed\/([^?&]+)/);
  return match?.[1] ?? null;
};

const normalizeQuizType = (type: string): QuizUiType => {
  const v = type.toLowerCase();
  if (v.includes("ox")) return "ox";
  if (v.includes("multiple") || v.includes("choice") || v.includes("객관")) {
    return "multiple";
  }
  return "short";
};

function ShortQuizSection({
  label,
  question,
  answer,
}: {
  label: string;
  question: string;
  answer?: string;
}) {
  return (
    <div className="w-full rounded-2xl bg-white p-16">
      <div className="flex w-full items-center gap-2">
        <span className="heading-3 text-[#424242]">{label}</span>
        <span className="heading-6 text-[#2664ED]">(단답형)</span>
      </div>
      <div className="mt-12 w-full rounded-lg px-12 py-8 text-black">
        <p className="body-2">{question}</p>
      </div>
      <div className="mt-26 flex w-full items-start rounded-lg border border-[#B4C9F9] bg-[#E3EBFD] px-10 py-9 text-left text-black">
        <p className="body-2">{answer ? `답안: ${answer}` : "답안"}</p>
      </div>
    </div>
  );
}

function OxQuizSection({
  label,
  question,
  acceptedAnswers,
}: {
  label: string;
  question: string;
  acceptedAnswers: string[];
}) {
  const normalized = acceptedAnswers.map((x) => x.trim().toUpperCase());
  const isO = normalized.includes("O");
  const isX = normalized.includes("X");

  return (
    <div className="w-full rounded-2xl bg-white p-16">
      <div className="flex w-full items-center gap-2">
        <span className="heading-3 text-[#424242]">{label}</span>
        <span className="heading-6 text-[#2664ED]">(OX)</span>
      </div>
      <div className="mt-12 w-full rounded-lg px-12 py-8 text-black">
        <p className="body-2">{question}</p>
      </div>
      <div className="mt-20 flex w-full items-center gap-20 rounded-lg px-4 md:px-20">
        <div className="flex h-full w-[120px] flex-col items-center gap-4">
          <button
            type="button"
            className={[
              "flex h-[94px] w-[124px] items-center justify-center gap-4 rounded-lg px-6 py-6",
              isO
                ? "border border-[#2664ED] bg-[#B4C9F9]"
                : "border border-[#E0E0E0] bg-[#FAFAFA]",
            ].join(" ")}
          >
            <IcSubtract
              className="h-[47px] w-[47px] text-[#2664ED]"
              aria-hidden
            />
          </button>
        </div>
        <div className="flex h-full w-[120px] flex-col items-center gap-4">
          <button
            type="button"
            className={[
              "flex h-[94px] w-[124px] flex-col items-center justify-center gap-4 rounded-lg px-6 py-6",
              isX
                ? "border border-[#2664ED] bg-[#B4C9F9]"
                : "border border-[#E0E0E0] bg-[#FAFAFA]",
            ].join(" ")}
          >
            <IcUnion
              className={[
                "h-[47px] w-[47px]",
                isX ? "text-moamoa-warning" : "text-[#424242]",
              ].join(" ")}
              aria-hidden
            />
          </button>
        </div>
      </div>
    </div>
  );
}

function MultipleQuizSection({
  label,
  question,
  options,
  answer,
}: {
  label: string;
  question: string;
  options: string[];
  answer?: string;
}) {
  return (
    <div className="w-full rounded-2xl bg-white p-16">
      <div className="flex w-full items-center gap-2">
        <span className="heading-3 text-[#424242]">{label}</span>
        <span className="heading-6 text-[#2664ED]">(객관식)</span>
      </div>
      <div className="mt-12 w-full rounded-lg px-12 py-8 text-black">
        <p className="body-2">{question}</p>
      </div>
      <div className="mt-16 flex w-full flex-col gap-8 px-4">
        {options.map((opt, idx) => (
          <div
            key={`${opt}-${idx}`}
            className="body-2 rounded-lg border border-[#E0E0E0] bg-[#FAFAFA] px-12 py-10 text-black"
          >
            {opt}
          </div>
        ))}
      </div>
      <div className="mt-16 flex w-full items-start rounded-lg border border-[#B4C9F9] bg-[#E3EBFD] px-10 py-9 text-left text-black">
        <p className="body-2">{answer ? `정답: ${answer}` : "정답"}</p>
      </div>
    </div>
  );
}

function QuizSection({
  quiz,
  index,
}: {
  quiz: MissionDetailQuiz;
  index: number;
}) {
  const label = `Q${index + 1}`;
  const uiType = normalizeQuizType(quiz.type);

  if (uiType === "ox") {
    return (
      <OxQuizSection
        label={label}
        question={quiz.question}
        acceptedAnswers={quiz.acceptedAnswers ?? []}
      />
    );
  }

  if (uiType === "multiple") {
    return (
      <MultipleQuizSection
        label={label}
        question={quiz.question}
        options={quiz.option ?? []}
        answer={quiz.acceptedAnswers?.[0]}
      />
    );
  }

  return (
    <ShortQuizSection
      label={label}
      question={quiz.question}
      answer={quiz.acceptedAnswers?.[0]}
    />
  );
}

function MissionDetailContent({ missionId }: { missionId: number }) {
  const { data } = useMissionDetail(missionId);
  const youtubeId = getYoutubeId(data.videoUrl);
  const thumbnailUrl = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    : "";

  const keywords = data.keyword ?? [];
  const quizzes = data.quizzes ?? [];

  return (
    <>
      <Header title="완료 미션" property="common" />
      <div className="mt-44 -mb-96 flex w-full flex-col items-center px-6 pb-88">
        <div className="flex w-full max-w-screen-xl flex-col gap-12">
          <h2 className="heading-4 text-black">{data.title}</h2>

          <div className="flex w-full flex-row flex-wrap items-center gap-4">
            {(keywords.length > 0 ? keywords.slice(0, 3) : ["키워드"]).map(
              (keyword, idx) => (
                <span
                  key={`${keyword}-${idx}`}
                  className="body-4 flex items-center justify-center rounded-[8px] bg-[#E3EBFD] px-16 py-8 text-black"
                >
                  {keyword}
                </span>
              )
            )}
          </div>

          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="body-4 text-black">
                예상 소요시간 : {data.durationMinutes}분
              </span>
            </div>
            <span className="body-4 text-black">{data.interest}</span>
          </div>

          <div className="mt-8 h-[172px] w-full overflow-hidden rounded-lg bg-gray-100">
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
            disabled={!data.videoUrl}
            className={[
              "mt-24 flex w-full items-center justify-center gap-14 rounded-lg px-65 py-10",
              data.videoUrl
                ? "bg-moamoa-100"
                : "cursor-not-allowed bg-gray-200",
            ].join(" ")}
            onClick={() => {
              if (!data.videoUrl) return;
              window.open(data.videoUrl, "_blank", "noopener,noreferrer");
            }}
          >
            <span className="heading-6 text-black">콘텐츠 다시 보기</span>
            <IcPolygon className="h-16 w-16 text-moamoa-200" aria-hidden />
          </button>

          <div className="-mx-30 mt-[54px] h-[12px] w-screen bg-gray-100" />

          <div className="flex w-full flex-col items-center gap-48">
            {quizzes.map((quiz, idx) => (
              <section
                key={quiz.quizId}
                className="flex w-full flex-col gap-12"
              >
                <QuizSection quiz={quiz} index={idx} />
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default function CompletedMissionDetailPage() {
  const { missionId } = useParams();
  const parsedMissionId = Number(missionId);

  if (!Number.isFinite(parsedMissionId)) {
    return (
      <>
        <Header title="완료 미션" property="common" />
        <div className="flex w-full items-center justify-center py-40 text-gray-600">
          유효하지 않은 미션입니다.
        </div>
      </>
    );
  }
  return (
    <AsyncBoundary>
      <MissionDetailContent missionId={parsedMissionId} />
    </AsyncBoundary>
  );
}
