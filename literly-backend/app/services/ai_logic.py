"""AI Logic Layer - sends trends to OpenAI and generates video briefs."""
import json
from openai import OpenAI

from app.config import OPENAI_API_KEY
from app.models import VideoBrief


SYSTEM_PROMPT = """You are an expert content strategist and viral video creator. Your task is to:
1. Analyze current Google Trends
2. Predict a related "sub-trend" that will likely peak in ~7 days based on upcoming events, cyclical behavior, or natural progression
3. Generate a viral-ready video brief

Always respond with valid JSON matching the exact schema requested."""

USER_PROMPT_TEMPLATE = """Analyze these top daily trending searches from {region}:

{trends_text}

Tasks:
1. Identify patterns and themes across these trends.
2. Predict ONE related "sub-trend" (a specific topic, event, or angle) that you expect will peak in interest in approximately 7 days. Base this on:
   - Upcoming events (holidays, product launches, anniversaries)
   - Cyclical patterns (seasonal, weekly rhythms)
   - Natural progression of current news cycles

3. Generate a structured video brief for a viral short-form video about your predicted sub-trend. Make it engaging and shareable.

Respond ONLY with valid JSON in this exact format (no markdown, no extra text):
{{
  "predicted_sub_trend": "your predicted sub-trend topic",
  "video_brief": {{
    "hook": "Opening hook (5-10 words max, grabs attention)",
    "body_points": [
      "Point 1 - first main idea",
      "Point 2 - second main idea",
      "Point 3 - third main idea"
    ],
    "cta": "Call-to-action (e.g., follow, comment, share)",
    "visual_suggestions": [
      "Visual for hook section",
      "Visual for point 1",
      "Visual for point 2",
      "Visual for point 3",
      "Visual for CTA"
    ]
  }}
}}"""


def generate_trend_content(region: str, trends: list[str]) -> dict:
    """
    Send trends to OpenAI GPT-4o and get structured video brief + prediction.

    Args:
        region: Region name (US or Israel)
        trends: List of trending search strings

    Returns:
        Dict with predicted_sub_trend and video_brief (VideoBrief-compatible)

    Raises:
        ValueError: If OPENAI_API_KEY is not set or AI response is invalid
    """
    if not OPENAI_API_KEY:
        raise ValueError("OPENAI_API_KEY is not set. Add it to your .env file.")

    trends_text = "\n".join(f"- {t}" for t in trends)
    user_prompt = USER_PROMPT_TEMPLATE.format(
        region=region,
        trends_text=trends_text,
    )

    client = OpenAI(api_key=OPENAI_API_KEY)
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.7,
    )

    content = response.choices[0].message.content
    if not content:
        raise ValueError("OpenAI returned empty response.")

    # Strip markdown code blocks if present
    content = content.strip()
    if content.startswith("```"):
        lines = content.split("\n")
        content = "\n".join(lines[1:-1]) if lines[0].startswith("```") else content

    try:
        data = json.loads(content)
    except json.JSONDecodeError as e:
        raise ValueError(f"OpenAI response was not valid JSON: {e}") from e

    video_brief_raw = data.get("video_brief", {})
    if not video_brief_raw:
        raise ValueError("OpenAI response missing 'video_brief'.")

    # Ensure body_points has exactly 3 items
    body_points = video_brief_raw.get("body_points", [])
    if len(body_points) < 3:
        body_points = (body_points + ["", "", ""])[:3]
    elif len(body_points) > 3:
        body_points = body_points[:3]

    video_brief = VideoBrief(
        hook=video_brief_raw.get("hook", ""),
        body_points=body_points,
        cta=video_brief_raw.get("cta", ""),
        visual_suggestions=video_brief_raw.get("visual_suggestions", []),
    )

    return {
        "predicted_sub_trend": data.get("predicted_sub_trend", ""),
        "video_brief": video_brief,
    }
