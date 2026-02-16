import client from "./client";
import type { TodayContentResponse } from "./types";

export async function getTodayContent() {
  const { data } = await client.get<TodayContentResponse>(
    "/api/v1/today-content"
  );
  return data;
}
