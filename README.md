# 44venture

REST API service for trends, social content, humor, and YouTube data.

## Tech Stack

- **Runtime**: Python 3.x
- **Framework**: FastAPI
- **API**: REST only (no frontend, no Node backend)

## Project Structure

```
44venture/
  literly-backend/     # REST API (FastAPI + Python)
    app/
    main.py
    requirements.txt
    Dockerfile
    docker-compose.yml
```

## Quick Start

```bash
cd literly-backend
cp .env.example .env
# Edit .env and add your API keys (SERPAPI_KEY, HUMOR_API_KEY)

# Option 1: Docker
docker-compose up -d --build

# Option 2: Local
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

- **API**: http://localhost:8000 (local) or http://localhost:8001 (Docker)
- **Docs**: http://localhost:8000/docs

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SERPAPI_KEY` | Yes | SerpApi API key |
| `HUMOR_API_KEY` | Yes | Humor API key |
| `PORT` | No | Server port (default: 8000) |

## API Usage Examples

### Deployed (API Gateway + API Key)

Set your API key:

```bash
export LITERLY_API_KEY="YOUR_API_KEY"
```

Health check:

```bash
curl -H "x-api-key: $LITERLY_API_KEY" \
  "https://fdt4by1olk.execute-api.us-east-1.amazonaws.com/prod/health"
```

Trends (SerpApi):

```bash
curl -H "x-api-key: $LITERLY_API_KEY" \
  "https://fdt4by1olk.execute-api.us-east-1.amazonaws.com/prod/api/v1/trends/serpapi?geo=US&hours=24&limit=10"
```

Reddit hot posts:

```bash
curl -H "x-api-key: $LITERLY_API_KEY" \
  "https://fdt4by1olk.execute-api.us-east-1.amazonaws.com/prod/api/v1/reddit/hot?subreddit=technology&limit=3"
```

Random jokes:

```bash
curl -H "x-api-key: $LITERLY_API_KEY" \
  "https://fdt4by1olk.execute-api.us-east-1.amazonaws.com/prod/api/v1/jokes/random?number=3"
```

### Local (No API Key)

```bash
curl "http://localhost:8000/health"
curl "http://localhost:8000/api/v1/trends/serpapi?geo=US&hours=24&limit=10"
```

See [literly-backend/README.md](literly-backend/README.md) for full documentation.
