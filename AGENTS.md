# AGENTS.md

Guidelines for AI coding agents working in this repository.

## Project Overview

REST API service (literly-backend only):
- **Stack**: FastAPI + Python
- **Scope**: No frontend, no Node/Express backend
- **Focus**: `literly-backend/` is the only active codebase

## Quick Start

```bash
cd literly-backend
cp .env.example .env
# Add SERPAPI_KEY and HUMOR_API_KEY to .env
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## Project Structure

```
literly-backend/
├── app/
│   ├── config/          # Environment config (SERPAPI_KEY, HUMOR_API_KEY, etc.)
│   ├── services/        # Business logic and external API integrations
│   └── models.py        # Pydantic models
├── main.py              # FastAPI app entry point
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
└── .env.example
```

## Code Style

- **Python**: Follow PEP 8
- **Imports**: Use `from app.config import SERPAPI_KEY, HUMOR_API_KEY` for API keys
- **Errors**: Use HTTPException with appropriate status codes

## Environment Variables

All config in `literly-backend/.env`:
- `SERPAPI_KEY` - SerpApi (required for trends/serpapi endpoint)
- `HUMOR_API_KEY` - Humor API (required for jokes/memes endpoints)

## Useful Prompts

> "Add a new endpoint to literly-backend according to project patterns. Focus on literly-backend only."

> "Fix [issue] in literly-backend. Minimal changes."
