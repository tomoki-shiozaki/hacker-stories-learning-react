import { getSumComments } from "./utils";
import { StoriesState } from "../types/story";

describe("getSumComments", () => {
  it("stories.data が空なら 0 を返す", () => {
    const stories: StoriesState = {
      data: [],
      isLoading: false,
      isError: false,
    };

    expect(getSumComments(stories)).toBe(0);
  });

  it("複数のストーリーの num_comments を合計できる", () => {
    const stories: StoriesState = {
      data: [
        {
          objectID: "1",
          title: "Story 1",
          url: "url1",
          author: "A",
          num_comments: 2,
          points: 10,
        },
        {
          objectID: "2",
          title: "Story 2",
          url: "url2",
          author: "B",
          num_comments: 5,
          points: 20,
        },
        {
          objectID: "3",
          title: "Story 3",
          url: "url3",
          author: "C",
          num_comments: 3,
          points: 30,
        },
      ],
      isLoading: false,
      isError: false,
    };

    expect(getSumComments(stories)).toBe(10);
  });

  it("num_comments が 0 のストーリーを含んでも正しく合計できる", () => {
    const stories: StoriesState = {
      data: [
        {
          objectID: "1",
          title: "Story 1",
          url: "url1",
          author: "A",
          num_comments: 0,
          points: 10,
        },
        {
          objectID: "2",
          title: "Story 2",
          url: "url2",
          author: "B",
          num_comments: 0,
          points: 20,
        },
      ],
      isLoading: false,
      isError: false,
    };

    expect(getSumComments(stories)).toBe(0);
  });
});
