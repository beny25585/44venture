import { useEffect, useState } from 'react';
import { fetchRealTimeTrends } from '@/services/trendService';
import type { TrendingSearch } from '@/services/trendService';
import { TrendCard } from '@/ui/components/TrendCard';
import { useGetHotQuery } from '@/store/apis/reddit.api';

export function Jokes() {
  const [trends, setTrends] = useState<TrendingSearch[]>([]);
  const [trendsLoading, setTrendsLoading] = useState(true);
  const [trendsError, setTrendsError] = useState<string | null>(null);

  const {
    data: redditData,
    isLoading: redditLoading,
    error: redditError,
  } = useGetHotQuery(
    { subreddit: 'all', limit: 15 },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    async function loadTrends() {
      try {
        setTrendsLoading(true);
        const data = await fetchRealTimeTrends();
        setTrends(data);
      } catch (err) {
        setTrendsError(err instanceof Error ? err.message : 'Failed to fetch trends');
      } finally {
        setTrendsLoading(false);
      }
    }
    void loadTrends();
  }, []);

  return (
    <div className="space-y-8 p-4 max-w-4xl mx-auto">
      <h1>Literly</h1>
      <p className="text-muted-foreground">מה חם עכשיו</p>

      {/* Google Trends via SerpApi */}
      <section className="space-y-4">
        <h2>Google Trends</h2>
        {trendsLoading && <p className="text-muted-foreground">טוען טרנדים...</p>}
        {trendsError && <p className="text-destructive">{trendsError}</p>}
        {trends.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {trends.map((t, i) => (
              <TrendCard key={`${t.query}-${i}`} trend={t} />
            ))}
          </div>
        )}
      </section>

      {/* Reddit Hot */}
      <section className="space-y-4">
        <h2>Reddit Hot</h2>
        {redditLoading && <p className="text-muted-foreground">טוען Reddit...</p>}
        {redditError && <p className="text-destructive">שגיאה בטעינת Reddit</p>}
        {redditData?.posts && (
          <ul className="space-y-3">
            {redditData.posts.map((post) => (
              <li
                key={post.id}
                className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex gap-3">
                  {post.thumbnail?.startsWith('http') && (
                    <img
                      src={post.thumbnail}
                      alt=""
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <a
                      href={post.permalink || post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:underline block"
                    >
                      {post.title}
                    </a>
                    <div className="flex gap-3 mt-1 text-sm text-muted-foreground">
                      <span>r/{post.subreddit}</span>
                      <span>{post.score} pts</span>
                      <span>{post.numComments} comments</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
