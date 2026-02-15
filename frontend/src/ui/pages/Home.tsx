import { Button } from '@/shadcn/components/ui/button';
import { useLazyGenerateTrendContentQuery } from '@/store/apis/literly.api';
import { useAppSelector } from '@/store/hooks';
import { Link } from 'react-router';

export function Home() {
  const name = useAppSelector((store) => store.user.name);

  const [generateContent, { data, isLoading, error }] = useLazyGenerateTrendContentQuery();

  function onGenerate() {
    void generateContent();
  }

  return (
    <div className="space-y-4 p-4">
      <h1>Literly {name && `— ${name}`}</h1>
      <p className="text-muted-foreground">Generate viral video scripts from Google Trends</p>

      <div className="flex gap-2 items-center">
        <Button variant="outline" disabled={isLoading} onClick={onGenerate}>
          {isLoading ? 'Generating...' : 'Generate Trend Content'}
        </Button>
      </div>

      {isLoading && <div>Loading...</div>}
      {error && <div className="text-destructive">Error: {JSON.stringify(error, null, 2)}</div>}

      {data && (
        <div className="space-y-3 rounded-lg border p-4">
          <h2 className="font-semibold">Trends ({data.region})</h2>
          <ul className="list-disc list-inside">{data.trends.map((t, i) => <li key={i}>{t}</li>)}</ul>
          <h2 className="font-semibold">Predicted sub-trend (7 days)</h2>
          <p>{data.predicted_sub_trend}</p>
          <h2 className="font-semibold">Video Brief</h2>
          <p><strong>Hook:</strong> {data.video_brief.hook}</p>
          <p><strong>Body:</strong></p>
          <ul className="list-disc list-inside">{data.video_brief.body_points.map((b, i) => <li key={i}>{b}</li>)}</ul>
          <p><strong>CTA:</strong> {data.video_brief.cta}</p>
          <p><strong>Visuals:</strong> {data.video_brief.visual_suggestions.join(' • ')}</p>
        </div>
      )}

      <Link to="/not-found">Not Found</Link>
    </div>
  );
}
