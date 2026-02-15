import { useTodayContentQuery } from '@/store/apis/literly.api';
import { Link } from 'react-router';

export function Home() {
  const { data, isLoading, error } = useTodayContentQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchInterval: 60_000,
  });

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      <h1>Literly</h1>

      {isLoading && <p className="text-muted-foreground">טוען...</p>}
      {error && (
        <p className="text-destructive">לא זמין כרגע. נסה שוב בעוד דקה.</p>
      )}

      {data && (
        <>
          <h2>{data.label}</h2>
          <ul className="space-y-3">
            {data.results.map((r, i) => (
              <li key={i} className="rounded-lg border p-3 hover:bg-muted/50">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline block"
                >
                  {r.title}
                </a>
                <p className="text-sm text-muted-foreground mt-1">{r.snippet}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="flex gap-4">
        <Link to="/" className="text-primary hover:underline">
          ← חיפוש בדיחות
        </Link>
        <Link to="/reddit-hot" className="text-primary hover:underline">
          מה חם ב-Reddit →
        </Link>
      </div>
    </div>
  );
}
