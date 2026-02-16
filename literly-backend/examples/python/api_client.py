"""
Literly API - Python Examples

This file demonstrates how to use the Literly API from Python.
"""

import requests
from typing import Optional, Dict, Any

API_BASE_URL = "http://localhost:8000/api/v1"


class LiterlyAPI:
    """Python client for the Literly API."""
    
    def __init__(self, base_url: str = API_BASE_URL):
        self.base_url = base_url
        self.session = requests.Session()
    
    def _request(self, method: str, endpoint: str, **kwargs) -> Dict[str, Any]:
        """Make a request to the API."""
        url = f"{self.base_url}{endpoint}"
        response = self.session.request(method, url, **kwargs)
        response.raise_for_status()
        return response.json()
    
    def health_check(self) -> Dict[str, Any]:
        """Check API health."""
        url = self.base_url.replace("/api/v1", "")
        response = self.session.get(f"{url}/health")
        response.raise_for_status()
        return response.json()
    
    def get_realtime_trends(self, region: str = "US", limit: int = 10) -> Dict[str, Any]:
        """Get realtime Google Trends.
        
        Args:
            region: Region code (e.g., "US", "IL")
            limit: Number of trends to return (1-25)
            
        Returns:
            Dict containing trends and source
        """
        params = {"region": region, "limit": limit}
        return self._request("GET", "/trends/realtime", params=params)
    
    def get_youtube_trending(self, region: str = "US", max_results: int = 10) -> Dict[str, Any]:
        """Get trending YouTube videos.
        
        Args:
            region: Region code
            max_results: Number of videos (1-25)
            
        Returns:
            Dict containing trending videos
        """
        params = {"region": region, "max_results": max_results}
        return self._request("GET", "/youtube/trending", params=params)
    
    def get_random_jokes(self, number: int = 10) -> Dict[str, Any]:
        """Get random jokes.
        
        Args:
            number: Number of jokes (1-10)
            
        Returns:
            Dict containing jokes
        """
        params = {"number": number}
        return self._request("GET", "/jokes/random", params=params)
    
    def search_jokes(
        self,
        keywords: str = "",
        include_tags: str = "",
        exclude_tags: str = "",
        number: int = 10,
    ) -> Dict[str, Any]:
        """Search jokes with filters.
        
        Args:
            keywords: Words that must appear in joke
            include_tags: Tags to include
            exclude_tags: Tags to exclude
            number: Number of results (1-10)
            
        Returns:
            Dict containing filtered jokes
        """
        params = {
            "keywords": keywords,
            "include_tags": include_tags,
            "exclude_tags": exclude_tags,
            "number": number,
        }
        return self._request("GET", "/jokes/search", params=params)
    
    def search_memes(self, keywords: str = "", number: int = 3) -> Dict[str, Any]:
        """Search memes.
        
        Args:
            keywords: Search keywords
            number: Number of memes (1-10)
            
        Returns:
            Dict containing memes
        """
        params = {"keywords": keywords, "number": number}
        return self._request("GET", "/memes/search", params=params)
    
    def get_random_meme(self) -> Dict[str, Any]:
        """Get a random meme.
        
        Returns:
            Dict containing meme data
        """
        return self._request("GET", "/memes/random")
    
    def get_reddit_hot(self, subreddit: str = "all", limit: int = 25) -> Dict[str, Any]:
        """Get hot Reddit posts.
        
        Args:
            subreddit: Subreddit name
            limit: Number of posts (1-100)
            
        Returns:
            Dict containing subreddit and posts
        """
        params = {"subreddit": subreddit, "limit": limit}
        return self._request("GET", "/reddit/hot", params=params)
    
    def get_today_content(self) -> Dict[str, Any]:
        """Get today's cached content.
        
        Returns:
            Dict containing cached content
        """
        return self._request("GET", "/today-content")


def standalone_examples():
    """Examples using standalone functions (without the class)."""
    
    # Health check
    response = requests.get("http://localhost:8000/health")
    print("Health Check:", response.json())
    
    # Get realtime trends
    params = {"region": "US", "limit": 10}
    response = requests.get(f"{API_BASE_URL}/trends/realtime", params=params)
    print("Realtime Trends:", response.json())
    
    # Get trending YouTube videos
    params = {"region": "US", "max_results": 5}
    response = requests.get(f"{API_BASE_URL}/youtube/trending", params=params)
    print("YouTube Trending:", response.json())
    
    # Get random jokes
    params = {"number": 3}
    response = requests.get(f"{API_BASE_URL}/jokes/random", params=params)
    print("Random Jokes:", response.json())
    
    # Search jokes
    params = {"keywords": "programming", "number": 5}
    response = requests.get(f"{API_BASE_URL}/jokes/search", params=params)
    print("Jokes Search:", response.json())
    
    # Get random meme
    response = requests.get(f"{API_BASE_URL}/memes/random")
    print("Random Meme:", response.json())
    
    # Get Reddit hot posts
    params = {"subreddit": "technology", "limit": 10}
    response = requests.get(f"{API_BASE_URL}/reddit/hot", params=params)
    print("Reddit Hot Posts:", response.json())


def class_examples():
    """Examples using the LiterlyAPI class."""
    
    client = LiterlyAPI()
    
    # Health check
    print("Health Check:", client.health_check())
    
    # Get realtime trends
    trends = client.get_realtime_trends(region="US", limit=5)
    print("Realtime Trends:", trends)
    
    # Get trending YouTube videos
    videos = client.get_youtube_trending(region="US", max_results=5)
    print("YouTube Trending:", videos)
    
    # Get random jokes
    jokes = client.get_random_jokes(number=3)
    print("Random Jokes:", jokes)
    
    # Search jokes
    results = client.search_jokes(keywords="programming", number=5)
    print("Jokes Search:", results)
    
    # Get random meme
    meme = client.get_random_meme()
    print("Random Meme:", meme)
    
    # Get Reddit hot posts
    posts = client.get_reddit_hot(subreddit="technology", limit=10)
    print("Reddit Hot Posts:", posts)


if __name__ == "__main__":
    print("=== Standalone Examples ===")
    standalone_examples()
    
    print("\n=== Class Examples ===")
    class_examples()
