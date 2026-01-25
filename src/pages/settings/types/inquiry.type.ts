export type TabKey = "write" | "mine";

export type InquiryCategory =
  | "보상"
  | "미션 및 퀴즈"
  | "상점 및 꾸미기"
  | "계정"
  | "기타";

export type InquiryDraft = {
  category: InquiryCategory | null;
  title: string;
  content: string;
  images: File[];
};

export type MyInquiryItem = {
  inquiryId: number;
  createdAt: string;
  answered: boolean;
  title: string;
  contentPreview: string;
  answerPreview?: {
    managerLabel: string;
    preview: string;
  };
};

export type AnswerStatus = "COMPLETED" | "PENDING";
