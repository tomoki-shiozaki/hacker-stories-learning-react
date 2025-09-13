import { StoriesState } from "../types/story";

export const getSumComments = (stories: StoriesState): number => {
  return stories.data.reduce((result, value) => result + value.num_comments, 0);
};
