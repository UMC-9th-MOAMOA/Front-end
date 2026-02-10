import type { ReactNode } from "react";
import { Component, Suspense, useEffect, useState } from "react";
import Header from "@/components/common/header/Header";
import { useApiError } from "@/hooks/api/useApiError";
import AccountInfoSuccessModal from "./components/AccountInfoSuccessModal";
import AccountInfoForm from "./components/account/AccountInfoForm";
import AccountInfoHeader from "./components/account/AccountInfoHeader";
import {
  useMyProfile,
  useUpdateMyProfile,
} from "./components/account/hooks/useMyProfile";
import {
  toHyphenDate,
  toServerGender,
  toUserProfile,
} from "./components/account/utils/profileMapper";
import BottomActionBar from "./components/common/BottomActionBar";
import type { UserProfile } from "./types/settings.type";

class ErrorBoundary extends Component<
  {
    fallback: ReactNode;
    onError?: (error: unknown) => void;
    children: ReactNode;
  },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function AccountInfoPageInner() {
  const { data: profile } = useMyProfile();
  const { mutate, isPending } = useUpdateMyProfile();

  const initial = toUserProfile(profile);
  const [draft, setDraft] = useState<UserProfile>(initial);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  useEffect(() => {
    setDraft(toUserProfile(profile));
  }, [profile]);

  const handleSubmit = () => {
    const profileImage = Number(draft.profileId);

    mutate(
      {
        profileImage: Number.isNaN(profileImage)
          ? profile.profileImage
          : profileImage,
        name: draft.name,
        birthday: toHyphenDate(draft.birthDate),
        gender: toServerGender(draft.gender),
      },
      {
        onSuccess: () => setIsSuccessOpen(true),
      }
    );
  };

  return (
    <div>
      <Header title="프로필 설정" property="common" />
      <div className="-mx-25 mt-14 h-2 bg-gray-200" />

      <div className="flex min-h-dvh w-full flex-col overflow-y-auto">
        <div className="flex w-full flex-1 flex-col items-center pb-40">
          <AccountInfoHeader
            selectedId={draft.profileId}
            onSelect={(profileId) =>
              setDraft((prev) => ({ ...prev, profileId }))
            }
          />
          <AccountInfoForm
            initial={initial}
            profileId={draft.profileId}
            onChangeDraft={setDraft}
          />
        </div>

        <BottomActionBar
          label={isPending ? "변경 중..." : "변경하기"}
          onClick={handleSubmit}
          disabled={isPending}
        />
      </div>

      <AccountInfoSuccessModal
        open={isSuccessOpen}
        onConfirm={() => setIsSuccessOpen(false)}
      />
    </div>
  );
}

export default function AccountInfoPage() {
  const { handleError } = useApiError();

  return (
    <ErrorBoundary
      fallback={<div className="p-20">Error occurred.</div>}
      onError={handleError}
    >
      <Suspense fallback={<div className="p-20">Loading...</div>}>
        <AccountInfoPageInner />
      </Suspense>
    </ErrorBoundary>
  );
}
