import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { StoriesView } from "./StoriesView";
import { StoriesState } from "../../types/story";

describe("StoriesView", () => {
  const sampleStories: StoriesState = {
    data: [
      {
        objectID: "1",
        title: "React",
        url: "https://reactjs.org",
        author: "Jordan",
        num_comments: 3,
        points: 5,
      },
      {
        objectID: "2",
        title: "Redux",
        url: "https://redux.js.org",
        author: "Dan",
        num_comments: 2,
        points: 4,
      },
    ],
    isLoading: false,
    isError: false,
  };

  const setup = (
    stories: StoriesState = sampleStories,
    searchTerm = "React"
  ) => {
    const onSearchInput = vi.fn();
    const onSearchSubmit = vi.fn();
    const onRemoveItem = vi.fn();

    render(
      <StoriesView
        searchTerm={searchTerm}
        onSearchInput={onSearchInput}
        onSearchSubmit={onSearchSubmit}
        stories={stories}
        onRemoveItem={onRemoveItem}
      />
    );

    return { onSearchInput, onSearchSubmit, onRemoveItem };
  };

  it("検索語が表示されること", () => {
    setup(sampleStories, "React");
    expect(screen.getByText(/Searching for/i)).toHaveTextContent(
      "Searching for React."
    );
  });

  it("コメント数の合計が表示されること", () => {
    setup();
    expect(screen.getByText(/My Hacker Stories with/i)).toHaveTextContent(
      "My Hacker Stories with 5 comments."
    );
  });

  it("ロード中は Loading... が表示されること", () => {
    setup({ ...sampleStories, isLoading: true });
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("エラー時はエラーメッセージが表示されること", () => {
    setup({ ...sampleStories, isError: true });
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it("List コンポーネントが stories.data に従って描画されること", () => {
    setup();
    expect(screen.getByRole("link", { name: "React" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Redux" })).toBeInTheDocument();
  });
});
