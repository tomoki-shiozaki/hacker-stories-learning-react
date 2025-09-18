import { renderHook, act } from "@testing-library/react";
import { useStories } from "./useStories";
import { initialStoriesState } from "../../reducers/storiesReducer";
import { Story } from "../../types/story";
import { useFetchStories } from "./useFetchStories";

// useFetchStories をモック化（空実装にする）
jest.mock("./useFetchStories", () => ({
  __esModule: true,
  useFetchStories: jest.fn(),
}));

describe("useStories", () => {
  beforeEach(() => {
    (useFetchStories as jest.Mock).mockClear();
  });

  it("初期状態が正しい", () => {
    const { result } = renderHook(() => useStories("react"));

    expect(result.current.stories).toEqual(initialStoriesState);
  });

  it("useFetchStories が呼ばれる", () => {
    renderHook(() => useStories("react"));

    expect(useFetchStories).toHaveBeenCalledTimes(1);
    expect(useFetchStories).toHaveBeenCalledWith(
      "react",
      expect.any(Function) // dispatchStories
    );
  });

  it("handleRemoveStory がストーリーを削除する", () => {
    const initialStory: Story = {
      objectID: "1",
      title: "React",
      url: "https://reactjs.org",
      author: "Dan",
      num_comments: 3,
      points: 5,
    };

    const { result } = renderHook(() => useStories("react"));

    // 初期データを注入（テスト用に stories を上書き）
    act(() => {
      (result.current as any).stories = {
        ...initialStoriesState,
        data: [initialStory],
      };
    });

    // ストーリーを削除
    act(() => {
      result.current.handleRemoveStory(initialStory);
    });

    expect(result.current.stories.data).toEqual([]);
  });
});
