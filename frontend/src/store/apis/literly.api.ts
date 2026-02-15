import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TrendContentResponse } from '@/types/literly.type';
import { LITERLY_API_URL } from '@/consts/consts';

export const literlyApi = createApi({
  reducerPath: 'literlyApi',
  baseQuery: fetchBaseQuery({ baseUrl: LITERLY_API_URL }),
  endpoints: (builder) => ({
    generateTrendContent: builder.query<TrendContentResponse, void>({
      query: () => '/generate-trend-content?region=US'
    })
  })
});

export const {
  useGenerateTrendContentQuery,
  useLazyGenerateTrendContentQuery
} = literlyApi;
