export { default as apiClient } from "./client";

export { getTrendsSerpApi } from "./trends";
export { getTodayContent } from "./content";
export {
  getRandomJokes,
  searchJokes,
  searchMemes,
  getRandomMeme,
} from "./humor";
export { getTrendingVideos } from "./youtube";
export { getHotPosts } from "./reddit";
export { checkHealth, checkReady } from "./health";

export type {
  ApiResponse,
  ApiError,
  TrendItem,
  TrendsData,
  TrendsMeta,
  TrendsResponse,
  TrendsParams,
  ContentResult,
  TodayContentData,
  TodayContentResponse,
  Joke,
  JokesData,
  JokesMeta,
  JokesResponse,
  RandomJokesParams,
  SearchJokesParams,
  Meme,
  MemesData,
  MemesMeta,
  MemesResponse,
  RandomMemeResponse,
  SearchMemesParams,
  Video,
  YouTubeData,
  YouTubeMeta,
  YouTubeResponse,
  YouTubeParams,
  RedditPost,
  RedditData,
  RedditMeta,
  RedditResponse,
  RedditParams,
  HealthResponse,
  HealthReadyResponse,
} from "./types";
