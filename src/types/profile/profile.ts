export type MemberGender = "MALE" | "FEMALE";
export type MemberProvider = "LOCAL" | "KAKAO" | "NAVER" | "GOOGLE" | string;

export interface MyProfile {
  profileImage: number;
  name: string;
  email: string;
  birthday: string | null;
  gender: MemberGender | null;
  phoneNumber: string | null;
  provider: MemberProvider;
}

export interface UpdateMyProfileRequest {
  profileImage: number;
  name: string;
  birthday: string;
  gender: MemberGender;
}

export type UpdateMyProfileResult = string;
