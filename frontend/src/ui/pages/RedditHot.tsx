import { useGetHotQuery } from '@/store/apis/reddit.api';
import { Link } from 'react-router';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shadcn/components/ui/card';
import { Button } from '@/shadcn/components/ui/button';

export function RedditHot() {
  const { data, isLoading, error, refetch } = useGetHotQuery(
    { subreddit: 'all', limit: 30 },
    { refetchOnMountOrArgChange: true }
  );

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1>מה חם עכשיו ב-Reddit</h1>
        <Link to="/">
          <Button variant="outline" size="sm">← חיפוש בדיחות</Button>
        </Link>
      </div>

      <p className="text-muted-foreground">
        הפוסטים הכי חמים מ-r/all כרגע
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Hot on Reddit</CardTitle>
          <p className="text-sm text-muted-foreground">
            r/{data?.subreddit ?? 'all'} • {data?.posts?.length ?? 0} פוסטים
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => void refetch()}
            disabled={isLoading}
          >
            {isLoading ? 'טוען...' : 'רענן'}
          </Button>

          {error && (
            <div className="text-destructive">
              שגיאה בטעינה. ודא ש-backend רץ.
            </div>
          )}

          {data?.posts && (
            <ul className="space-y-4">
              {data.posts.map((post) => (
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
                        <span>↑ {post.score}</span>
                        <span>💬 {post.numComments}</span>
                        {post.author && <span>u/{post.author}</span>}
                        {post.nsfw && (
                          <span className="text-destructive">NSFW</span>
                        )}
                      </div>
                      {post.snippet && (
                        <p className="text-sm mt-2 line-clamp-2 text-muted-foreground">
                          {post.snippet}...
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
