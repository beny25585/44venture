"""Daily topics by day of week (0=Monday in Python, 6=Sunday)."""
from datetime import datetime

DAILY_TOPICS = {
    0: {"label": "יום שני – דברים שחמים היום", "query": "trending today viral hot topics"},
    1: {"label": "יום שלישי – טכנולוגיה", "query": "technology news latest"},
    2: {"label": "יום רביעי – בריאות וכושר", "query": "health fitness wellness tips"},
    3: {"label": "יום חמישי – בידור", "query": "entertainment viral trending"},
    4: {"label": "יום שישי – טיפים לסוף שבוע", "query": "weekend tips ideas"},
    5: {"label": "יום שבת – פנאי ותחביבים", "query": "hobbies relaxation leisure"},
    6: {"label": "יום ראשון – חתולים", "query": "cats trending viral content"},
}


def get_today_topic():
    """Python weekday: 0=Monday, 6=Sunday."""
    return DAILY_TOPICS[datetime.now().weekday()]
