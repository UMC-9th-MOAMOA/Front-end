import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/common/Header";
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
    <div className="px-4">
      <Header title="설정" property="common" />

      <ProfileHeaderCard
        name={user.name}
        email={user.email}
        profileLabel={selectedProfileLabel}
        onClickProfile={onClickProfile}
        onClickEdit={onClickEdit}
      />

      <SettingsSection title="목표 및 미션 설정">
        <SettingsRow
          label="목표 미션 개수"
          onClick={() => console.log("go: 목표 미션 개수")}
        />
        <SettingsRow
          label="관심사 변경"
          onClick={() => console.log("go: 관심사 변경")}
        />
      </SettingsSection>

      <SettingsSection title="서비스 편의 기능">
        <SettingsRow label="FAQ" onClick={() => console.log("go: FAQ")} />
        <SettingsRow
          label="문의하기"
          onClick={() => console.log("go: 문의하기")}
        />
      </SettingsSection>

      <div className="mt-10 flex flex-col items-center gap-3">
        <button
          type="button"
          className="w-[10rem] rounded-xl bg-blue-50 px-4 py-2 font-semibold text-blue-600 text-sm active:bg-blue-100"
          onClick={() => console.log("logout")}
        >
          로그아웃
        </button>

        <button
          type="button"
          className="text-gray-400 text-sm underline"
          onClick={() => console.log("withdraw")}
        >
          탈퇴하기
        </button>
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
