import type { ProfileOption, UserProfile } from "../types/settings.type";

export const mockProfiles: ProfileOption[] = [
  { id: "p1", label: "프로필 예시" },
  { id: "p2", label: "프로필 4" },
  { id: "p3", label: "프로필 5" },
];

export const mockUser: UserProfile = {
  name: "모아모아",
  email: "email@moamoa.com",
  profileId: "p1",
  birthDate: "1999.01.01",
  gender: "남자",
  phone: "010-1234-3523",
};
