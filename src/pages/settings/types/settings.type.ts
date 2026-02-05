export type Gender = "남자" | "여자";

export type ProfileOption = {
  id: string;
  label: string;
};

export type UserProfile = {
  name: string;
  email: string;
  profileId: string;
  birthDate: string;
  gender: Gender;
  phone: string;
};
