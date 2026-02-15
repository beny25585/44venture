"""Humor API - jokes search proxy."""
import os
import random
import httpx

HUMOR_API_BASE = "https://api.humorapi.com"


def search_jokes(
    keywords: str | None = None,
    include_tags: str | None = None,
    exclude_tags: str | None = None,
    min_rating: int | None = None,
    max_length: int | None = None,
    offset: int = 0,
    number: int = 10,
) -> list[dict]:
    """
    Search jokes via Humor API.

    https://api.humorapi.com/jokes/search
    """
    api_key = os.getenv("HUMOR_API_KEY")
    if not api_key:
        raise ValueError("HUMOR_API_KEY is not set in environment")

    params: dict = {"api-key": api_key, "offset": offset, "number": number}
    if keywords:
        params["keywords"] = keywords
    if include_tags:
        params["include-tags"] = include_tags
    if exclude_tags:
        params["exclude-tags"] = exclude_tags
    if min_rating is not None:
        params["min-rating"] = min_rating
    if max_length is not None:
        params["max-length"] = max_length

    with httpx.Client(timeout=15.0) as client:
        response = client.get(f"{HUMOR_API_BASE}/jokes/search", params=params)

    if response.status_code != 200:
        raise ValueError(f"Humor API error: {response.status_code} - {response.text}")

    data = response.json()
    return data if isinstance(data, list) else data.get("jokes", [])


def get_random_jokes(number: int = 10) -> list[dict]:
    """Fetch random jokes - uses search with random offset for variety."""
    return search_jokes(
        keywords="the",
        offset=random.randint(0, 900),
        number=number,
    )


def search_memes(keywords: str | None = None, number: int = 3) -> list[dict]:
    """Search memes via Humor API (300,000+ memes from Reddit)."""
    api_key = os.getenv("HUMOR_API_KEY")
    if not api_key:
        raise ValueError("HUMOR_API_KEY is not set in environment")

    params: dict = {"api-key": api_key, "number": number}
    if keywords:
        params["keywords"] = keywords

    with httpx.Client(timeout=15.0) as client:
        response = client.get(f"{HUMOR_API_BASE}/memes/search", params=params)

    if response.status_code != 200:
        raise ValueError(f"Humor API error: {response.status_code} - {response.text}")

    data = response.json()
    return data.get("memes", [])


def get_random_meme() -> dict:
    """Get a single random meme from Humor API."""
    api_key = os.getenv("HUMOR_API_KEY")
    if not api_key:
        raise ValueError("HUMOR_API_KEY is not set in environment")

    with httpx.Client(timeout=15.0) as client:
        response = client.get(
            f"{HUMOR_API_BASE}/memes/random",
            params={"api-key": api_key},
        )

    if response.status_code != 200:
        raise ValueError(f"Humor API error: {response.status_code} - {response.text}")

    return response.json()
