// src/pages/settings/account/utils/profileMapper.ts
import type { MemberGender, MyProfile } from "@/types/profile/profile";
import type { Gender, UserProfile } from "../../types/settings.type";

// 서버 -> UI
export const toUiGender = (g: MemberGender): Gender =>
  g === "MALE" ? "남자" : "여자";

// UI -> 서버
export const toServerGender = (g: Gender): MemberGender =>
  g === "남자" ? "MALE" : "FEMALE";

// 서버 -> 화면에서 쓰는 UserProfile로 변환(필드명도 맞춰줌)
export const toUserProfile = (p: MyProfile): UserProfile => ({
  // 너희 UserProfile 구조에 맞게 아래는 조정 필요
  name: p.name,
  email: p.email,
  profileId: String(p.profileImage), // ✅ 추가
  birthDate: p.birthday.replaceAll("-", "."), // 기존 placeholder "YYYY.MM.DD"
  gender: toUiGender(p.gender),
  phone: p.phoneNumber ?? "",
  // profileImage 등 추가 필드 있으면 여기서 매핑
});

export const toHyphenDate = (value: string) => value.replaceAll(".", "-");
