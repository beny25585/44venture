import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  TrendContentResponse,
  SearchResponse,
  TodayContentResponse,
} from '@/types/literly.type';
import { LITERLY_API_URL } from '@/consts/consts';

export interface YouTubeVideo {
  id: string;
  title?: string;
  thumbnail?: string;
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  publishedAt?: string;
  channelTitle?: string;
}

export const literlyApi = createApi({
  reducerPath: 'literlyApi',
  baseQuery: fetchBaseQuery({ baseUrl: LITERLY_API_URL }),
  endpoints: (builder) => ({
    generateTrendContent: builder.query<TrendContentResponse, { region?: string } | void>({
      query: (arg) => {
        const region = typeof arg === 'object' && arg?.region ? arg.region : 'US';
        return `/generate-trend-content?region=${encodeURIComponent(region)}`;
      }
    }),
    search: builder.query<SearchResponse, { q: string; max_results?: number }>({
      query: ({ q, max_results }) => {
        const params = new URLSearchParams({ q });
        if (max_results != null) params.set('max_results', String(max_results));
        return `/search?${params.toString()}`;
      }
    }),
    todayContent: builder.query<TodayContentResponse, void>({
      query: () => '/today-content'
    }),
    realtimeTrends: builder.query<
      { trends: string[]; source: string },
      { region?: string; limit?: number }
    >({
      query: (params) => {
        const region = params?.region ?? 'US';
        const limit = params?.limit ?? 10;
        return `/trends/realtime?region=${region}&limit=${limit}`;
      }
    }),
    youtubeTrending: builder.query<
      { videos: YouTubeVideo[] },
      { region?: string; max_results?: number }
    >({
      query: (params) => {
        const region = params?.region ?? 'US';
        const max = params?.max_results ?? 10;
        return `/youtube/trending?region=${region}&max_results=${max}`;
      }
    })
  })
});

export const {
  useGenerateTrendContentQuery,
  useLazyGenerateTrendContentQuery,
  useLazySearchQuery,
  useTodayContentQuery,
  useRealtimeTrendsQuery,
  useYouTubeTrendingQuery,
} = literlyApi;
