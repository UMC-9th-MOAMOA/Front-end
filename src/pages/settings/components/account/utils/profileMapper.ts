import type { MemberGender, MyProfile } from "@/types/profile/profile";
import type { Gender, UserProfile } from "../../types/settings.type";

export const toUiGender = (g: MemberGender): Gender =>
  g === "MALE" ? "남자" : "여자";

export const toServerGender = (g: Gender): MemberGender =>
  g === "남자" ? "MALE" : "FEMALE";

export const toUserProfile = (p: MyProfile): UserProfile => ({
  name: p.name,
  email: p.email,
  profileId: String(p.profileImage),
  birthDate: p.birthday.replaceAll("-", "."),
  gender: toUiGender(p.gender),
  phone: p.phoneNumber ?? "",
});

export const toHyphenDate = (value: string) => value.replaceAll(".", "-");
