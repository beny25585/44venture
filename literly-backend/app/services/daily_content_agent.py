"""Daily Content Agent – fetches today's content on schedule and caches it."""
from datetime import datetime

from apscheduler.schedulers.background import BackgroundScheduler

from app.config.daily_topics import get_today_topic
from app.services.perplexity_search import search_perplexity

_cached_content: dict | None = None


def _fetch_and_cache():
    global _cached_content
    topic = get_today_topic()
    try:
        results = search_perplexity(query=topic["query"], max_results=10)
        _cached_content = {
            "query": topic["query"],
            "label": topic["label"],
            "results": results,
            "fetchedAt": datetime.utcnow().isoformat() + "Z",
        }
        print(f"[DailyContentAgent] Fetched and cached: {topic['label']}")
    except Exception as e:
        print(f"[DailyContentAgent] Fetch failed: {e}")


def get_cached_today_content():
    return _cached_content


def start_daily_content_agent():
    _fetch_and_cache()
    scheduler = BackgroundScheduler()
    scheduler.add_job(_fetch_and_cache, "interval", hours=1)
    scheduler.start()
    print("[DailyContentAgent] Started - fetches every hour")
