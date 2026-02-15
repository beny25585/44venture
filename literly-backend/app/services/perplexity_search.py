"""Perplexity Search Service - fetches web search results via Perplexity API."""
import os
import httpx

PERPLEXITY_SEARCH_URL = "https://api.perplexity.ai/search"


def search_perplexity(query: str, max_results: int = 10) -> list[dict]:
    """
    Search the web using Perplexity API.

    Args:
        query: Search query string
        max_results: Maximum number of results (default 10)

    Returns:
        List of dicts with keys: title, url, snippet, date, last_updated

    Raises:
        ValueError: If API key is missing or API returns an error
    """
    api_key = os.getenv("PERPLEXITY_API_KEY")
    if not api_key:
        raise ValueError("PERPLEXITY_API_KEY is not set in environment")

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    payload = {
        "query": query,
        "max_results": max_results,
    }

    with httpx.Client(timeout=30.0) as client:
        response = client.post(PERPLEXITY_SEARCH_URL, json=payload, headers=headers)

    if response.status_code != 200:
        raise ValueError(
            f"Perplexity API error: {response.status_code} - {response.text}"
        )

    data = response.json()
    return data.get("results", [])
