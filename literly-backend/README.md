# Literly Backend

AI Content Editor API - Transform Google Trends into viral video scripts with predictive sub-trends.

## Setup

1. **Create virtual environment** (recommended)
   ```bash
   python -m venv venv
   venv\Scripts\activate   # Windows
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Add your API keys to .env:
   OPENAI_API_KEY=sk-...
   PERPLEXITY_API_KEY=pplx-...   # Required for /search endpoint
   ```

## Run

```bash
uvicorn main:app --reload --port 8000
```

- API: http://localhost:8000
- Docs: http://localhost:8000/docs

## API

### `GET /search`

Search the web via Perplexity API. Returns ranked results with title, url, snippet.

**Query params:**
- `q` (required): Search query
- `max_results`: Max results (default 10, max 20)

### `GET /generate-trend-content`

Fetches top 5 daily Google Trends, predicts a sub-trend for ~7 days ahead, and generates a video brief.

**Query params:**
- `region`: `US` or `Israel` (default: US)

**Response:** JSON with `region`, `trends`, `predicted_sub_trend`, and `video_brief` (hook, body_points, cta, visual_suggestions).

## Note on Google Trends

If the pytrends API returns 404 (rate limits, geo restrictions), the service falls back to sample trends so you can still test the AI flow. In production, ensure your environment can reach Google Trends.
