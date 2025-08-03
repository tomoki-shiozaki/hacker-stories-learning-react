const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

export const getAsyncStories = async (query) => {
  const response = await fetch(`${API_ENDPOINT}${query}`);
  if (!response.ok) {
    throw new Error("Request failed");
  }
  const result = await response.json();
  return result.hits;
};
