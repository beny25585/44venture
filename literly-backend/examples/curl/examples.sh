#!/bin/bash
#
# Literly API - cURL Examples
#
# This file demonstrates how to use the Literly API with cURL commands.
#

API_BASE_URL="http://localhost:8000/api/v1"

echo "========================================="
echo "Literly API - cURL Examples"
echo "========================================="
echo ""

# Health Check
echo "1. Health Check"
echo "   GET /health"
curl -s http://localhost:8000/health | jq .
echo ""

# Health Ready Check
echo "2. Health Ready Check"
echo "   GET /health/ready"
curl -s http://localhost:8000/health/ready | jq .
echo ""

# Realtime Trends
echo "3. Get Realtime Trends (US, limit=5)"
echo "   GET /api/v1/trends/realtime?region=US&limit=5"
curl -s "${API_BASE_URL}/trends/realtime?region=US&limit=5" | jq .
echo ""

# SerpApi Trends
echo "4. Get SerpApi Trends (US)"
echo "   GET /api/v1/trends/serpapi?geo=US"
curl -s "${API_BASE_URL}/trends/serpapi?geo=US" | jq .
echo ""

# Today's Content
echo "5. Get Today's Content"
echo "   GET /api/v1/today-content"
curl -s "${API_BASE_URL}/today-content" | jq .
echo ""

# Random Jokes
echo "6. Get Random Jokes (3 jokes)"
echo "   GET /api/v1/jokes/random?number=3"
curl -s "${API_BASE_URL}/jokes/random?number=3" | jq .
echo ""

# Search Jokes
echo "7. Search Jokes (programming, 5 results)"
echo "   GET /api/v1/jokes/search?keywords=programming&number=5"
curl -s "${API_BASE_URL}/jokes/search?keywords=programming&number=5" | jq .
echo ""

# Search Memes
echo "8. Search Memes (cat, 3 results)"
echo "   GET /api/v1/memes/search?keywords=cat&number=3"
curl -s "${API_BASE_URL}/memes/search?keywords=cat&number=3" | jq .
echo ""

# Random Meme
echo "9. Get Random Meme"
echo "   GET /api/v1/memes/random"
curl -s "${API_BASE_URL}/memes/random" | jq .
echo ""

# YouTube Trending
echo "10. Get YouTube Trending (US, 5 videos)"
echo "    GET /api/v1/youtube/trending?region=US&max_results=5"
curl -s "${API_BASE_URL}/youtube/trending?region=US&max_results=5" | jq .
echo ""

# Reddit Hot Posts
echo "11. Get Reddit Hot Posts (technology, 10 posts)"
echo "    GET /api/v1/reddit/hot?subreddit=technology&limit=10"
curl -s "${API_BASE_URL}/reddit/hot?subreddit=technology&limit=10" | jq .
echo ""

echo "========================================="
echo "Examples completed!"
echo "========================================="
