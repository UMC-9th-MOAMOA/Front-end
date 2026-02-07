export type KeywordType = "KEYWORD" | "SKILL" | "SITUATION";

export interface Keyword {
  keywordId: number;
  name: string;
  type: KeywordType;
}

export interface KeywordsResponse {
  keywords: Keyword[];
}

export const KEYWORD_TYPE_MAP = {
  전체: null,
  추천상황: "SITUATION",
  키워드: "KEYWORD",
  획득스킬: "SKILL",
} as const satisfies Record<string, KeywordType | null>;

export type KeywordFilterTab = keyof typeof KEYWORD_TYPE_MAP;
