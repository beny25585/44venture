"""Literly Backend - AI Content Editor API."""
import os
from contextlib import asynccontextmanager
from pathlib import Path

import httpx
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent / ".env")

from app.models import TrendContentResponse
from app.services.trend_scraper import fetch_daily_trends, fetch_realtime_trends
from app.services.ai_logic import generate_trend_content
from app.services.perplexity_search import search_perplexity
from app.services.daily_content_agent import (
    get_cached_today_content,
    start_daily_content_agent,
)
from app.services.reddit_proxy import fetch_hot_posts
from app.services.youtube_api import fetch_trending_videos
from app.services.humor_api import (
    search_jokes,
    get_random_jokes,
    search_memes,
    get_random_meme,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    start_daily_content_agent()
    yield


app = FastAPI(
    title="Literly API",
    description="AI Content Editor - Transform Google Trends into viral video scripts",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    """Health check."""
    return {"status": "ok", "service": "Literly API"}






@app.get(
    "/trends/realtime",
    summary="Realtime Google Trends",
    description="מה חפשו הכי הרבה עכשיו – realtime or daily trends.",
)
def trends_realtime_endpoint(
    region: str = Query(default="US", description="Region: US"),
    limit: int = Query(default=10, ge=1, le=25, description="Max trends"),
):
    """GET /trends/realtime – Trending searches from Google Trends."""
    try:
        trends, source = fetch_realtime_trends(region=region, limit=limit)
        return {"trends": trends, "source": source}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get(
    "/trends/serpapi",
    summary="Google Trends via SerpApi",
    description="Proxy to SerpApi google_trends_trending_now.",
)
def trends_serpapi_endpoint(
    geo: str = Query(default="US", description="Country code (e.g. US, IL)"),
    hours: int = Query(default=None, description="Time window: 4, 24, 48, or 168"),
):
    """GET /trends/serpapi - Proxy SerpApi trending now to avoid CORS."""
    api_key = os.getenv("SERPAPI_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="SERPAPI_KEY is not configured on the server.")

    params: dict = {
        "engine": "google_trends_trending_now",
        "api_key": api_key,
        "geo": geo,
    }
    if hours:
        params["hours"] = hours

    try:
        with httpx.Client(timeout=20.0) as client:
            resp = client.get("https://serpapi.com/search", params=params)
        data = resp.json()
        if "error" in data:
            raise HTTPException(status_code=502, detail=str(data["error"]))
        return {"trending_searches": data.get("trending_searches", [])}
    except httpx.HTTPError as e:
        raise HTTPException(status_code=502, detail=f"SerpApi request failed: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"SerpApi error: {e}")


@app.get("/today-content", summary="Today's cached content from agent")
def today_content_endpoint():
    """Returns cached content fetched by the daily agent."""
    cached = get_cached_today_content()
    if not cached:
        raise HTTPException(
            status_code=503,
            detail="Content not yet available. Agent is still fetching.",
        )
    return cached


@app.get(
    "/jokes/random",
    summary="Random jokes - what's hot now",
    description="Returns random jokes, no search needed.",
)
def jokes_random_endpoint(
    number: int = Query(default=10, ge=1, le=10, description="Number of jokes"),
):
    """GET /jokes/random - Random jokes from Humor API."""
    try:
        jokes = get_random_jokes(number=number)
        return {"jokes": jokes}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get(
    "/jokes/search",
    summary="Search jokes via Humor API",
    description="Search over 50,000 jokes by keywords and tags.",
)
def jokes_search_endpoint(
    keywords: str = Query(default="", description="Comma-separated words that must occur in the joke"),
    include_tags: str = Query(default="", description="Comma-separated tags the jokes should have"),
    exclude_tags: str = Query(default="", description="Comma-separated tags to exclude (e.g. nsfw,dark)"),
    min_rating: int = Query(default=None, ge=0, le=10, description="Minimum rating 0-10"),
    max_length: int = Query(default=None, ge=1, description="Maximum joke length in letters"),
    offset: int = Query(default=0, ge=0, le=1000, description="Number of jokes to skip"),
    number: int = Query(default=10, ge=1, le=10, description="Number of jokes to return"),
):
    """GET /jokes/search - Proxy to Humor API."""
    try:
        jokes = search_jokes(
            keywords=keywords or None,
            include_tags=include_tags or None,
            exclude_tags=exclude_tags or None,
            min_rating=min_rating,
            max_length=max_length,
            offset=offset,
            number=number,
        )
        return {"jokes": jokes}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get(
    "/memes/search",
    summary="Search memes from Reddit via Humor API",
    description="Search over 300,000 memes from Reddit.",
)
def memes_search_endpoint(
    keywords: str = Query(default="", description="Keywords to search for"),
    number: int = Query(default=3, ge=1, le=10, description="Number of memes"),
):
    """GET /memes/search - Memes from Reddit via Humor API."""
    try:
        memes = search_memes(keywords=keywords or None, number=number)
        return {"memes": memes}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get(
    "/memes/random",
    summary="Random meme from Reddit",
    description="Returns a random meme (image from Reddit).",
)
def memes_random_endpoint():
    """GET /memes/random - Single random meme from Humor API."""
    try:
        meme = get_random_meme()
        return meme
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get(
    "/youtube/trending",
    summary="Trending YouTube videos",
    description="מה חם ב-YouTube – most popular videos.",
)
def youtube_trending_endpoint(
    region: str = Query(default="US", description="Region code"),
    max_results: int = Query(default=10, ge=1, le=25, description="Max videos"),
):
    """GET /youtube/trending – Most popular videos from YouTube."""
    try:
        videos = fetch_trending_videos(region=region, max_results=max_results)
        return {"videos": videos}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/reddit/hot", summary="Hot posts from Reddit")
def reddit_hot_endpoint(
    subreddit: str = Query(default="all", description="Subreddit name"),
    limit: int = Query(default=25, ge=1, le=100, description="Max posts"),
):
    """Proxy to Reddit hot posts."""
    try:
        return fetch_hot_posts(subreddit=subreddit, limit=limit)
    except ValueError as e:
        raise HTTPException(status_code=503, detail=str(e))
