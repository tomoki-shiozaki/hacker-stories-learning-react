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
