export type Story = {
  objectID: string;
  title: string;
  url: string;
  author: string;
  num_comments: number;
  points: number;
};

export type StoriesState = {
  data: Story[];
  isLoading: boolean;
  isError: boolean;
};

export type StoriesAction =
  | { type: "STORIES_FETCH_INIT" }
  | { type: "STORIES_FETCH_SUCCESS"; payload: Story[] }
  | { type: "STORIES_FETCH_FAILURE" }
  | { type: "REMOVE_STORY"; payload: Story };
