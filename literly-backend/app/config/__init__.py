"""Load configuration from environment variables."""
import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
SERPAPI_KEY = os.getenv("SERPAPI_KEY")
HUMOR_API_KEY = os.getenv("HUMOR_API_KEY")
