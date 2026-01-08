import { useMemo, useState } from "react";
import { mockDoneMissions, mockLikedMissions } from "../mocks/mypage.mock";
import type { MissionItem, MissionSubTabKey } from "../types/mypage.type";

type SortKey = "time" | "category";

function HeartIcon({ filled }: { filled: boolean }) {
  // SVG/아이콘 생기면 여기만 교체하면 됨
  return (
    <span
      className={[
        "text-lg leading-none",
        filled ? "text-blue-500" : "text-gray-300",
      ].join(" ")}
      aria-hidden
    >
      {filled ? "💙" : "🤍"}
    </span>
  );
}

function MissionCard({
  item,
  onToggleLike,
  onClickDetail,
}: {
  item: MissionItem;
  onToggleLike: (id: string) => void;
  onClickDetail: (id: string) => void;
}) {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <h3 className="font-bold text-base text-black">{item.title}</h3>

        <button
          type="button"
          aria-label="찜 토글"
          onClick={() => onToggleLike(item.id)}
          className="ml-3"
        >
          <HeartIcon filled={item.liked} />
        </button>
      </div>

      <div className="mt-3 space-y-1 text-gray-600 text-sm">
        <p>예상 소요시간 : {item.expectedMinutes}분</p>
        <p>카테고리 : {item.category}</p>
        <p>퀴즈형태 : {item.quizType}</p>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={() => onClickDetail(item.id)}
          className="rounded-xl bg-blue-50 px-4 py-2 font-semibold text-blue-600 text-sm active:bg-blue-100"
        >
          자세히 보기
        </button>
      </div>
    </article>
  );
}

export default function MissionTab() {
  const [subTab, setSubTab] = useState<MissionSubTabKey>("liked");
  const [sortKey, setSortKey] = useState<SortKey>("time");

  // TODO(API 연결 시): liked/done 목록을 query로 가져오고, 아래는 selector로 대체
  const [likedList, setLikedList] = useState<MissionItem[]>(mockLikedMissions);
  const doneList = mockDoneMissions;

  const baseList = subTab === "liked" ? likedList : doneList;

  const list = useMemo(() => {
    const copied = [...baseList];
    if (sortKey === "time")
      copied.sort((a, b) => a.expectedMinutes - b.expectedMinutes);
    if (sortKey === "category")
      copied.sort((a, b) => a.category.localeCompare(b.category));
    return copied;
  }, [baseList, sortKey]);

  const toggleLike = (id: string) => {
    // TODO(API 연결 시): POST/DELETE like 호출 후 invalidate
    setLikedList(
      (prev) =>
        prev
          .map((m) => (m.id === id ? { ...m, liked: !m.liked } : m))
          .filter((m) => m.liked) // 찜한 목록 탭에서는 "찜 해제"하면 리스트에서 빠지는 UX가 자연스러움
    );
  };

  const goDetail = (id: string) => {
    // TODO: 라우팅 생기면 navigate(`/missions/${id}`) 같은 걸로 교체
    console.log("detail:", id);
  };

  return (
    <section className="mt-4">
      {/* 서브탭: 찜한 미션 / 완료 */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setSubTab("liked")}
          className={[
            "rounded-xl px-4 py-2 font-semibold text-sm",
            subTab === "liked"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-500",
          ].join(" ")}
        >
          찜한 미션
        </button>
        <button
          type="button"
          onClick={() => setSubTab("done")}
          className={[
            "rounded-xl px-4 py-2 font-semibold text-sm",
            subTab === "done"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-500",
          ].join(" ")}
        >
          완료
        </button>
      </div>

      {/* 정렬 */}
      <div className="mt-4 flex items-center justify-between text-gray-600 text-sm">
        <button
          type="button"
          onClick={() => setSortKey("time")}
          className="flex items-center gap-1"
        >
          <span>소요시간 짧은 순</span>
          <span className={sortKey === "time" ? "text-black" : "text-gray-400"}>
            ▾
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSortKey("category")}
          className="flex items-center gap-1"
        >
          <span>Category</span>
          <span
            className={sortKey === "category" ? "text-black" : "text-gray-400"}
          >
            ▾
          </span>
        </button>
      </div>

      {/* 리스트 */}
      <div className="mt-4 space-y-4">
        {list.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 text-center text-gray-500 text-sm shadow-sm">
            {subTab === "liked"
              ? "찜한 미션이 없어요."
              : "완료한 미션이 없어요."}
          </div>
        ) : (
          list.map((m) => (
            <MissionCard
              key={m.id}
              item={m}
              onToggleLike={toggleLike}
              onClickDetail={goDetail}
            />
          ))
        )}
      </div>
    </section>
  );
}
