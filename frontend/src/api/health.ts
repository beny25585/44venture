import client from "./client";
import type { HealthResponse, HealthReadyResponse } from "./types";

export async function checkHealth() {
  const { data } = await client.get<HealthResponse>("/health");
  return data;
}

export async function checkReady() {
  const { data } = await client.get<HealthReadyResponse>("/health/ready");
  return data;
}
