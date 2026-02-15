import type { Request, Response } from 'express';

const REDDIT_BASE = 'https://www.reddit.com';
const USER_AGENT = 'LiterlyApp:44venture:v1.0 (by /u/literly)';

export async function getHotPosts(req: Request, res: Response): Promise<void> {
  const subreddit = (req.query.subreddit as string) || 'all';
  const limit = Math.min(Number(req.query.limit) || 25, 100);

  const url = `${REDDIT_BASE}/r/${encodeURIComponent(subreddit)}/hot.json?limit=${limit}`;

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
    });

    if (!response.ok) {
      res.status(response.status).json({
        error: 'Reddit API error',
        detail: response.statusText,
      });
      return;
    }

    const data = (await response.json()) as {
      data?: { children?: Array<{ data?: RedditPost }> };
    };

    const rawPosts = data.data?.children?.map((c) => c.data) ?? [];
    const posts = rawPosts.filter((p): p is RedditPost => p != null);

    res.json({
      subreddit,
      posts: posts.map(normalizePost),
    });
  } catch (err) {
    console.error('Reddit proxy error:', err);
    res.status(503).json({
      error: 'Reddit unavailable',
      detail: err instanceof Error ? err.message : 'Unknown error',
    });
  }
}

interface RedditPost {
  id?: string;
  title?: string;
  subreddit?: string;
  score?: number;
  num_comments?: number;
  url?: string;
  permalink?: string;
  selftext?: string;
  thumbnail?: string;
  created_utc?: number;
  author?: string;
  over_18?: boolean;
}

function normalizePost(p: RedditPost) {
  return {
    id: p.id,
    title: p.title,
    subreddit: p.subreddit,
    score: p.score,
    numComments: p.num_comments,
    url: p.url,
    permalink: p.permalink ? `https://reddit.com${p.permalink}` : undefined,
    snippet: p.selftext?.slice(0, 300),
    thumbnail: p.thumbnail,
    createdAt: p.created_utc,
    author: p.author,
    nsfw: p.over_18,
  };
}
