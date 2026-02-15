import type { Request, Response } from 'express';
import { getCachedTodayContent } from '../services/daily-content-agent.js';

const LITERLY_BACKEND_URL = process.env.LITERLY_BACKEND_URL || 'http://localhost:8000';

export async function proxyGenerateTrendContent(
  req: Request,
  res: Response
): Promise<void> {
  const region = (req.query.region as string) || 'US';
  const url = `${LITERLY_BACKEND_URL}/generate-trend-content?region=${encodeURIComponent(region)}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      res.status(response.status).json({
        error: 'Literly backend error',
        detail: text || response.statusText,
      });
      return;
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Literly proxy error:', err);
    res.status(503).json({
      error: 'Literly backend unavailable',
      detail: err instanceof Error ? err.message : 'Unknown error',
    });
  }
}

export async function proxySearch(req: Request, res: Response): Promise<void> {
  const q = req.query.q as string;
  const maxResults = req.query.max_results as string | undefined;

  if (!q || typeof q !== 'string' || q.trim().length === 0) {
    res.status(400).json({ error: 'Query parameter "q" is required' });
    return;
  }

  const params = new URLSearchParams({ q: q.trim() });
  if (maxResults) params.set('max_results', maxResults);
  const url = `${LITERLY_BACKEND_URL}/search?${params.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      res.status(response.status).json({
        error: 'Literly backend error',
        detail: text || response.statusText,
      });
      return;
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Literly search proxy error:', err);
    res.status(503).json({
      error: 'Literly backend unavailable',
      detail: err instanceof Error ? err.message : 'Unknown error',
    });
  }
}

export function getTodayContent(_req: Request, res: Response): void {
  const cached = getCachedTodayContent();
  if (!cached) {
    res.status(503).json({
      error: 'Today content not yet available',
      detail: 'Agent is still fetching. Try again in a minute.',
    });
    return;
  }
  res.json(cached);
}
