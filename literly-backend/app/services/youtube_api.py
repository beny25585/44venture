"""YouTube Data API v3 - fetch trending videos."""
import os
import httpx

YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3"


def fetch_trending_videos(region: str = "US", max_results: int = 10) -> list[dict]:
    """
    Fetch most popular videos via YouTube Data API v3.
    Uses videos.list with chart=mostPopular (1 quota unit).
    """
    api_key = os.getenv("YOUTUBE_API_KEY")
    if not api_key:
        raise ValueError("YOUTUBE_API_KEY is not set in environment")

    params = {
        "part": "snippet,statistics",
        "chart": "mostPopular",
        "regionCode": region[:2] if region else "US",
        "maxResults": min(max_results, 25),
        "key": api_key,
    }

    with httpx.Client(timeout=15.0) as client:
        response = client.get(f"{YOUTUBE_API_BASE}/videos", params=params)

    if response.status_code != 200:
        raise ValueError(f"YouTube API error: {response.status_code} - {response.text}")

    data = response.json()
    items = data.get("items", [])

    return [
        {
            "id": item.get("id"),
            "title": item.get("snippet", {}).get("title"),
            "thumbnail": (
                item.get("snippet", {})
                .get("thumbnails", {})
                .get("high", {})
                .get("url")
                or item.get("snippet", {})
                .get("thumbnails", {})
                .get("medium", {})
                .get("url")
            ),
            "viewCount": int(item.get("statistics", {}).get("viewCount", 0)),
            "likeCount": int(item.get("statistics", {}).get("likeCount", 0)),
            "commentCount": int(item.get("statistics", {}).get("commentCount", 0)),
            "publishedAt": item.get("snippet", {}).get("publishedAt"),
            "channelTitle": item.get("snippet", {}).get("channelTitle"),
        }
        for item in items
    ]
