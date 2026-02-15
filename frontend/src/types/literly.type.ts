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
