import { useEffect, useCallback } from "react";
import { getAsyncStories } from "../api/getStories";

const useFetchStories = (query, dispatch) => {
  const fetchStories = useCallback(async () => {
    dispatch({ type: "STORIES_FETCH_INIT" });
    try {
      const hits = await getAsyncStories(query);
      dispatch({ type: "STORIES_FETCH_SUCCESS", payload: hits });
    } catch {
      dispatch({ type: "STORIES_FETCH_FAILURE" });
    }
  }, [query, dispatch]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);
};

export default useFetchStories;
