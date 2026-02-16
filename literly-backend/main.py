"""Literly Backend - Standalone REST API Service."""
import os
import logging
import time
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Any

import httpx
from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from mangum import Mangum

load_dotenv(Path(__file__).parent / ".env")

from app.config import HUMOR_API_KEY, SERPAPI_KEY
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

# Configure logging
logging.basicConfig(
    level=getattr(logging, os.getenv("LOG_LEVEL", "INFO").upper()),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# Configuration
PORT = int(os.getenv("PORT", 8000))
HOST = os.getenv("HOST", "0.0.0.0")
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:3000"
).split(",")
API_VERSION = "v1"
API_PREFIX = f"/api/{API_VERSION}"


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler."""
    logger.info("Starting up Literly API...")
    serp_ok = bool(SERPAPI_KEY)
    humor_ok = bool(HUMOR_API_KEY)
    logger.info(f"API keys loaded: serpapi={serp_ok}, humor_api={humor_ok}")
    if not serp_ok:
        logger.warning("SERPAPI_KEY not set - /api/v1/trends/serpapi will return 500")
    if not humor_ok:
        logger.warning("HUMOR_API_KEY not set - jokes/memes endpoints will fail")
    start_daily_content_agent()
    yield
    logger.info("Shutting down Literly API...")


app = FastAPI(
    title="Literly API",
    description="REST API for trends, social content, humor, and YouTube data",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Lambda handler for API Gateway
handler = Mangum(app)

# CORS middleware with environment-based configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in ALLOWED_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Log all incoming requests with timing."""
    start_time = time.time()
    
    # Log request
    logger.info(f"→ {request.method} {request.url.path}")
    
    response = await call_next(request)
    
    # Log response
    process_time = time.time() - start_time
    logger.info(f"← {request.method} {request.url.path} - {response.status_code} ({process_time:.2f}s)")
    
    # Add response headers
    response.headers["X-Request-ID"] = request.headers.get("X-Request-ID", "unknown")
    response.headers["X-Response-Time"] = str(process_time)
    
    return response


def success_response(data: Any, meta: dict | None = None) -> dict:
    """Standardized success response format."""
    response = {"data": data}
    if meta:
        response["meta"] = meta
    return response


def error_response(code: str, message: str, details: dict | None = None) -> JSONResponse:
    """Standardized error response format."""
    content: dict = {"error": {"code": code, "message": message}}
    if details:
        content["error"]["details"] = details
    return JSONResponse(content=content)


# ============================================================================
# Health Check Endpoints
# ============================================================================

@app.get("/health", tags=["Health"])
def health_check():
    """Basic health check endpoint.
    
    Returns:
        Service status
    """
    return {"status": "ok", "service": "Literly API", "version": "1.0.0"}


@app.get("/health/ready", tags=["Health"])
def health_ready():
    """Readiness check - verifies external dependencies.
    
    Returns:
        Ready status and dependency checks
    """
    checks = {
        "serpapi": bool(SERPAPI_KEY),
        "humor_api": bool(HUMOR_API_KEY),
    }
    
    all_ready = all(checks.values())
    
    if all_ready:
        return {
            "status": "ready",
            "checks": checks,
            "timestamp": time.time(),
        }
    else:
        raise HTTPException(
            status_code=503,
            detail={"status": "not_ready", "checks": checks}
        )


# ============================================================================
# API Version 1 Routes
# ============================================================================

# Trends


