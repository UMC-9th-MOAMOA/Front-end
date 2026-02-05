import type { ProfileOption, UserProfile } from "../../types/settings.type";

export const mockProfiles: ProfileOption[] = [
  { id: "p1", label: "프로필1" },
  { id: "p2", label: "프로필2" },
  { id: "p3", label: "프로필3" },
];

export const mockUser: UserProfile = {
  name: "김모아",
  email: "email@moamoa.com",
  profileId: "p1",
  birthDate: "1999.01.01",
  gender: "여자",
  phone: "010-1234-3523",
};
