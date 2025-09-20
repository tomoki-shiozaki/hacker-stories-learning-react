import { useEffect, useCallback } from "react";
import { getAsyncStories } from "../../api/getStories";
import type { StoriesAction, Story } from "../../types/story";

export const useFetchStories = (
  query: string,
  dispatch: React.Dispatch<StoriesAction>
): void => {
  const fetchStories = useCallback(async () => {
    dispatch({ type: "STORIES_FETCH_INIT" });

    try {
      const hits: Story[] = await getAsyncStories(query);
      dispatch({ type: "STORIES_FETCH_SUCCESS", payload: hits });
    } catch {
      dispatch({ type: "STORIES_FETCH_FAILURE" });
    }
  }, [query, dispatch]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);
};
