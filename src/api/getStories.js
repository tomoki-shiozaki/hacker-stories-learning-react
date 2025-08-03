import { initialStories } from "../data/stories";

export const getAsyncStories = () =>
  new Promise((resolve, reject) => setTimeout(reject, 2000));
