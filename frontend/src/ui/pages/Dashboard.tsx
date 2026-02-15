import { useEffect, useState } from 'react';
import { fetchRealTimeTrends } from '@/services/trendService';
import type { TrendingSearch } from '@/services/trendService';
import { TrendCard } from '@/ui/components/TrendCard';
import { Link } from 'react-router';

export function Dashboard() {
  const [trends, setTrends] = useState<TrendingSearch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTrends() {
      try {
        setLoading(true);
        const data = await fetchRealTimeTrends();
        setTrends(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch trends');
      } finally {
        setLoading(false);
      }
    }
    void loadTrends();
  }, []);

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1>Dashboard</h1>
        <Link to="/" className="text-primary hover:underline">
          ← Home
        </Link>
      </div>
      <p className="text-muted-foreground">מה חפשו הכי הרבה עכשיו (Google Trends)</p>

      {loading && <p className="text-muted-foreground">טוען...</p>}
      {error && <p className="text-destructive">{error}</p>}

      {!loading && !error && trends.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {trends.map((trend, i) => (
            <TrendCard key={`${trend.query}-${i}`} trend={trend} />
          ))}
        </div>
      )}
    </div>
  );
}
