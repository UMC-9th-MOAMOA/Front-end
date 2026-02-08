export interface SearchMissionsParams {
  searchText?: string;
  keywords?: string[];
  seed: number;
  page?: number;
  size?: number;
}

export interface RelatedKeyword {
  keywordId: number;
  name: string;
  type: string;
}

export interface RelatedKeywordsResponse {
  keywords: RelatedKeyword[];
}
