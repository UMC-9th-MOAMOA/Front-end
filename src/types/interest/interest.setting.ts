import type { Interest, InterestDetail } from "./interest";

export type InterestWithDetails = Interest & {
  details: InterestDetail[];
};
