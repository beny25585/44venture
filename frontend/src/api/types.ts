// Generic API response wrapper
export interface ApiResponse<T, M = Record<string, unknown>> {
  data: T;
  meta?: M;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  status?: number;
}

// --- Trends ---

export interface TrendItem {
  query: string;
  search_volume: number;
  increase_percentage: number;
  trend_breakdown: string[];
  categories: string[];
  active: boolean;
  start_timestamp: number | null;
}

export interface TrendsData {
  trending_searches: TrendItem[];
}

export interface TrendsMeta {
  geo: string;
  hl: string;
  hours: number | null;
  count: number;
}

export type TrendsResponse = ApiResponse<TrendsData, TrendsMeta>;

export interface TrendsParams {
  geo?: string;
  hl?: string;
  hours?: 4 | 24 | 48 | 168;
  limit?: number;
}

// --- Today Content ---

export interface ContentResult {
  title: string;
  url: string;
  snippet: string;
  date: string | null;
  last_updated: string | null;
}

export interface TodayContentData {
  query: string;
  label: string;
  results: ContentResult[];
  fetchedAt: string;
}

export type TodayContentResponse = ApiResponse<TodayContentData>;

// --- Jokes ---

export interface Joke {
  id: number;
  joke: string;
  rating: number;
  tags: string[];
  date: string;
}

export interface JokesData {
  jokes: Joke[];
}

export interface JokesMeta {
  count: number;
  offset?: number;
}

export type JokesResponse = ApiResponse<JokesData, JokesMeta>;

export interface RandomJokesParams {
  number?: number;
}

export interface SearchJokesParams {
  keywords?: string;
  include_tags?: string;
  exclude_tags?: string;
  min_rating?: number;
  max_length?: number;
  offset?: number;
  number?: number;
}

// --- Memes ---

export interface Meme {
  id: number;
  title: string;
  url: string;
  image: string;
  rating: number;
  tags: string[];
}

export interface MemesData {
  memes: Meme[];
}

export interface MemesMeta {
  count: number;
}

export type MemesResponse = ApiResponse<MemesData, MemesMeta>;
export type RandomMemeResponse = ApiResponse<Meme>;

export interface SearchMemesParams {
  keywords?: string;
  number?: number;
  keywords_in_image?: boolean;
  media_type?: "image" | "video";
}

// --- YouTube ---

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  publishedAt: string;
  channelTitle: string;
}

export interface YouTubeData {
  videos: Video[];
}

export interface YouTubeMeta {
  region: string;
  count: number;
}

export type YouTubeResponse = ApiResponse<YouTubeData, YouTubeMeta>;

export interface YouTubeParams {
  region?: string;
  max_results?: number;
}

// --- Reddit ---

export interface RedditPost {
  id: string;
  title: string;
  subreddit: string;
  score: number;
  numComments: number;
  url: string;
  permalink: string;
  snippet: string;
  thumbnail: string | null;
  createdAt: number;
  author: string;
  nsfw: boolean;
}

export interface RedditData {
  subreddit: string;
  posts: RedditPost[];
}

export interface RedditMeta {
  subreddit: string;
  count: number;
}

export type RedditResponse = ApiResponse<RedditData, RedditMeta>;

export interface RedditParams {
  subreddit?: string;
  limit?: number;
}

// --- Health ---

export interface HealthResponse {
  status: string;
  service: string;
  version: string;
}

export interface HealthReadyResponse {
  status: string;
  checks: {
    serpapi: boolean;
    humor_api: boolean;
  };
  timestamp: number;
}
