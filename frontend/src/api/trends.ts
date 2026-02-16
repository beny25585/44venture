import client from "./client";
import type { TrendsParams, TrendsResponse } from "./types";

export async function getTrendsSerpApi(params?: TrendsParams) {
  const { data } = await client.get<TrendsResponse>("/api/v1/trends/serpapi", { params });

  return data.data.trending_searches;
}
