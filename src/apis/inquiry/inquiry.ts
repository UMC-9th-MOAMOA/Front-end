import { authAPI } from "@/apis/axios";
import type { ApiResponse } from "@/types/api/api";
import type {
  CreateInquiryPayload,
  CreateInquiryResult,
  GetMyInquiriesParams,
  MyInquiryDetailResultApi,
  MyInquiryListResultApi,
} from "@/types/inquiry/inquiry";
import { toApiError } from "@/utils/apiError";

const CREATE_ENDPOINT = "/support/inquiries";
const MY_LIST_ENDPOINT = "/members/me/support/inquiries";


export const createInquiry = async (payload: CreateInquiryPayload) => {
  const form = new FormData();
  form.append("category", payload.category);
  form.append("title", payload.title);
  form.append("content", payload.content);

  (payload.images ?? []).forEach((file) => {
    form.append("images", file);
  });

  const { data } = await authAPI.post<ApiResponse<CreateInquiryResult>>(
    CREATE_ENDPOINT,
    form
  );

  if (!data.isSuccess) throw toApiError(data.code, data.message);
  return data.result;
};

export const getMyInquiries = async (params: GetMyInquiriesParams) => {
  const {
    period,
    answerStatus = "ALL",
    category,
    size = 10,
    cursorCreatedAt,
    cursorId,
  } = params;

  const { data } = await authAPI.get<ApiResponse<MyInquiryListResultApi>>(
    MY_LIST_ENDPOINT,
    {
      params: {
        period,
        answerStatus,
        ...(category ? { category } : {}),
        size,
        cursorCreatedAt,
        cursorId,
      },
    }
  );

  if (!data.isSuccess) throw toApiError(data.code, data.message);
  return data.result;
};

/** ✅ 상세 조회 */
export const getMyInquiryDetail = async (inquiryId: number) => {
  const { data } = await authAPI.get<ApiResponse<MyInquiryDetailResultApi>>(
    `${MY_LIST_ENDPOINT}/${inquiryId}`
  );

  if (!data.isSuccess) throw toApiError(data.code, data.message);
  return data.result;
};
