import { useEffect, useState } from "react";
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
  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);

  useEffect(() => {
    const next = images.slice(0, 5).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPreviews(next);
    return () => {
      next.forEach((p) => {
        URL.revokeObjectURL(p.url);
      });
    };
  }, [images]);

  return (
    <div className="flex w-full flex-col items-start gap-8">
      <p className="heading-5 whitespace-nowrap text-black">파일 첨부</p>

      <div className="flex w-full items-center gap-7 overflow-x-auto">
        {previews.map((preview, index) => (
          <div
            key={`${preview.file.name}-${preview.file.size}-${index}`}
            className="flex aspect-square w-76 flex-shrink-0 items-center justify-center overflow-hidden rounded-sm border border-gray-400"
            title={preview.file.name}
          >
            <img
              src={preview.url}
              alt={`attachment-${index + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}

        {images.length < 5 && (
          <label
            htmlFor={fileInputId}
            className="flex aspect-square w-76 flex-shrink-0 cursor-pointer items-center justify-center rounded-sm border border-gray-400 p-10"
          >
            <IcCamera className="h-24 w-24 text-gray-400" />
            <input
              id={fileInputId}
              type="file"
              accept="image/jpeg,image/png"
              multiple
              className="hidden"
              onChange={(e) => {
                onAddImages(e.currentTarget.files);
                e.currentTarget.value = "";
              }}
            />
          </label>
        )}
      </div>

      <p className="body-5 mt-12 whitespace-pre-line pb-126 text-gray-700">
        이미지 ( JPG,PNG )를 기준으로 한장당 10MB,
        {"\n"}최대 5개까지 등록 가능합니다.
      </p>
    </div>
  );
}
