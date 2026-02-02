import type {
  MissionApiResponse,
  MissionsPageResponse,
} from "@/types/mission/mission";

// 목 데이터 생성 헬퍼
const createMockMission = (
  id: number,
  categoryName: string
): MissionApiResponse => ({
  missionId: id,
  title: `[${categoryName}] 테스트 미션 #${id}`,
  durationMinutes: Math.floor(Math.random() * 10) + 3, // 3~12분
  category: categoryName,
  quizCount: Math.floor(Math.random() * 5) + 3, // 3~7개
  keywords: [
    `키워드${(id % 5) + 1}`,
    `키워드${(id % 3) + 1}`,
    `키워드${(id % 7) + 1}`,
  ],
  isScrapped: Math.random() > 0.5,
  videoUrl: `https://example.com/video${id}.mp4`,
  description: `테스트 미션 #${id}의 설명입니다.`,
});

// 카테고리별 목 미션 생성 (각 카테고리당 30개)
export const generateMockMissions = (
  categoryName: string,
  page: number,
  size: number
): MissionsPageResponse => {
  const totalMissions = 30; // 총 30개의 미션
  const startId = page * size + 1;
  const missions: MissionApiResponse[] = [];

  for (let i = 0; i < size; i++) {
    const missionId = startId + i;
    if (missionId <= totalMissions) {
      missions.push(createMockMission(missionId, categoryName));
    }
  }

  return {
    missions,
    hasNext: startId + size <= totalMissions,
  };
};

// 추천 미션 목 데이터
export const MOCK_RECOMMENDED_MISSIONS: MissionApiResponse[] = [
  {
    missionId: 101,
    title: "오늘의 추천: 경제 뉴스 핵심 정리",
    durationMinutes: 5,
    category: "경제와 금융",
    quizCount: 3,
    keywords: ["경제", "뉴스", "시사"],
    isScrapped: false,
    videoUrl: "https://example.com/recommended1.mp4",
    description: "오늘의 경제 뉴스를 빠르게 정리합니다.",
  },
  {
    missionId: 102,
    title: "오늘의 추천: IT 트렌드 알아보기",
    durationMinutes: 7,
    category: "IT",
    quizCount: 4,
    keywords: ["IT", "트렌드", "기술"],
    isScrapped: true,
    videoUrl: "https://example.com/recommended2.mp4",
    description: "최신 IT 트렌드를 살펴봅니다.",
  },
  {
    missionId: 103,
    title: "오늘의 추천: 비즈니스 영어 표현",
    durationMinutes: 10,
    category: "영어",
    quizCount: 5,
    keywords: ["영어", "비즈니스", "회화"],
    isScrapped: false,
    videoUrl: "https://example.com/recommended3.mp4",
    description: "실무에서 자주 쓰는 영어 표현을 배웁니다.",
  },
];
