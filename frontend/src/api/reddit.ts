import client from "./client";
import type { RedditResponse, RedditParams } from "./types";

export async function getHotPosts(params?: RedditParams) {
  const { data } = await client.get<RedditResponse>("/api/v1/reddit/hot", {
    params,
  });
  return data;
}
