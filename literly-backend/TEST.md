# Testing the Literly API

Base URL:
- **Docker**: `http://localhost:8001`
- **Local**: `http://localhost:8000`

Interactive docs: **http://localhost:8001/docs** (Swagger UI)

---

## 1. Health Checks

### Basic Health
```
http://localhost:8001/health
```

### Readiness (checks API keys)
```
http://localhost:8001/health/ready
```

---

## 2. Trends (SerpApi) - 10 Test Calls

### 2.1 US trends, last 24 hours
```
http://localhost:8001/api/v1/trends/serpapi?geo=US&hl=en&hours=24&limit=10
```

### 2.2 US trends, last 4 hours (freshest)
```
http://localhost:8001/api/v1/trends/serpapi?geo=US&hl=en&hours=4&limit=10
```

### 2.3 US trends, last 48 hours
```
http://localhost:8001/api/v1/trends/serpapi?geo=US&hl=en&hours=48&limit=10
```

### 2.4 US trends, last week (168 hours)
```
http://localhost:8001/api/v1/trends/serpapi?geo=US&hl=en&hours=168&limit=10
```

### 2.5 Israel trends, Hebrew
```
http://localhost:8001/api/v1/trends/serpapi?geo=IL&hl=he&hours=24&limit=10
```

### 2.6 UK trends
```
http://localhost:8001/api/v1/trends/serpapi?geo=GB&hl=en&hours=24&limit=10
```

### 2.7 Germany trends, German
```
http://localhost:8001/api/v1/trends/serpapi?geo=DE&hl=de&hours=24&limit=10
```

### 2.8 France trends, French
```
http://localhost:8001/api/v1/trends/serpapi?geo=FR&hl=fr&hours=24&limit=10
```

### 2.9 Japan trends, Japanese
```
http://localhost:8001/api/v1/trends/serpapi?geo=JP&hl=ja&hours=24&limit=10
```

### 2.10 Brazil trends, Portuguese
```
http://localhost:8001/api/v1/trends/serpapi?geo=BR&hl=pt&hours=24&limit=10
```

### Expected response structure
```json
{
  "data": {
    "trending_searches": [
      {
        "query": "maya hawke",
        "search_volume": 200000,
        "increase_percentage": 1000,
        "trend_breakdown": ["maya hawke wedding", "ethan hawke"],
        "categories": [{"id": 4, "name": "Entertainment"}],
        "active": true,
        "start_timestamp": 1771179600
      }
    ]
  },
  "meta": {
    "geo": "US",
    "hl": "en",
    "hours": 24,
    "count": 10
  }
}
```

---

## 3. Humor API - Memes (10 Test Calls)

### 3.1 Search memes by keyword
```
http://localhost:8001/api/v1/memes/search?keywords=dog&number=20&keywords_in_image=true&media_type=image
```

### 3.2 Cat memes
```
http://localhost:8001/api/v1/memes/search?keywords=cat&number=20&keywords_in_image=true&media_type=image
```

### 3.3 Programming memes
```
http://localhost:8001/api/v1/memes/search?keywords=programming&number=20&keywords_in_image=true&media_type=image
```

### 3.4 Office memes
```
http://localhost:8001/api/v1/memes/search?keywords=office&number=10&keywords_in_image=true&media_type=image
```

### 3.5 Monday memes
```
http://localhost:8001/api/v1/memes/search?keywords=monday&number=10&keywords_in_image=true&media_type=image
```

### 3.6 Trending topic memes (combine with SerpApi results)
```
http://localhost:8001/api/v1/memes/search?keywords=presidents+day&number=20&keywords_in_image=true&media_type=image
```

### 3.7 Video memes
```
http://localhost:8001/api/v1/memes/search?keywords=funny&number=10&keywords_in_image=false&media_type=video
```

### 3.8 Random meme
```
http://localhost:8001/api/v1/memes/random
```

### 3.9 Search memes without keywords (browse)
```
http://localhost:8001/api/v1/memes/search?number=20&media_type=image
```

### 3.10 Specific topic meme search
```
http://localhost:8001/api/v1/memes/search?keywords=elon+musk&number=20&keywords_in_image=true&media_type=image
```

### Expected response structure
```json
{
  "data": {
    "memes": [
      {
        "id": 476841,
        "description": "Consider your trip a success!",
        "url": "https://preview.redd.it/xywo0clsho5c1.jpg",
        "type": "image/jpeg"
      }
    ]
  },
  "meta": {
    "count": 20
  }
}
```

