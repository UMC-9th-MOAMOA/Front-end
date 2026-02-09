export type InquiryCategoryServer =
  | "REWARD"
  | "MISSION_QUIZ"
  | "SHOP_DECORATION"
  | "ACCOUNT"
  | "ETC";

export interface CreateInquiryResult {
  inquiryId: number;
  createdAt: string;
}

export interface CreateInquiryPayload {
  category: InquiryCategoryServer;
  title: string;
  content: string;
  termsAgreed: boolean;
  images?: File[];
}

export interface CreateInquiryAnswerResult {
  inquiryId: number;
  createdAt: string;
}

export interface CreateInquiryAnswerPayload {
  inquiryId: number;
  answer: string;
  responderName: string;
  images?: File[];
}

/** ====== list (my inquiries) ====== */

export type InquiryAnswerStatusServer = "ALL" | "COMPLETED" | "PENDING";
export type InquiryPeriodServer = "P1M" | "P3M" | "P6M" | "P1Y";

export interface MyInquiryListItemApi {
  inquiryId: number;
  category: InquiryCategoryServer;
  title: string;
  contentPreview: string;
  answered: boolean;
  createdAt: string; // ISO
  responderName: string | null;
  answerPreview: string | null;
}

export interface MyInquiryNextCursorApi {
  createdAt: string; // ISO
  id: number;
}

export interface MyInquiryListResultApi {
  items: MyInquiryListItemApi[];
  hasNext: boolean;
  nextCursor: MyInquiryNextCursorApi | null;
}

export interface GetMyInquiriesParams {
  period: InquiryPeriodServer;
  answerStatus?: InquiryAnswerStatusServer; // default ALL
  category: InquiryCategoryServer;
  size?: number; // default 10
  cursorCreatedAt?: string;
  cursorId?: number;
}

/** detail (my inquiry) */
export interface MyInquiryDetailResultApi {
  inquiryId: number;
  category: InquiryCategoryServer;
  title: string;
  content: string;
  answered: boolean;
  createdAt: string; // ISO
  responderName: string | null;
  answeredAt: string | null;
  answerContent: string | null;
  inquiryImageUrls: string[];
  answerImageUrls: string[];
}

