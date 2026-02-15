# Content Curator - AI-Powered Content Discovery Tool

## How to Work With This Project

### Prompt Template
When asking me (the AI) to implement features, use this format:

```
I want you to [WHAT TO DO]. Do it according to project's best practices, make sure to focus on the @backend only. Validate yourself before we continue. Make minimal changes. [Add more sentences that define HOW to do and approach the task, not just WHAT to do.]
```

### Example Prompts

**Create a new route:**
```
I want you to create a route for updating the user's name. Do it according to project's best practices, make sure to focus on the @backend only. Validate yourself before we continue. Make minimal changes.
```

**Create a new model:**
```
I want you to create a Mongoose model for trends. Do it according to project's best practices, make sure to focus on the @backend only. Follow the existing pattern in backend/src/models/. Validate yourself before we continue.
```

**Add a feature:**
```
I want you to add Reddit API integration to fetch trending posts. Do it according to project's best practices, make sure to focus on the @backend only. Use environment variables for API keys. Make minimal changes.
```

## Project Overview

Build a content curation tool for Cheesburger editors that helps them find content to post on the site. The tool connects trending topics from multiple platforms with editor preferences and Discover performance data.

## Problem Being Solved

Editors currently spend too much time manually searching across multiple platforms (Reddit, Twitter, Facebook, Google Trends) to find content. They need a unified dashboard that:
- Searches multiple platforms in one place
- Knows what content already exists on Cheesburger
- Learns individual editor preferences
- Shows what's trending + relevant
- Uses feedback from Discover (what performed well) to improve recommendations

## Core Features

### 1. Multi-Platform Search
- Search Reddit (via PRAW API - free)
- Search Twitter/X (via Twitter API v2)
- Fetch Google Trends (via PyTrends - free)
- Normalize all data into a common format

### 2. Content Database
- Store all trending content found
- Track what Cheesburger has already published
- Deduplicate similar content (using embeddings)
- Tag content by topic/category

### 3. Editor Preferences
- Questionnaire to capture preferences (topics, formats, sources)
- Store preferences per editor
- Weight results based on preferences

### 4. Recommendation Engine
- Score content based on: engagement + recency + relevance + preferences
- Use AI to categorize content
- Learn from Discover performance feedback

### 5. Performance Feedback
- Import metrics from Discover (what performed well)
- Feed back into recommendation algorithm
- Show editors what topics are working

## Data Models

### Source
```javascript
{
  platform: 'reddit' | 'twitter' | 'google_trends',
  name: string,
  active: boolean
}
```

### Trend
```javascript
{
  source_id: ObjectId,
  external_id: string,        // ID from source platform
  title: string,
  url: string,
  content: string,
  engagement: {
    likes: number,
    comments: number,
    shares: number
  },
  published_at: Date,
  topic_tags: string[],
  created_at: Date
}
```

### Preference
```javascript
{
  editor_id: string,
  topics: string[],           // e.g., ['celebrities', 'movies', 'tv']
  formats: string[],         // e.g., ['listicle', 'trivia', 'pictofact']
  sources: string[],          // preferred platforms
  created_at: Date
}
```

### PublishedContent
```javascript
{
  cheesburger_url: string,
  title: string,
  topic_tags: string[],
  discover_metrics: {
    views: number,
    engagement: number,
    ctr: number
  },
  published_at: Date
}
```

## API Routes

```
GET  /api/trends              - Get trending content (with filters)
GET  /api/trends/:id          - Get single trend
POST /api/trends/refresh     - Trigger refresh from sources
GET  /api/sources            - List available sources
GET  /api/sources/:id/stats  - Source statistics

POST /api/preferences        - Save editor preferences
GET  /api/preferences/:editor_id - Get editor preferences

POST /api/published          - Record published content
GET  /api/published          - List published content (for dedup)

GET  /api/recommend          - Get AI-powered recommendations
POST /api/feedback           - Submit performance feedback
```

## Tech Stack

- **Frontend:** React 19 + Vite + TypeScript + Tailwind + shadcn/ui + Redux
- **Backend:** Express 5 + Node.js + MongoDB (Mongoose)
- **External APIs:**
  - Reddit: PRAW (Python) or snoowrap (JavaScript) - FREE
  - Twitter: Twitter API v2 - $100+/month
  - Google Trends: pytrends (Python) or trendsapi - FREE

## Implementation Priority

### MVP (Day 1)
1. Set up MongoDB connection
2. Create data models
3. Build Reddit API connector
4. Build Google Trends connector
5. Basic dashboard showing trends
6. Simple search/filter

### Day 2
1. Editor preferences UI
2. Content scoring algorithm
3. Deduplication logic
4. Connect Discover metrics
5. Polish and testing

## Key Design Decisions

1. **Use MongoDB** - Per team requirement
2. **Start with free APIs** - Reddit + Google Trends (MVP), add Twitter later
3. **Simple scoring first** - Can add AI categorization later
4. **Seed with existing content** - Import some Cheesburger URLs for dedup testing

## Success Metrics

- Time saved per editor (manual search vs. tool)
- % of recommended content that gets published
- Discover performance of recommended vs. non-recommended content
