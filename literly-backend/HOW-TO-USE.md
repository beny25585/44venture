# How to Use the Literly API

Complete guide for using the Literly API in your applications.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Authentication](#authentication)
3. [Making Requests](#making-requests)
4. [Response Handling](#response-handling)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)
7. [Client Examples](#client-examples)
8. [Common Use Cases](#common-use-cases)
9. [Best Practices](#best-practices)

## Getting Started

### 1. Start the API

```bash
# Using Docker
docker-compose up -d

# Or locally
uvicorn main:app --reload --port 8000
```

### 2. Verify It's Running

```bash
curl http://localhost:8001/health
```

### 3. Get Your API Keys

- **SerpApi**: https://serpapi.com (for Google Trends)
- **Humor API**: https://humorapi.com (for jokes and memes)

Add them to your `.env` file:
```
SERPAPI_KEY=your_serpapi_key_here
HUMOR_API_KEY=your_humor_api_key_here
```

## Authentication

Currently, the API doesn't require authentication for most endpoints. However, you need valid API keys for the underlying services (SerpApi, Humor API).

### Future Authentication

If authentication is added, you'll use:
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" http://localhost:8001/api/v1/trends/realtime
```

## Making Requests

### Base URL

```
Docker: http://localhost:8001/api/v1
Local:  http://localhost:8000/api/v1
```

### HTTP Methods

All endpoints use **GET** requests since we're retrieving data.

### Query Parameters

Pass parameters as query strings:

```bash
curl "http://localhost:8001/api/v1/trends/realtime?region=US&limit=10"
```

### Request Headers

Optional but recommended:
```bash
curl -H "Accept: application/json" \
     -H "User-Agent: YourApp/1.0" \
     http://localhost:8001/api/v1/jokes/random
```

## Response Handling

### Success Response Structure

All successful responses have this structure:

```json
{
  "data": { ... },      // The actual data
  "meta": { ... }       // Metadata about the request
}
```

### Extracting Data

**JavaScript:**
```javascript
const response = await fetch('http://localhost:8001/api/v1/jokes/random?number=3');
const result = await response.json();
const jokes = result.data.jokes;  // Array of jokes
const count = result.meta.count;  // Number of jokes returned
```

**Python:**
```python
import requests

response = requests.get('http://localhost:8001/api/v1/jokes/random?number=3')
result = response.json()
jokes = result['data']['jokes']  # Array of jokes
count = result['meta']['count']  # Number of jokes returned
```

### Response Types by Endpoint

#### Trends Response
```json
{
  "data": {
    "trends": ["AI", "Python", "Docker"],
    "source": "realtime"
  },
  "meta": {
    "region": "US",
    "limit": 10
  }
}
```

#### Jokes Response
```json
{
  "data": {
    "jokes": [
      {
        "id": 1,
        "joke": "Why do programmers prefer dark mode? Because light attracts bugs."
      }
    ]
  },
  "meta": {
    "count": 1
  }
}
```

#### YouTube Response
```json
{
  "data": {
    "videos": [
      {
        "id": "video_id",
        "title": "Video Title",
        "thumbnail": "url",
        "viewCount": 1000000,
        "likeCount": 50000,
        "commentCount": 1000,
        "publishedAt": "2024-01-01",
        "channelTitle": "Channel Name"
      }
    ]
  },
  "meta": {
    "region": "US",
    "count": 10
  }
}
```

#### Reddit Response
```json
{
  "data": {
    "subreddit": "technology",
    "posts": [
      {
        "id": "post_id",
        "title": "Post Title",
        "subreddit": "technology",
        "score": 1500,
        "numComments": 200,
        "url": "https://...",
        "permalink": "/r/technology/...",
        "snippet": "Post text...",
        "thumbnail": "url",
        "createdAt": 1234567890,
        "author": "username",
        "nsfw": false
      }
    ]
  },
  "meta": {
    "subreddit": "technology",
    "count": 25
  }
}
```

## Error Handling

### Error Response Structure

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": { ... }  // Optional additional info
  }
}
```

### Common Error Codes

| Code | HTTP Status | Meaning |
|------|-------------|---------|
| `HTTP_400` | 400 | Bad Request - Invalid parameters |
| `HTTP_404` | 404 | Not Found - Endpoint doesn't exist |
| `HTTP_422` | 422 | Validation Error - Invalid input |
| `HTTP_429` | 429 | Rate Limited - Too many requests |
| `HTTP_500` | 500 | Server Error - Something went wrong |
| `HTTP_502` | 502 | Bad Gateway - External API error |
| `HTTP_503` | 503 | Service Unavailable - Dependency down |

### Handling Errors in Code

**JavaScript:**
```javascript
async function fetchJokes() {
  try {
    const response = await fetch('http://localhost:8001/api/v1/jokes/random?number=10');
    const data = await response.json();
    
    if (!response.ok) {
      // Handle error
      console.error('Error:', data.error.code, data.error.message);
      throw new Error(data.error.message);
    }
    
    return data.data.jokes;
  } catch (error) {
    console.error('Failed to fetch jokes:', error);
    return [];
  }
}
```

**Python:**
```python
import requests

def fetch_jokes():
    try:
        response = requests.get('http://localhost:8001/api/v1/jokes/random?number=10')
        data = response.json()
        
        if not response.ok:
            error = data.get('error', {})
            print(f"Error {error.get('code')}: {error.get('message')}")
            return []
        
        return data['data']['jokes']
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        return []
```

## Rate Limiting

The API implements rate limiting to ensure fair usage:

- **Default**: 100 requests per minute per IP
- **Strict endpoints**: 20 requests per minute (SerpApi trends)

### Rate Limit Headers

When rate limited, you'll receive:
```
HTTP/1.1 429 Too Many Requests
Retry-After: 60
```

### Handling Rate Limits

**JavaScript:**
```javascript
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const response = await fetch(url, options);
    
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After') || 60;
      console.log(`Rate limited. Waiting ${retryAfter}s...`);
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      continue;
    }
    
    return response;
  }
  
  throw new Error('Max retries exceeded');
}
```

## Client Examples

### Complete JavaScript Client

```javascript
class LiterlyAPI {
  constructor(baseURL = 'http://localhost:8001/api/v1') {
    this.baseURL = baseURL;
  }

  async request(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${this.baseURL}${endpoint}${queryString ? '?' + queryString : ''}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Request failed');
    }
    
    return data.data;
  }

  // Trends
  async getRealtimeTrends(region = 'US', limit = 10) {
    return this.request('/trends/realtime', { region, limit });
  }

  async getSerpApiTrends(geo = 'US', hours) {
    const params = { geo };
    if (hours) params.hours = hours;
    return this.request('/trends/serpapi', params);
  }

  // Humor
  async getRandomJokes(number = 10) {
    return this.request('/jokes/random', { number });
  }

  async searchJokes(keywords, options = {}) {
    return this.request('/jokes/search', { keywords, ...options });
  }

  async getRandomMeme() {
    return this.request('/memes/random');
  }

  async searchMemes(keywords, number = 3) {
    return this.request('/memes/search', { keywords, number });
  }

  // YouTube
  async getYouTubeTrending(region = 'US', max_results = 10) {
    return this.request('/youtube/trending', { region, max_results });
  }

  // Reddit
  async getRedditHot(subreddit = 'all', limit = 25) {
    return this.request('/reddit/hot', { subreddit, limit });
  }

  // Content
  async getTodayContent() {
    return this.request('/today-content');
  }
}

// Usage
const api = new LiterlyAPI();

// Get trends
api.getRealtimeTrends('US', 5)
  .then(data => console.log('Trends:', data.trends))
  .catch(err => console.error('Error:', err));

// Get jokes
api.getRandomJokes(3)
  .then(data => console.log('Jokes:', data.jokes))
  .catch(err => console.error('Error:', err));
```

### Complete Python Client

```python
import requests
from typing import Optional, Dict, Any, List

class LiterlyAPI:
    """Python client for Literly API."""
    
    def __init__(self, base_url: str = "http://localhost:8001/api/v1"):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            "Accept": "application/json",
            "User-Agent": "LiterlyAPI-Client/1.0"
        })
    
    def _request(self, endpoint: str, params: Dict = None) -> Dict[str, Any]:
        """Make a GET request to the API."""
        url = f"{self.base_url}{endpoint}"
        response = self.session.get(url, params=params)
        
        data = response.json()
        
        if not response.ok:
            error = data.get("error", {})
            raise Exception(f"{error.get('code')}: {error.get('message')}")
        
        return data["data"]
    
    def get_realtime_trends(self, region: str = "US", limit: int = 10) -> Dict[str, Any]:
        """Get realtime Google Trends."""
        return self._request("/trends/realtime", {"region": region, "limit": limit})
    
    def get_serpapi_trends(self, geo: str = "US", hours: Optional[int] = None) -> Dict[str, Any]:
        """Get trends via SerpApi."""
        params = {"geo": geo}
        if hours:
            params["hours"] = hours
        return self._request("/trends/serpapi", params)
    
    def get_random_jokes(self, number: int = 10) -> Dict[str, Any]:
        """Get random jokes."""
        return self._request("/jokes/random", {"number": number})
    
    def search_jokes(
        self,
        keywords: str = "",
        include_tags: str = "",
        exclude_tags: str = "",
        number: int = 10
    ) -> Dict[str, Any]:
        """Search jokes with filters."""
        params = {
            "keywords": keywords,
            "include_tags": include_tags,
            "exclude_tags": exclude_tags,
            "number": number
        }
        return self._request("/jokes/search", params)
    
    def get_random_meme(self) -> Dict[str, Any]:
        """Get a random meme."""
        return self._request("/memes/random")
    
    def search_memes(self, keywords: str = "", number: int = 3) -> Dict[str, Any]:
        """Search memes."""
        return self._request("/memes/search", {"keywords": keywords, "number": number})
    
    def get_youtube_trending(self, region: str = "US", max_results: int = 10) -> Dict[str, Any]:
        """Get trending YouTube videos."""
        return self._request("/youtube/trending", {"region": region, "max_results": max_results})
    
    def get_reddit_hot(self, subreddit: str = "all", limit: int = 25) -> Dict[str, Any]:
        """Get hot Reddit posts."""
        return self._request("/reddit/hot", {"subreddit": subreddit, "limit": limit})
    
    def get_today_content(self) -> Dict[str, Any]:
        """Get today's cached content."""
        return self._request("/today-content")

# Usage
if __name__ == "__main__":
    api = LiterlyAPI()
    
    # Get trends
    try:
        trends = api.get_realtime_trends("US", 5)
        print("Trends:", trends["trends"])
    except Exception as e:
        print(f"Error: {e}")
    
    # Get jokes
    try:
        jokes = api.get_random_jokes(3)
        for joke in jokes["jokes"]:
            print(f"- {joke['joke']}")
    except Exception as e:
        print(f"Error: {e}")
```

## Common Use Cases

### 1. Social Media Dashboard

```javascript
// Get trending topics from multiple sources
async function getTrendingTopics() {
  const [googleTrends, youtubeVideos, redditPosts] = await Promise.all([
    api.getRealtimeTrends('US', 10),
    api.getYouTubeTrending('US', 5),
    api.getRedditHot('technology', 10)
  ]);
  
  return {
    google: googleTrends.trends,
    youtube: youtubeVideos.videos.map(v => v.title),
    reddit: redditPosts.posts.map(p => p.title)
  };
}
```

### 2. Content Generator

```python
# Generate content ideas from trends
class ContentGenerator:
    def __init__(self, api: LiterlyAPI):
        self.api = api
    
    def generate_ideas(self, niche: str = "technology"):
        # Get trends
        trends = self.api.get_realtime_trends("US", 5)
        
        # Get related content
        reddit_posts = self.api.get_reddit_hot(niche, 5)
        youtube_videos = self.api.get_youtube_trending("US", 5)
        
        ideas = []
        for trend in trends["trends"]:
            ideas.append({
                "topic": trend,
                "suggested_title": f"What's happening with {trend}?",
                "related_reddit": [p["title"] for p in reddit_posts["posts"][:3]],
                "related_youtube": [v["title"] for v in youtube_videos["videos"][:3]]
            })
        
        return ideas
```

### 3. Meme/Joke Bot

```javascript
// Discord bot or Twitter bot
async function postDailyMeme() {
  try {
    const meme = await api.getRandomMeme();
    
    // Post to your platform
    await postToDiscord({
      title: 'Daily Meme',
      image: meme.url,
      source: 'Humor API'
    });
  } catch (error) {
    console.error('Failed to post meme:', error);
  }
}

async function postRandomJoke() {
  try {
    const jokes = await api.getRandomJokes(1);
    const joke = jokes.jokes[0];
    
    await postToTwitter(joke.joke);
  } catch (error) {
    console.error('Failed to post joke:', error);
  }
}
```

### 4. Trend Analysis

```python
import json
from datetime import datetime

class TrendAnalyzer:
    def __init__(self, api: LiterlyAPI):
        self.api = api
        self.history = []
    
    def capture_trends(self):
        """Capture current trends for analysis."""
        trends = self.api.get_realtime_trends("US", 20)
        
        snapshot = {
            "timestamp": datetime.now().isoformat(),
            "trends": trends["trends"],
            "source": trends["source"]
        }
        
        self.history.append(snapshot)
        return snapshot
    
    def find_persisting_trends(self, hours: int = 24):
        """Find trends that have persisted over time."""
        # Implementation would compare snapshots
        pass
    
    def save_history(self, filename: str = "trends_history.json"):
        """Save trend history to file."""
        with open(filename, 'w') as f:
            json.dump(self.history, f, indent=2)
```

## Best Practices

### 1. Always Handle Errors

```javascript
// Bad
const data = await fetch(url).then(r => r.json());

// Good
try {
  const response = await fetch(url);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error?.message);
  }
  
  return data.data;
} catch (error) {
  console.error('API Error:', error);
  // Return fallback data or show user-friendly error
}
```

### 2. Implement Caching

```javascript
// Simple in-memory cache
const cache = new Map();

async function cachedRequest(url, ttl = 60000) {
  const cached = cache.get(url);
  
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }
  
  const response = await fetch(url);
  const data = await response.json();
  
  cache.set(url, {
    data: data.data,
    timestamp: Date.now()
  });
  
  return data.data;
}

// Usage
const trends = await cachedRequest('/api/v1/trends/realtime?region=US', 300000); // 5 min cache
```

### 3. Use Connection Pooling

```python
# Python requests with session
import requests

# Good - reuse session
session = requests.Session()

for i in range(100):
    response = session.get('http://localhost:8001/api/v1/jokes/random')

# Bad - create new connection each time
for i in range(100):
    response = requests.get('http://localhost:8001/api/v1/jokes/random')  # Slower!
```

### 4. Batch Requests When Possible

```javascript
// Bad - 10 separate requests
const jokes = [];
for (let i = 0; i < 10; i++) {
  const response = await api.getRandomJokes(1);
  jokes.push(...response.jokes);
}

// Good - 1 request for 10 jokes
const response = await api.getRandomJokes(10);
const jokes = response.jokes;
```

### 5. Implement Retry Logic

```javascript
async function fetchWithRetry(url, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      
      if (response.ok) {
        return await response.json();
      }
      
      // If rate limited, wait and retry
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After') || delay;
        await new Promise(resolve => setTimeout(resolve, retryAfter));
        continue;
      }
      
      // For other errors, throw immediately
      throw new Error(`HTTP ${response.status}`);
      
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
}
```

### 6. Validate Responses

```python
from typing import Dict, List

def validate_trends_response(data: Dict) -> bool:
    """Validate trends response structure."""
    if "data" not in data:
        return False
    
    trends_data = data["data"]
    
    if "trends" not in trends_data or not isinstance(trends_data["trends"], list):
        return False
    
    if "source" not in trends_data:
        return False
    
    return True

# Usage
response = api.get_realtime_trends()
if not validate_trends_response(response):
    raise ValueError("Invalid response structure")
```

### 7. Monitor Performance

```javascript
// Track API call performance
async function timedRequest(url) {
  const start = performance.now();
  
  try {
    const response = await fetch(url);
    const duration = performance.now() - start;
    
    console.log(`API call to ${url} took ${duration.toFixed(2)}ms`);
    
    // Alert if slow
    if (duration > 2000) {
      console.warn('Slow API response detected');
    }
    
    return response;
  } catch (error) {
    const duration = performance.now() - start;
    console.error(`API call failed after ${duration.toFixed(2)}ms:`, error);
    throw error;
  }
}
```

## Additional Resources

- **OpenAPI Spec**: http://localhost:8001/docs
- **Example Code**: See `examples/` directory
- **Test Guide**: See [TEST.md](TEST.md)
- **API Status**: http://localhost:8001/health

## Getting Help

If you encounter issues:

1. Check the API is running: `curl http://localhost:8001/health`
2. View logs: `docker-compose logs -f`
3. Check API keys are set in `.env`
4. See [TEST.md](TEST.md) for troubleshooting