@app.get(
    f"{API_PREFIX}/trends/serpapi",
    summary="Google Trends via SerpApi",
    description="Get trending searches from Google Trends via SerpApi with search volume and trend breakdown.",
    tags=["Trends"],
)
def trends_serpapi_endpoint(
    geo: str = Query(default="US", description="Country code (e.g., US, IL)"),
    hl: str = Query(default="en", description="Language code (e.g., en, he)"),
    hours: int = Query(default=None, description="Time window: 4, 24, 48, or 168 hours"),
    limit: int = Query(default=20, ge=1, le=50, description="Maximum number of trends to return"),
):
    """Get trending searches via SerpApi.
    
    Args:
        geo: Country code
        hl: Language code
        hours: Time window in hours
        limit: Max trends to return (1-50)
        
    Returns:
        Parsed trending searches with query, search_volume, and trend_breakdown
    """
    if not SERPAPI_KEY:
        raise HTTPException(
            status_code=500,
            detail="SERPAPI_KEY is not configured on the server"
        )

    params: dict = {
        "engine": "google_trends_trending_now",
        "api_key": SERPAPI_KEY,
        "geo": geo,
        "hl": hl,
    }
    if hours:
        params["hours"] = hours

    try:
        with httpx.Client(timeout=20.0) as client:
            resp = client.get("https://serpapi.com/search.json", params=params)
        data = resp.json()
        if "error" in data:
            raise HTTPException(status_code=502, detail=str(data["error"]))

        raw_trends = data.get("trending_searches", [])[:limit]

        trends = []
        for trend in raw_trends:
            breakdown = trend.get("trend_breakdown", [])
            trends.append({
                "query": trend.get("query", ""),
                "search_volume": trend.get("search_volume", 0),
                "increase_percentage": trend.get("increase_percentage", 0),
                "trend_breakdown": breakdown if breakdown else [],
                "categories": trend.get("categories", []),
                "active": trend.get("active", False),
                "start_timestamp": trend.get("start_timestamp"),
            })

        return success_response(
            {"trending_searches": trends},
            {"geo": geo, "hl": hl, "hours": hours, "count": len(trends)}
        )
    except httpx.HTTPError as e:
        raise HTTPException(status_code=502, detail=f"SerpApi request failed: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"SerpApi error: {e}")


# Content
@app.get(
    f"{API_PREFIX}/today-content",
    summary="Today's cached content",
    description="Returns cached content fetched by the daily background agent.",
    tags=["Content"],
)
def today_content_endpoint():
    """Get today's cached content.
    
    Returns:
        Cached content with query, label, results, and timestamp
    """
    cached = get_cached_today_content()
    if not cached:
        raise HTTPException(
            status_code=503,
            detail="Content not yet available. Agent is still fetching."
        )
    return success_response(cached)


# Humor - Jokes
@app.get(
    f"{API_PREFIX}/jokes/random",
    summary="Random jokes",
    description="Get random jokes from Humor API.",
    tags=["Humor"],
)
def jokes_random_endpoint(
    number: int = Query(default=10, ge=1, le=10, description="Number of jokes to return"),
):
    """Get random jokes.
    
    Args:
        number: Number of jokes (1-10)
        
    Returns:
        List of random jokes
    """
    try:
        jokes = get_random_jokes(number=number)
        return success_response({"jokes": jokes}, {"count": len(jokes)})
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get(
    f"{API_PREFIX}/jokes/search",
    summary="Search jokes",
    description="Search over 50,000 jokes by keywords and tags via Humor API.",
    tags=["Humor"],
)
def jokes_search_endpoint(
    keywords: str = Query(default="", description="Comma-separated words that must occur in the joke"),
    include_tags: str = Query(default="", description="Comma-separated tags the jokes should have"),
    exclude_tags: str = Query(default="", description="Comma-separated tags to exclude (e.g., nsfw,dark)"),
    min_rating: int = Query(default=None, ge=0, le=10, description="Minimum rating 0-10"),
    max_length: int = Query(default=None, ge=1, description="Maximum joke length in letters"),
    offset: int = Query(default=0, ge=0, le=1000, description="Number of jokes to skip"),
    number: int = Query(default=10, ge=1, le=10, description="Number of jokes to return"),
):
    """Search jokes with filters.
    
    Args:
        keywords: Words that must appear in joke
        include_tags: Tags to include
        exclude_tags: Tags to exclude
        min_rating: Minimum rating (0-10)
        max_length: Maximum length in characters
        offset: Skip N results
        number: Number of results (1-10)
        
    Returns:
        Filtered list of jokes
    """
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
        return success_response({"jokes": jokes}, {"count": len(jokes), "offset": offset})
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


# Humor - Memes
@app.get(
    f"{API_PREFIX}/memes/search",
    summary="Search memes",
    description="Search over 300,000 memes from Reddit via Humor API.",
    tags=["Humor"],
)
def memes_search_endpoint(
    keywords: str = Query(default="", description="Keywords to search for"),
    number: int = Query(default=20, ge=1, le=20, description="Number of memes to return"),
    keywords_in_image: bool = Query(default=False, description="Search for keywords in image text"),
    media_type: str = Query(default="image", description="Filter by media type: image or video"),
):
    """Search memes.
    
    Args:
        keywords: Search keywords
        number: Number of memes (1-20)
        keywords_in_image: Search for keywords within meme image text
        media_type: Filter by image or video
        
    Returns:
        List of memes
    """
    try:
        memes = search_memes(
            keywords=keywords or None,
            number=number,
            keywords_in_image=keywords_in_image,
            media_type=media_type,
        )
        return success_response({"memes": memes}, {"count": len(memes)})
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get(
    f"{API_PREFIX}/memes/random",
    summary="Random meme",
    description="Get a random meme from Reddit via Humor API.",
    tags=["Humor"],
)
def memes_random_endpoint():
    """Get a random meme.
    
    Returns:
        Single random meme
    """
    try:
        meme = get_random_meme()
        return success_response(meme)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


# YouTube
@app.get(
    f"{API_PREFIX}/youtube/trending",
    summary="Trending YouTube videos",
    description="Get most popular videos from YouTube.",
    tags=["YouTube"],
)
def youtube_trending_endpoint(
    region: str = Query(default="US", description="Region code (e.g., US, IL)"),
    max_results: int = Query(default=10, ge=1, le=25, description="Maximum number of videos"),
):
    """Get trending YouTube videos.
    
    Args:
        region: Region code
        max_results: Number of videos (1-25)
        
    Returns:
        List of trending videos
    """
    try:
        videos = fetch_trending_videos(region=region, max_results=max_results)
        return success_response(
            {"videos": videos},
            {"region": region, "count": len(videos)}
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


# Reddit
@app.get(
    f"{API_PREFIX}/reddit/hot",
    summary="Hot Reddit posts",
    description="Get hot posts from a subreddit.",
    tags=["Reddit"],
)
def reddit_hot_endpoint(
    subreddit: str = Query(default="all", description="Subreddit name (e.g., technology, funny)"),
    limit: int = Query(default=25, ge=1, le=100, description="Maximum number of posts"),
):
    """Get hot posts from Reddit.
    
    Args:
        subreddit: Subreddit name
        limit: Number of posts (1-100)
        
    Returns:
        Subreddit name and list of hot posts
    """
    try:
        result = fetch_hot_posts(subreddit=subreddit, limit=limit)
        return success_response(result, {"subreddit": subreddit, "count": len(result.get("posts", []))})
    except ValueError as e:
        raise HTTPException(status_code=503, detail=str(e))


# ============================================================================
# Global Exception Handlers
# ============================================================================

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Handle HTTP exceptions with standardized format."""
    return error_response(
        code=f"HTTP_{exc.status_code}",
        message=str(exc.detail) if isinstance(exc.detail, str) else "An error occurred",
        details={"path": request.url.path} if exc.status_code >= 500 else None
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Handle unexpected exceptions."""
    logger.error(f"Unexpected error: {exc}", exc_info=True)
    return error_response(
        code="INTERNAL_ERROR",
        message="An unexpected error occurred",
        details={"path": request.url.path, "type": type(exc).__name__}
    )
