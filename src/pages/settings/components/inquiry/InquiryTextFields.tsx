type Props = {
  title: string;
  content: string;
  titleCount: number;
  contentCount: number;
  onChangeTitle: (value: string) => void;
  onChangeContent: (value: string) => void;
};

export default function InquiryTextFields({
  title,
  content,
  titleCount,
  contentCount,
  onChangeTitle,
  onChangeContent,
}: Props) {
  return (
    <div className="flex w-full flex-col items-start gap-17">
      <p className="heading-5 whitespace-nowrap text-[var(--color-black)]">
        글 작성
      </p>

      <div className="flex w-full flex-col items-start gap-8">
        <p className="body-2-1 whitespace-nowrap text-[var(--color-black)]">
          문의 제목
        </p>

        <div className="flex w-full items-center rounded-sm border border-[var(--color-gray-400)] px-15 py-12">
          <input
            value={title}
            onChange={(e) => onChangeTitle(e.target.value)}
            placeholder="제목을 입력해 주세요 (20자 이내)"
            maxLength={20}
            className="body-4 w-full bg-transparent text-[var(--color-black)] outline-none placeholder:text-[var(--color-gray-400)]"
          />
          <span className="body-4 ml-10 whitespace-nowrap text-center text-[var(--color-positive)]">
            {titleCount}
          </span>
          <span className="body-4 ml-2 whitespace-nowrap text-center text-[var(--color-gray-600)]">
            / 20
          </span>
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-8">
        <p className="body-2-1 whitespace-nowrap text-[var(--color-black)]">
          문의 내용
        </p>

        <textarea
          value={content}
          onChange={(e) => onChangeContent(e.target.value)}
          placeholder="내용을 입력해 주세요."
          maxLength={2000}
          className="body-4 h-221 w-full resize-none rounded-sm border border-[var(--color-gray-400)] bg-transparent p-10 text-[var(--color-black)] outline-none placeholder:text-[var(--color-gray-400)]"
        />

        <div className="mt-6 flex w-full justify-end">
          <div className="flex h-18 items-center gap-2">
            <span className="body-4 whitespace-nowrap text-center text-[var(--color-positive)]">
              {contentCount}
            </span>
            <span className="body-4 ml-2 whitespace-nowrap text-center text-[var(--color-gray-600)]">
              / 2000
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