---

## 4. Humor API - Jokes (10 Test Calls)

### 4.1 Random jokes
```
http://localhost:8001/api/v1/jokes/random?number=5
```

### 4.2 Search jokes by keyword
```
http://localhost:8001/api/v1/jokes/search?keywords=cat&number=5
```

### 4.3 Programming jokes
```
http://localhost:8001/api/v1/jokes/search?keywords=programming&number=5
```

### 4.4 Clean jokes only (exclude nsfw and dark)
```
http://localhost:8001/api/v1/jokes/search?keywords=dog&exclude_tags=nsfw,dark&number=5
```

### 4.5 Short jokes only
```
http://localhost:8001/api/v1/jokes/search?keywords=funny&max_length=100&number=5
```

### 4.6 High rated jokes
```
http://localhost:8001/api/v1/jokes/search?min_rating=7&number=5
```

### 4.7 One-liner jokes (include tag)
```
http://localhost:8001/api/v1/jokes/search?include_tags=one_liner&number=5
```

### 4.8 Search with offset (pagination)
```
http://localhost:8001/api/v1/jokes/search?keywords=work&number=5&offset=10
```

### 4.9 Doctor jokes
```
http://localhost:8001/api/v1/jokes/search?keywords=doctor&number=5
```

### 4.10 Food jokes, clean, short
```
http://localhost:8001/api/v1/jokes/search?keywords=food&exclude_tags=nsfw&max_length=150&number=5
```

### Expected response structure
```json
{
  "data": {
    "jokes": [
      {
        "id": 45044,
        "joke": "Why do programmers prefer dark mode? Because light attracts bugs."
      }
    ]
  },
  "meta": {
    "count": 5,
    "offset": 0
  }
}
```

---

## 5. Reddit

### Hot posts from technology
```
http://localhost:8001/api/v1/reddit/hot?subreddit=technology&limit=10
```

### Hot posts from funny
```
http://localhost:8001/api/v1/reddit/hot?subreddit=funny&limit=10
```

### Hot posts from all
```
http://localhost:8001/api/v1/reddit/hot?subreddit=all&limit=5
```

---

## 6. YouTube Trending

```
http://localhost:8001/api/v1/youtube/trending?region=US&max_results=10
```

> Note: Requires `YOUTUBE_API_KEY` in `.env`. Will return an error if not set.

---

## 7. Today Content (Background Agent)

```
http://localhost:8001/api/v1/today-content
```

> Note: Returns 503 if the background agent hasn't finished fetching yet. Wait a few minutes after startup.

---

## 8. Error Cases

### Missing API key (if SERPAPI_KEY not set)
```
http://localhost:8001/api/v1/trends/serpapi?geo=US
```
Expected: `{"error": {"code": "HTTP_500", "message": "SERPAPI_KEY is not configured on the server"}}`

### Invalid limit (exceeds max)
```
http://localhost:8001/api/v1/trends/serpapi?geo=US&limit=999
```
Expected: 422 validation error

### Not found endpoint
```
http://localhost:8001/api/v1/nonexistent
```
Expected: 404

---

## 9. Docker Commands

```bash
# Start
docker-compose up -d --build

# Check status + healthcheck
docker-compose ps

# View logs (live)
docker-compose logs -f

# Restart
docker-compose restart

# Stop
docker-compose down
```

---

## 10. Quick Test All (PowerShell)

Paste this in PowerShell to test every endpoint at once:

```powershell
$base = "http://localhost:8001"
$endpoints = @(
    "/health",
    "/health/ready",
    "/api/v1/trends/serpapi?geo=US&hl=en&hours=24&limit=3",
    "/api/v1/trends/serpapi?geo=IL&hl=he&hours=24&limit=3",
    "/api/v1/jokes/random?number=2",
    "/api/v1/jokes/search?keywords=cat&number=2",
    "/api/v1/memes/search?keywords=dog&number=2&keywords_in_image=true&media_type=image",
    "/api/v1/memes/random",
    "/api/v1/reddit/hot?subreddit=technology&limit=2",
    "/api/v1/youtube/trending?region=US&max_results=2"
)

foreach ($ep in $endpoints) {
    Write-Host "`n--- $ep ---" -ForegroundColor Cyan
    try {
        $r = Invoke-RestMethod -Uri "$base$ep" -TimeoutSec 20
        $r | ConvertTo-Json -Depth 5 | Select-Object -First 20
    } catch {
        Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    }
}
Write-Host "`nDone!" -ForegroundColor Green
```
