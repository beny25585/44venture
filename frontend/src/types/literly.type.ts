export interface VideoBrief {
  hook: string;
  body_points: string[];
  cta: string;
  visual_suggestions: string[];
}

export interface TrendContentResponse {
  region: string;
  trends: string[];
  predicted_sub_trend: string;
  video_brief: VideoBrief;
}

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  date?: string;
  last_updated?: string;
}

export interface SearchResponse {
  query: string;
  results: SearchResult[];
}

export interface TodayContentResponse {
  query: string;
  label: string;
  results: SearchResult[];
  fetchedAt: string;
}
