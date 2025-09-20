import type { Story } from "../types/story";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

type AlgoliaResponse = {
  hits: Story[];
};

export const getAsyncStories = async (query: string): Promise<Story[]> => {
  const response = await fetch(`${API_ENDPOINT}${query}`);
  if (!response.ok) {
    throw new Error("Fetch failed");
  }

  const result: AlgoliaResponse = await response.json();
  return result.hits;
};
