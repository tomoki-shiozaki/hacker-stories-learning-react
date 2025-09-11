import React from "react";
import storiesReducer from "../reducers/storiesReducer";
import initialStoriesState from "../reducers/initialStoriesState";
import useFetchStories from "./useFetchStories";
import { Story } from "../types";

export const useStories = (query: string) => {
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    initialStoriesState
  );

  useFetchStories(query, dispatchStories);

  const handleRemoveStory = React.useCallback(
    (item: Story) => {
      dispatchStories({
        type: "REMOVE_STORY",
        payload: item,
      });
    },
    [dispatchStories]
  );

  return { stories, handleRemoveStory };
};
