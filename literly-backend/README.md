# Literly API

A standalone REST API service for trends, social content, humor, and YouTube data.

## Features

- **Trends**: Realtime Google Trends and SerpApi trending searches
- **Humor**: Random jokes and memes via Humor API
- **Social**: Hot Reddit posts
- **YouTube**: Trending videos
- **Content**: Daily cached content from background agent

## Quick Start

### Using Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd literly-backend

# Copy environment file
cp .env.example .env
# Edit .env and add your API keys

# Start with Docker Compose (port 8001 to avoid conflicts)
docker-compose up -d --build

# Check if running
curl http://localhost:8001/health

# API available at http://localhost:8001
# Docs at http://localhost:8001/docs
```

### Local Development

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env
# Edit .env and add your API keys

# Run development server
uvicorn main:app --reload --port 8000

# API available at http://localhost:8000
```

## API Base URL

- **Docker**: `http://localhost:8001/api/v1`
- **Local**: `http://localhost:8000/api/v1`

## API Endpoints

### Health Checks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Basic health check |
| GET | `/health/ready` | Readiness check with dependency status |

### Trends

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/api/v1/trends/realtime` | Realtime Google Trends | `region` (US), `limit` (1-25, default: 10) |
| GET | `/api/v1/trends/serpapi` | Google Trends via SerpApi | `geo` (US), `hours` (4, 24, 48, 168) |

### Content

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/today-content` | Today's cached content from agent |

### Humor

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/api/v1/jokes/random` | Random jokes | `number` (1-10, default: 10) |
| GET | `/api/v1/jokes/search` | Search jokes | `keywords`, `include_tags`, `exclude_tags`, `min_rating`, `max_length`, `offset`, `number` |
| GET | `/api/v1/memes/search` | Search memes | `keywords`, `number` (1-10) |
| GET | `/api/v1/memes/random` | Random meme | - |

### YouTube

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/api/v1/youtube/trending` | Trending YouTube videos | `region` (US), `max_results` (1-25, default: 10) |

### Reddit

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/api/v1/reddit/hot` | Hot posts from subreddit | `subreddit` (all), `limit` (1-100, default: 25) |

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 8000 | Server port |
| `HOST` | No | 0.0.0.0 | Server host |
| `SERPAPI_KEY` | Yes | - | SerpApi API key |
| `HUMOR_API_KEY` | Yes | - | Humor API key |
| `ALLOWED_ORIGINS` | No | localhost | Comma-separated CORS origins |
| `LOG_LEVEL` | No | info | Logging level (debug, info, warning, error) |

## API Response Format

All successful responses follow this format:

```json
{
  "data": { ... },
  "meta": { ... }
}
```

Example:
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

Error responses:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": { ... }
  }
}
```

## Getting API Keys

### SerpApi
1. Sign up at https://serpapi.com
2. Get your API key from the dashboard
3. Add to `.env`: `SERPAPI_KEY=your_key_here`

### Humor API
1. Sign up at https://humorapi.com
2. Get your API key from the dashboard
3. Add to `.env`: `HUMOR_API_KEY=your_key_here`

## Documentation

- [TEST.md](TEST.md) - Testing the API
- [HOW-TO-USE.md](HOW-TO-USE.md) - Detailed usage guide

## Development

### Project Structure

```
literly-backend/
├── app/
│   ├── config/          # Configuration files
│   ├── services/        # Business logic and external API integrations
│   ├── models.py        # Pydantic models
│   └── __init__.py
├── main.py              # FastAPI application entry point
├── requirements.txt     # Python dependencies
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose configuration
├── .env.example        # Environment variables template
├── examples/           # Usage examples (JS, Python, cURL)
├── README.md           # This file
├── TEST.md            # Testing guide
└── HOW-TO-USE.md      # Usage guide
```

## Deployment

### Railway

1. Push code to GitHub
2. Connect Railway to your repository
3. Add environment variables in Railway dashboard
4. Deploy

### Render

1. Create a new Web Service
2. Connect your GitHub repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables
6. Deploy

## API Documentation

Interactive API documentation is available at:
- Swagger UI: `http://localhost:8001/docs` (Docker) or `http://localhost:8000/docs` (Local)
- ReDoc: `http://localhost:8001/redoc` (Docker) or `http://localhost:8000/redoc` (Local)

## Troubleshooting

### Port already in use
If port 8000 is taken, edit `docker-compose.yml` and change:
```yaml
ports:
  - "8001:8000"  # Change 8001 to any available port
```

### Container won't start
Check logs:
```bash
docker-compose logs -f
```

### Permission denied
Rebuild with:
```bash
docker-compose down
docker-compose up -d --build
```

## License

[Your License Here]

## Support

For issues and feature requests, please use the GitHub issue tracker.
