import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LITERLY_API_URL } from '@/consts/consts';

export interface RedditPost {
  id?: string;
  title?: string;
  subreddit?: string;
  score?: number;
  numComments?: number;
  url?: string;
  permalink?: string;
  snippet?: string;
  thumbnail?: string;
  createdAt?: number;
  author?: string;
  nsfw?: boolean;
}

export interface RedditHotResponse {
  subreddit: string;
  posts: RedditPost[];
}

export const redditApi = createApi({
  reducerPath: 'redditApi',
  baseQuery: fetchBaseQuery({ baseUrl: LITERLY_API_URL }),
  endpoints: (builder) => ({
    getHot: builder.query<RedditHotResponse, { subreddit?: string; limit?: number }>({
      query: ({ subreddit = 'all', limit = 25 } = {}) => {
        const params = new URLSearchParams();
        if (subreddit) params.set('subreddit', subreddit);
        if (limit) params.set('limit', String(limit));
        return `/reddit/hot?${params.toString()}`;
      }
    })
  })
});

export const { useGetHotQuery, useLazyGetHotQuery } = redditApi;
