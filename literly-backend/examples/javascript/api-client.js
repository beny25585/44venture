/**
 * Literly API - JavaScript Examples
 * 
 * This file demonstrates how to use the Literly API from JavaScript/Node.js
 */

const API_BASE_URL = 'http://localhost:8000/api/v1';

/**
 * Fetch realtime Google Trends
 */
async function getRealtimeTrends(region = 'US', limit = 10) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/trends/realtime?region=${region}&limit=${limit}`
    );
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to fetch trends');
    }
    
    console.log('Realtime Trends:', data.data);
    return data.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

/**
 * Fetch trending YouTube videos
 */
async function getYouTubeTrending(region = 'US', maxResults = 10) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/youtube/trending?region=${region}&max_results=${maxResults}`
    );
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to fetch videos');
    }
    
    console.log('YouTube Trending:', data.data);
    return data.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

/**
 * Fetch random jokes
 */
async function getRandomJokes(number = 10) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/jokes/random?number=${number}`
    );
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to fetch jokes');
    }
    
    console.log('Random Jokes:', data.data);
    return data.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

/**
 * Search jokes with filters
 */
async function searchJokes(keywords = '', number = 10) {
  try {
    const params = new URLSearchParams({
      keywords,
      number: String(number),
    });
    
    const response = await fetch(
      `${API_BASE_URL}/jokes/search?${params.toString()}`
    );
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to search jokes');
    }
    
    console.log('Jokes Search Results:', data.data);
    return data.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

/**
 * Get a random meme
 */
async function getRandomMeme() {
  try {
    const response = await fetch(`${API_BASE_URL}/memes/random`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to fetch meme');
    }
    
    console.log('Random Meme:', data.data);
    return data.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

/**
 * Get hot Reddit posts
 */
async function getRedditHot(subreddit = 'all', limit = 25) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/reddit/hot?subreddit=${subreddit}&limit=${limit}`
    );
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to fetch Reddit posts');
    }
    
    console.log('Reddit Hot Posts:', data.data);
    return data.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

/**
 * Health check
 */
async function healthCheck() {
  try {
    const response = await fetch('http://localhost:8000/health');
    const data = await response.json();
    
    console.log('Health Check:', data);
    return data;
  } catch (error) {
    console.error('Health Check Failed:', error.message);
    throw error;
  }
}

// Example usage (uncomment to test)
// async function main() {
//   await healthCheck();
//   await getRealtimeTrends('US', 5);
//   await getYouTubeTrending('US', 5);
//   await getRandomJokes(3);
//   await searchJokes('programming', 5);
//   await getRandomMeme();
//   await getRedditHot('technology', 10);
// }
//
// main().catch(console.error);

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getRealtimeTrends,
    getYouTubeTrending,
    getRandomJokes,
    searchJokes,
    getRandomMeme,
    getRedditHot,
    healthCheck,
  };
}
