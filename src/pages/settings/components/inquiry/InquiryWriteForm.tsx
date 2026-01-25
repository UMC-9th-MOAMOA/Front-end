import { useId, useMemo, useState } from "react";
import InquiryAttachmentSection from "./InquiryAttachmentSection";
import InquiryCategorySection from "./InquiryCategorySection";
import InquiryConsentRow from "./InquiryConsentRow";
import InquiryTextFields from "./InquiryTextFields";
import type { InquiryDraft } from "../../types/inquiry.type";

const MAX_TITLE = 20;
const MAX_CONTENT = 2000;
const MAX_IMAGES = 5;

function clamp(n: number, max: number) {
  return Math.min(max, Math.max(0, n));
}

export default function InquiryWriteForm() {
  const fileInputId = useId();
  const [draft, setDraft] = useState<InquiryDraft>({
    category: null,
    title: "",
    content: "",
    images: [],
  });

  const titleCount = useMemo(() => draft.title.length, [draft.title]);
  const contentCount = useMemo(() => draft.content.length, [draft.content]);

  const setCategory = (category: InquiryDraft["category"]) => {
    setDraft((prev) => ({ ...prev, category }));
  };

  const onChangeTitle = (value: string) => {
    setDraft((prev) => ({ ...prev, title: value.slice(0, MAX_TITLE) }));
  };

  const onChangeContent = (value: string) => {
    setDraft((prev) => ({ ...prev, content: value.slice(0, MAX_CONTENT) }));
  };

  // TODO(API 연결 시): FormData로 images 전송
  const onAddImages = (files: FileList | null) => {
    if (!files) return;
    const list = Array.from(files);
    setDraft((prev) => ({
      ...prev,
      images: [...prev.images, ...list].slice(0, MAX_IMAGES),
    }));
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="h-28" />

      <InquiryCategorySection
        selected={draft.category}
        onSelect={(category) => setCategory(category)}
      />

      <div className="h-40" />

      <InquiryTextFields
        title={draft.title}
        content={draft.content}
        titleCount={clamp(titleCount, MAX_TITLE)}
        contentCount={clamp(contentCount, MAX_CONTENT)}
        onChangeTitle={onChangeTitle}
        onChangeContent={onChangeContent}
      />

      <InquiryAttachmentSection
        fileInputId={fileInputId}
        images={draft.images}
        onAddImages={onAddImages}
      />

      <div className="h-67" />
      <InquiryConsentRow />
    </div>
  );
}
