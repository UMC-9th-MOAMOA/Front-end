import IcCamera from "@/assets/icons/ic_camera.svg?react";

type Props = {
  fileInputId: string;
  images: File[];
  onAddImages: (files: FileList | null) => void;
};

export default function InquiryAttachmentSection({
  fileInputId,
  images,
  onAddImages,
}: Props) {
  return (
    <div className="flex w-full flex-col items-start gap-8">
      <p className="heading-5 whitespace-nowrap text-[var(--color-black)]">
        파일 첨부
      </p>

      <div className="flex w-full items-center gap-7 overflow-x-auto">
        <label
          htmlFor={fileInputId}
          className="flex h-76 w-76 cursor-pointer items-center justify-center rounded-sm border border-[var(--color-gray-400)] p-10"
        >
          <IcCamera className="h-24 w-24 text-[var(--color-gray-400)]" />
          <input
            id={fileInputId}
            type="file"
            accept="image/jpeg,image/png"
            multiple
            className="hidden"
            onChange={(e) => onAddImages(e.target.files)}
          />
        </label>

        {images.slice(0, 4).map((file, index) => (
          <div
            key={`${file.name}-${file.size}-${index}`}
            className="flex h-76 w-76 items-center justify-center rounded-sm border border-[var(--color-gray-400)]"
            title={file.name}
          >
            <span className="body-5 px-6 text-center text-[var(--color-gray-500)]">
              이미지
            </span>
          </div>
        ))}

        {Array.from({ length: Math.max(0, 5 - images.length) }, (_, i) => i).map(
          (key) => (
          <label
            key={key}
            htmlFor={fileInputId}
            className="flex h-76 w-76 cursor-pointer items-center justify-center rounded-sm border border-[var(--color-gray-400)]"
          >
            <IcCamera className="h-24 w-24 text-[var(--color-gray-400)]" />
          </label>
          )
        )}
      </div>

      <p className="body-5 mt-12 whitespace-pre-line text-[var(--color-gray-700)]">
        이미지 (JPG, PNG)는 파일당 최대 10MB,
        {"\n"}최대 5개까지 등록할 수 있습니다.
      </p>
    </div>
  );
}
