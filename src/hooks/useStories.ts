import React from "react";
import {
  storiesReducer,
  initialStoriesState,
} from "../reducers/storiesReducer";
import useFetchStories from "./useFetchStories";
import { Story } from "../types/story";

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
