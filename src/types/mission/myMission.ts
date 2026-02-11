import type { MissionApiResponse } from "./mission";

export type MyMissionStatus = "SCRAP" | "COMPLETE" | "RETRY";

export type MyMissionCondition = "LATEST" | "TIME_ASC" | "TIME_DESC";

export interface GetMyMissionsParams {
  status: MyMissionStatus;
  condition?: MyMissionCondition;
  categoryId?: number;
  page: number;
  size: number;
}

export interface MyMissionsResponse {
  missions: MissionApiResponse[];
  hasNext: boolean;
}
