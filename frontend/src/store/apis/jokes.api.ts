import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LITERLY_API_URL } from '@/consts/consts';

export interface Joke {
  id?: number;
  joke?: string;
  [key: string]: unknown;
}

export interface JokesSearchResponse {
  jokes: Joke[];
}

export interface Meme {
  id?: number;
  url?: string;
  type?: string;
}

export interface MemesSearchResponse {
  memes: Meme[];
}

export const jokesApi = createApi({
  reducerPath: 'jokesApi',
  baseQuery: fetchBaseQuery({ baseUrl: LITERLY_API_URL }),
  endpoints: (builder) => ({
    randomJokes: builder.query<JokesSearchResponse, { number?: number }>({
      query: (params) => {
        const n = params?.number ?? 10;
        return `/jokes/random?number=${n}`;
      },
    }),
    searchMemes: builder.query<MemesSearchResponse, { keywords?: string; number?: number }>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.keywords) searchParams.set('keywords', params.keywords);
        if (params?.number) searchParams.set('number', String(params.number));
        return `/memes/search?${searchParams.toString()}`;
      },
    }),
    randomMeme: builder.query<Meme, void>({
      query: () => '/memes/random',
    }),
    searchJokes: builder.query<
      JokesSearchResponse,
      {
        keywords?: string;
        include_tags?: string;
        exclude_tags?: string;
        min_rating?: number;
        max_length?: number;
        offset?: number;
        number?: number;
      }
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([k, v]) => {
          if (v != null && v !== '') searchParams.set(k, String(v));
        });
        return `/jokes/search?${searchParams.toString()}`;
      },
    }),
  }),
});

export const {
  useRandomJokesQuery,
  useSearchMemesQuery,
  useLazySearchMemesQuery,
  useRandomMemeQuery,
  useSearchJokesQuery,
  useLazySearchJokesQuery,
} = jokesApi;
