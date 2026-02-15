import axios from 'axios';
import { LITERLY_API_URL } from '@/consts/consts';

export interface TrendingSearch {
  query: string;
  start_timestamp?: number;
  end_timestamp?: number;
  active?: boolean;
  search_volume?: number;
  increase_percentage?: number;
  categories?: Array<{ id: number; name: string }>;
  trend_breakdown?: string[];
  serpapi_google_trends_link?: string;
  serpapi_news_link?: string;
}

interface SerpApiProxyResponse {
  trending_searches: TrendingSearch[];
}

export async function fetchRealTimeTrends(
  geo: string = 'US',
  hours?: 4 | 24 | 48 | 168
): Promise<TrendingSearch[]> {
  const params: Record<string, string | number> = { geo };
  if (hours) params.hours = hours;

  const { data } = await axios.get<SerpApiProxyResponse>(
    `${LITERLY_API_URL}/trends/serpapi`,
    { params }
  );

  return data.trending_searches ?? [];
}
