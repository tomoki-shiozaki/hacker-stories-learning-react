import { storiesReducer, initialStoriesState } from "./storiesReducer";
import { Story, StoriesAction, StoriesState } from "../types/story";

const createStory = (overrides?: Partial<Story>): Story => ({
  objectID: "default-id",
  title: "Default Title",
  url: "http://example.com",
  author: "Anonymous",
  num_comments: 0,
  points: 0,
  ...overrides,
});

describe("storiesReducer", () => {
  it("handles STORIES_FETCH_INIT", () => {
    const action: StoriesAction = { type: "STORIES_FETCH_INIT" };
    const state = storiesReducer(initialStoriesState, action);

    expect(state.isLoading).toBe(true);
    expect(state.isError).toBe(false);
  });

  it("handles STORIES_FETCH_SUCCESS", () => {
    const stories = [
      createStory({ objectID: "1", title: "Story 1" }),
      createStory({ objectID: "2", title: "Story 2" }),
    ];

    const action: StoriesAction = {
      type: "STORIES_FETCH_SUCCESS",
      payload: stories,
    };

    const state = storiesReducer(initialStoriesState, action);

    expect(state.isLoading).toBe(false);
    expect(state.isError).toBe(false);
    expect(state.data).toEqual(stories);
  });

  it("handles STORIES_FETCH_FAILURE", () => {
    const action: StoriesAction = { type: "STORIES_FETCH_FAILURE" };
    const state = storiesReducer(initialStoriesState, action);

    expect(state.isLoading).toBe(false);
    expect(state.isError).toBe(true);
  });

  it("handles REMOVE_STORY", () => {
    const prevState: StoriesState = {
      ...initialStoriesState,
      data: [
        createStory({ objectID: "1", title: "Story 1" }),
        createStory({ objectID: "2", title: "Story 2" }),
      ],
    };

    const action: StoriesAction = {
      type: "REMOVE_STORY",
      payload: createStory({ objectID: "1", title: "Story 1" }),
    };

    const state = storiesReducer(prevState, action);

    expect(state.data).toHaveLength(1);
    expect(state.data[0].objectID).toBe("2");
  });

  it("throws error on unhandled action", () => {
    // StoriesAction には存在しない type を意図的に渡す
    const action = { type: "UNKNOWN_ACTION" } as unknown as StoriesAction;

    expect(() => storiesReducer(initialStoriesState, action)).toThrow(
      "Unhandled action type"
    );
  });
});
