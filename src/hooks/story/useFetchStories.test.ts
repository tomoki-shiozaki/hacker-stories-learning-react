import { renderHook, waitFor } from "@testing-library/react";
import { useFetchStories } from "./useFetchStories";
import { getAsyncStories } from "../../api/getStories";
import { Story } from "../../types/story";
import { vi } from "vitest";

// getAsyncStories をモック化
vi.mock("../../api/getStories", () => ({
  getAsyncStories: vi.fn(),
}));

describe("useFetchStories", () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("成功時に STORIES_FETCH_INIT と STORIES_FETCH_SUCCESS が dispatch される", async () => {
    const mockStories: Story[] = [
      {
        objectID: "1",
        title: "React",
        url: "https://reactjs.org",
        author: "Dan",
        num_comments: 3,
        points: 5,
      },
    ];
    (getAsyncStories as vi.Mock).mockResolvedValue(mockStories);

    renderHook(() => useFetchStories("react", mockDispatch));

    // 非同期処理が終わるまで待つ
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });

    expect(mockDispatch).toHaveBeenNthCalledWith(1, {
      type: "STORIES_FETCH_INIT",
    });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, {
      type: "STORIES_FETCH_SUCCESS",
      payload: mockStories,
    });
  });

  it("失敗時に STORIES_FETCH_INIT と STORIES_FETCH_FAILURE が dispatch される", async () => {
    (getAsyncStories as vi.Mock).mockRejectedValue(new Error("Network error"));

    renderHook(() => useFetchStories("react", mockDispatch));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });

    expect(mockDispatch).toHaveBeenNthCalledWith(1, {
      type: "STORIES_FETCH_INIT",
    });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, {
      type: "STORIES_FETCH_FAILURE",
    });
  });
});
