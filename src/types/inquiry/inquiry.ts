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

/** ✅ 상세 조회 result 타입 */
export interface MyInquiryDetailResultApi {
  inquiryId: number;
  category: InquiryCategoryServer;
  title: string;
  content: string;
  answered: boolean;
  createdAt: string; // ISO
  answeredAt: string | null; // answered=false면 null 가능성
  answerContent: string | null; // answered=false면 null 가능성
  inquiryImageUrls: string[];
  answerImageUrls: string[];
}
