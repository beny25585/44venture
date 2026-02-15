/**
 * Daily Content Agent – runs on a schedule and fetches today's content automatically.
 * Caches results so the frontend can display them without waiting.
 */
import cron from 'node-cron';
import { getTodayTopic } from '../config/daily-topics.js';

const LITERLY_BACKEND_URL = process.env.LITERLY_BACKEND_URL || 'http://localhost:8000';

export interface CachedTodayContent {
  query: string;
  label: string;
  results: Array<{ title: string; url: string; snippet: string }>;
  fetchedAt: string;
}

let cachedContent: CachedTodayContent | null = null;

async function fetchAndCacheTodayContent(): Promise<void> {
  const topic = getTodayTopic();
  const url = `${LITERLY_BACKEND_URL}/search?q=${encodeURIComponent(topic.query)}&max_results=10`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`[DailyContentAgent] Literly returned ${response.status}`);
      return;
    }

    const data = (await response.json()) as { query: string; results: Array<{ title: string; url: string; snippet: string }> };
    cachedContent = {
      query: data.query,
      label: topic.label,
      results: data.results ?? [],
      fetchedAt: new Date().toISOString(),
    };
    console.log(`[DailyContentAgent] ✅ Fetched and cached: ${topic.label}`);
  } catch (err) {
    console.error('[DailyContentAgent] Fetch failed:', err);
  }
}

export function getCachedTodayContent(): CachedTodayContent | null {
  return cachedContent;
}

export function startDailyContentAgent(): void {
  // Run immediately on startup
  void fetchAndCacheTodayContent();

  // Run every hour (at minute 0)
  cron.schedule('0 * * * *', () => {
    void fetchAndCacheTodayContent();
  });

  console.log('[DailyContentAgent] 🕐 Started – fetches every hour');
}
