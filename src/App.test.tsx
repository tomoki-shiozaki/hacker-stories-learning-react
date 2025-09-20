import { render, screen, fireEvent } from "@testing-library/react";
import { type MockedFunction } from "vitest";
import App from "./App";

import { useSearch } from "./hooks/search/useSearch";
import { useStories } from "./hooks/story/useStories";

vi.mock("./hooks/search/useSearch");
vi.mock("./hooks/story/useStories");

describe("App integration", () => {
  const mockUseSearch = useSearch as MockedFunction<typeof useSearch>;
  const mockUseStories = useStories as MockedFunction<typeof useStories>;

  beforeEach(() => {
    mockUseSearch.mockReturnValue({
      searchTerm: "React",
      query: "React",
      handleSearchInput: vi.fn(),
      handleSearchSubmit: vi.fn(),
    });

    mockUseStories.mockReturnValue({
      stories: {
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
      },
      handleRemoveStory: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("useStories から取得したストーリーが表示されること", () => {
    render(<App />);

    expect(screen.getByRole("link", { name: "React" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Redux" })).toBeInTheDocument();
  });

  test("検索入力が変更されたときに handleSearchInput が呼び出されること", () => {
    const mockHandleSearchInput = vi.fn();
    mockUseSearch.mockReturnValue({
      searchTerm: "",
      query: "",
      handleSearchInput: mockHandleSearchInput,
      handleSearchSubmit: vi.fn(),
    });

    render(<App />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Next.js" } });

    expect(mockHandleSearchInput).toHaveBeenCalled();
  });

  test("検索フォーム送信時に handleSearchSubmit が呼び出されること", () => {
    const mockHandleSearchSubmit = vi.fn((e) => e.preventDefault());
    mockUseSearch.mockReturnValue({
      searchTerm: "React",
      query: "React",
      handleSearchInput: vi.fn(),
      handleSearchSubmit: mockHandleSearchSubmit,
    });

    render(<App />);

    const input = screen.getByRole("textbox");
    fireEvent.submit(input);

    expect(mockHandleSearchSubmit).toHaveBeenCalled();
  });
});
