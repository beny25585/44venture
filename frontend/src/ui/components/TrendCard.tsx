import type { TrendingSearch } from '@/services/trendService';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shadcn/components/ui/card';

interface TrendCardProps {
  trend: TrendingSearch;
}

export function TrendCard({ trend }: TrendCardProps) {
  const categories = trend.categories?.map((c) => c.name).join(', ') ?? '';
  const volume = trend.search_volume
    ? new Intl.NumberFormat().format(trend.search_volume)
    : null;
  const increase = trend.increase_percentage
    ? `+${trend.increase_percentage}%`
    : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{trend.query}</CardTitle>
        {(categories || volume || increase) && (
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            {categories && <span>{categories}</span>}
            {volume && <span>• {volume} searches</span>}
            {increase && <span>• {increase}</span>}
          </div>
        )}
      </CardHeader>
      {trend.trend_breakdown && trend.trend_breakdown.length > 0 && (
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Related: {trend.trend_breakdown.slice(0, 3).join(', ')}
          </p>
        </CardContent>
      )}
    </Card>
  );
}
