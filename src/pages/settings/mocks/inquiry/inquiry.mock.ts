import type { AnswerStatus, MyInquiryItem } from "../../types/inquiry.type";

export const mockMyInquiries: MyInquiryItem[] = [
  {
    inquiryId: 101,
    createdAt: "2026.01.24",
    answered: true,
    title: "문의 제목입니다. 문의 제목이 길어질 수 있어요.",
    contentPreview: "문의 내용 미리보기입니다. 내용이 길어질 수 있어요.",
    answerPreview: {
      managerLabel: "담당자 000 님",
      preview: "답변 미리보기입니다. 답변이 길어질 수 있어요.",
    },
  },
  {
    inquiryId: 102,
    createdAt: "2026.01.20",
    answered: false,
    title: "문의 제목입니다. 문의 제목이 길어질 수 있어요.",
    contentPreview: "문의 내용 미리보기입니다. 내용이 길어질 수 있어요.",
  },
  {
    inquiryId: 103,
    createdAt: "2026.01.12",
    answered: true,
    title: "문의 제목입니다. 문의 제목이 길어질 수 있어요.",
    contentPreview: "문의 내용 미리보기입니다. 내용이 길어질 수 있어요.",
    answerPreview: {
      managerLabel: "담당자 000 님",
      preview: "답변 미리보기입니다. 답변이 길어질 수 있어요.",
    },
  },
];

type InquiryDetail = {
  inquiryId: number;
  title: string;
  content: string;
  createdAt: string;
  answerStatus: AnswerStatus;
};

export const mockInquiryDetail: Record<number, InquiryDetail> = {
  101: {
    inquiryId: 101,
    title: "문의 제목입니다. 문의 제목이 길어질 수 있어요.",
    content:
      "문의 내용입니다. 문의 내용이 길어질 수 있어요. 문의 내용이 길어질 수 있어요.",
    createdAt: "2026.01.24",
    answerStatus: "COMPLETED",
  },
  102: {
    inquiryId: 102,
    title: "문의 제목입니다. 문의 제목이 길어질 수 있어요.",
    content:
      "문의 내용입니다. 문의 내용이 길어질 수 있어요. 문의 내용이 길어질 수 있어요.",
    createdAt: "2026.01.20",
    answerStatus: "PENDING",
  },
  103: {
    inquiryId: 103,
    title: "문의 제목입니다. 문의 제목이 길어질 수 있어요.",
    content:
      "문의 내용입니다. 문의 내용이 길어질 수 있어요. 문의 내용이 길어질 수 있어요.",
    createdAt: "2026.01.12",
    answerStatus: "COMPLETED",
  },
};
