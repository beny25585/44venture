"""Trend Scraper Service - fetches daily trending searches using pytrends."""
from pytrends.request import TrendReq
from pytrends import exceptions as pytrends_exceptions


# Region to geo parameter for today_searches (daily trends API)
REGION_TO_GEO = {
    "US": "US",
    "Israel": "IL",
}

# Fallback sample trends when Google Trends API returns 404 (e.g. rate limit, geo restrictions)
FALLBACK_TRENDS = [
    "AI tools 2025",
    "electric vehicles",
    "sustainable fashion",
    "remote work tips",
    "mental health apps",
]


def fetch_daily_trends(region: str = "US", limit: int = 5, use_fallback: bool = True) -> list[str]:
    """
    Fetch the top daily trending searches for the specified region.

    Args:
        region: Either 'US' or 'Israel'
        limit: Number of top trends to return (default 5)
        use_fallback: If True, return sample trends when Google API fails (default True)

    Returns:
        List of trending search strings

    Raises:
        ValueError: If region is not supported
    """
    geo = REGION_TO_GEO.get(region)
    if not geo:
        raise ValueError(f"Unsupported region: {region}. Use 'US' or 'Israel'.")

    try:
        pytrends = TrendReq(hl="en-US", tz=360)
        df = pytrends.today_searches(pn=geo)
        # today_searches returns a Series; convert to list
        trends = df.tolist() if hasattr(df, "tolist") else df.iloc[:, -1].tolist()
        return trends[:limit]
    except (pytrends_exceptions.ResponseError, Exception):
        if use_fallback:
            return FALLBACK_TRENDS[:limit]
        raise
