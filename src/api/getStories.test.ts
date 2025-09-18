import { getAsyncStories } from "./getStories";
import { Story } from "../types/story";

describe("getAsyncStories", () => {
  const mockStory: Story = {
    objectID: "1",
    title: "React",
    url: "https://reactjs.org",
    author: "Dan",
    num_comments: 3,
    points: 5,
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("成功時にストーリー配列を返す", async () => {
    const mockResponse = {
      hits: [mockStory],
    };

    // fetch をモック
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const result = await getAsyncStories("react");

    expect(global.fetch).toHaveBeenCalledWith(
      "https://hn.algolia.com/api/v1/search?query=react"
    );
    expect(result).toEqual([mockStory]);
  });

  it("失敗時にエラーを投げる", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    } as Response);

    await expect(getAsyncStories("react")).rejects.toThrow("Fetch failed");
  });
});
