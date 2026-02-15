"""Literly Backend - AI Content Editor API."""
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from app.models import TrendContentResponse
from app.services.trend_scraper import fetch_daily_trends
from app.services.ai_logic import generate_trend_content

app = FastAPI(
    title="Literly API",
    description="AI Content Editor - Transform Google Trends into viral video scripts",
    version="0.1.0",
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
    "/generate-trend-content",
    response_model=TrendContentResponse,
    summary="Generate viral video content from trending searches",
    description="Fetches top 5 daily Google Trends, predicts a sub-trend for 7 days ahead, and generates a structured video brief.",
)
def generate_trend_content_endpoint(
    region: str = Query(
        default="US",
        description="Region for trending searches: 'US' or 'Israel'",
        examples=["US", "Israel"],
    ),
):
    """
    GET /generate-trend-content

    1. Fetches top 5 daily trending searches for the given region
    2. Sends trends to OpenAI GPT-4o for analysis
    3. Returns predicted sub-trend + structured video brief (Hook, Body Points, CTA, Visual suggestions)
    """
    try:
        trends = fetch_daily_trends(region=region, limit=5)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    if not trends:
        raise HTTPException(
            status_code=503,
            detail="No trends returned. Google Trends may be temporarily unavailable.",
        )

    try:
        result = generate_trend_content(region=region, trends=trends)
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))

    return TrendContentResponse(
        region=region,
        trends=trends,
        predicted_sub_trend=result["predicted_sub_trend"],
        video_brief=result["video_brief"],
    )
