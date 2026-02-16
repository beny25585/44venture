import client from "./client";
import type { YouTubeResponse, YouTubeParams } from "./types";

export async function getTrendingVideos(params?: YouTubeParams) {
  const { data } = await client.get<YouTubeResponse>(
    "/api/v1/youtube/trending",
    { params }
  );
  return data;
}
