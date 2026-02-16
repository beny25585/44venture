import client from "./client";
import type {
  JokesResponse,
  RandomJokesParams,
  SearchJokesParams,
  MemesResponse,
  RandomMemeResponse,
  SearchMemesParams,
} from "./types";

export async function getRandomJokes(params?: RandomJokesParams) {
  const { data } = await client.get<JokesResponse>("/api/v1/jokes/random", {
    params,
  });
  return data;
}

export async function searchJokes(params?: SearchJokesParams) {
  const { data } = await client.get<JokesResponse>("/api/v1/jokes/search", {
    params,
  });
  return data;
}

export async function searchMemes(params?: SearchMemesParams) {
  const { data } = await client.get<MemesResponse>("/api/v1/memes/search", {
    params,
  });
  return data;
}

export async function getRandomMeme() {
  const { data } = await client.get<RandomMemeResponse>("/api/v1/memes/random");
  return data;
}
