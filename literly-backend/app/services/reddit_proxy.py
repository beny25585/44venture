"""Reddit API proxy – fetches hot posts from Reddit."""
import httpx

REDDIT_BASE = "https://www.reddit.com"
USER_AGENT = "LiterlyApp:44venture:v1.0 (by /u/literly)"


def fetch_hot_posts(subreddit: str = "all", limit: int = 25) -> dict:
    url = f"{REDDIT_BASE}/r/{subreddit}/hot.json?limit={limit}"
    with httpx.Client(timeout=15.0, headers={"User-Agent": USER_AGENT}) as client:
        response = client.get(url)

    if response.status_code != 200:
        raise ValueError(f"Reddit API error: {response.status_code}")

    data = response.json()
    children = data.get("data", {}).get("children", [])

    posts = []
    for c in children:
        p = c.get("data", {})
        if not p:
            continue
        posts.append({
            "id": p.get("id"),
            "title": p.get("title"),
            "subreddit": p.get("subreddit"),
            "score": p.get("score"),
            "numComments": p.get("num_comments"),
            "url": p.get("url"),
            "permalink": f"https://reddit.com{p['permalink']}" if p.get("permalink") else None,
            "snippet": (p.get("selftext") or "")[:300],
            "thumbnail": p.get("thumbnail"),
            "createdAt": p.get("created_utc"),
            "author": p.get("author"),
            "nsfw": p.get("over_18"),
        })

    return {"subreddit": subreddit, "posts": posts}
