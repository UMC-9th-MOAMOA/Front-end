import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import IcLeft from "@/assets/icons/ic_left.svg?react";
import Header from "@/components/common/header/Header";
import ProfileHeaderCard from "./components/ProfileHeaderCard";
import ProfilePickerModal from "./components/ProfilePickerModal";
import SettingsRow from "./components/SettingsRow";
import SettingsSection from "./components/SettingsSection";
import { mockProfiles, mockUser } from "./mocks/settings.mock";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [isProfilePickerOpen, setIsProfilePickerOpen] = useState(false);

  // TODO(API 연결 시): user / profiles를 query로 교체
  const user = mockUser;
  const profiles = mockProfiles;

  const selectedProfileLabel = useMemo(() => {
    return profiles.find((p) => p.id === user.profileId)?.label ?? "프로필";
  }, [profiles, user.profileId]);

  const onClickProfile = () => setIsProfilePickerOpen(true);

  const onSelectProfile = (profileId: string) => {
    // TODO(API 연결 시): PATCH /users/profile 같은 API 호출 후 invalidate
    console.log("select profile:", profileId);
    setIsProfilePickerOpen(false);
  };

  const onClickEdit = () => {
    navigate("/settings/account");
  };

  return (
    <div className="bg-[#FAFAFA]">
      <Header title="설정" property="common" />

      <div
        className="mt-14 mb-10 -ml-32"
        style={{
          width: 393,
          height: 2,
          background: "var(--MOAMOA-G-200, #EEE)",
        }}
      />

      <ProfileHeaderCard
        name={user.name}
        email={user.email}
        profileLabel={selectedProfileLabel}
        onClickProfile={onClickProfile}
        onClickEdit={onClickEdit}
      />

      <div className="mt-10 -ml-25 h-977 w-375 bg-[var(--color-white)] pt-28">
        <div className="flex flex-col gap-20">
          <div className="flex h-174 w-375 flex-col items-center gap-22 self-stretch">
            <div className="flex h-150 w-325 flex-col items-start gap-16">
              <div className="flex h-25 w-325 items-center">
                <span className="heading-5 text-[var(--color-black)]">
                  계정 설정
                </span>
              </div>

              <div className="flex w-325 flex-col gap-3">
                <button
                  type="button"
                  onClick={() => console.log("go: 회원 정보 수정")}
                  className="flex h-53 w-325 items-center justify-between self-stretch py-12"
                >
                  <span className="body-2 font-medium text-[var(--color-black)]">
                    회원 정보 수정
                  </span>
                  <IcLeft
                    className="h-24 w-24 rotate-180 text-[var(--color-black)]"
                    aria-hidden
                  />
                </button>

                <button
                  type="button"
                  onClick={() => console.log("go: 비밀번호 변경")}
                  className="flex h-53 w-325 items-center justify-between self-stretch py-12"
                >
                  <span className="body-2 font-medium text-[var(--color-black)]">
                    비밀번호 변경
                  </span>
                  <IcLeft
                    className="h-24 w-24 rotate-180 text-[var(--color-black)]"
                    aria-hidden
                  />
                </button>
              </div>
            </div>
          </div>
          <div
            className="-mt-20 h-2 w-375"
            style={{ background: "var(--MOAMOA-G-200, #EEE)" }}
          />

          <div className="flex h-174 w-375 flex-col items-center gap-22 self-stretch">
            <div className="flex h-150 w-325 flex-col items-start gap-16">
              <div className="flex h-25 w-325 items-center">
                <span className="heading-5 text-[var(--color-black)]">
                  목표 및 미션 설정
                </span>
              </div>

              <div className="flex w-325 flex-col gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/settings/target-mission-count")}
                  className="flex h-53 w-325 items-center justify-between self-stretch py-12"
                >
                  <span className="body-2 font-medium text-[var(--color-black)]">
                    목표 미션 개수
                  </span>
                  <IcLeft
                    className="h-24 w-24 rotate-180 text-[var(--color-black)]"
                    aria-hidden
                  />
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/settings/interests")}
                  className="flex h-53 w-325 items-center justify-between self-stretch py-12"
                >
                  <span className="body-2 font-medium text-[var(--color-black)]">
                    관심사 변경
                  </span>
                  <IcLeft
                    className="h-24 w-24 rotate-180 text-[var(--color-black)]"
                    aria-hidden
                  />
                </button>
              </div>
            </div>
          </div>
          <div
            className="-mt-20 h-2 w-375"
            style={{ background: "var(--MOAMOA-G-200, #EEE)" }}
          />

          <div className="flex h-174 w-375 flex-col items-center gap-22 self-stretch">
            <div className="flex h-147 w-321 flex-col items-start gap-8">
              <div className="flex h-25 w-321 items-center">
                <span className="heading-5 text-[var(--color-black)]">
                  서비스 편의 기능
                </span>
              </div>

              <div className="flex w-321 flex-col gap-8">
                <button
                  type="button"
                  onClick={() => console.log("go: FAQ")}
                  className="flex h-53 w-321 items-center justify-between self-stretch py-12"
                >
                  <span className="body-2 font-medium text-[var(--color-black)]">
                    FAQ
                  </span>
                  <IcLeft
                    className="h-24 w-24 rotate-180 text-[var(--color-black)]"
                    aria-hidden
                  />
                </button>
                <button
                  type="button"
                  onClick={() => console.log("go: 문의하기")}
                  className="flex h-53 w-321 items-center justify-between self-stretch py-12"
                >
                  <span className="body-2 font-medium text-[var(--color-black)]">
                    문의하기
                  </span>
                  <IcLeft
                    className="h-24 w-24 rotate-180 text-[var(--color-black)]"
                    aria-hidden
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-67 flex flex-col items-center">
          <button
            type="button"
            className="heading-5 flex h-44 w-126 flex-col items-center justify-center gap-4 rounded-lg bg-[var(--color-moamoa-50)] px-16 py-10 text-[var(--color-moamoa-600)]"
            onClick={() => console.log("logout")}
          >
            로그아웃
          </button>

          <div
            className="mt-34 h-2 w-393"
            style={{ background: "var(--MOAMOA-G-200, #EEE)" }}
          />

          <p className="heading-5 mt-25 mb-16 text-[var(--color-warning)]">
            정말 탈퇴하시겠어요?
          </p>

          <button
            type="button"
            className="heading-5 flex h-44 w-126 flex-col items-center justify-center gap-4 rounded-lg bg-[#FFE4E4] px-16 py-10 text-[var(--color-warning)]"
            onClick={() => console.log("withdraw")}
          >
            회원탈퇴
          </button>
        </div>
      </div>

      <ProfilePickerModal
        open={isProfilePickerOpen}
        profiles={profiles}
        selectedId={user.profileId}
        onClose={() => setIsProfilePickerOpen(false)}
        onSelect={onSelectProfile}
      />
    </div>
  );
}
