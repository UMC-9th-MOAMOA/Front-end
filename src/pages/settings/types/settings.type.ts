export type Gender = "남자" | "여자";

export type ProfileOption = {
  id: string;
  label: string;
  // 나중에 SVG/이미지 URL로 교체 가능
};

export type UserProfile = {
  name: string;
  email: string;
  profileId: string; // 선택된 프로필
  birthDate: string; // "YYYY.MM.DD" (UI용)
  gender: Gender;
  phone: string; // "010-1234-5678"
};
