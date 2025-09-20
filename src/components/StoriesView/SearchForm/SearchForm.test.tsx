import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchForm from "./SearchForm";

describe("SearchForm", () => {
  const setup = (props = {}) => {
    const defaultProps = {
      searchTerm: "",
      onSearchInput: vi.fn(),
      onSearchSubmit: vi.fn((e) => e.preventDefault()), // デフォルトでリロード防止
      ...props,
    };
    render(<SearchForm {...defaultProps} />);
    return defaultProps;
  };

  it("ラベルが表示されていること", () => {
    setup();
    expect(screen.getByLabelText(/search:/i)).toBeInTheDocument();
  });

  it("入力値が props の searchTerm に従って表示されること", () => {
    setup({ searchTerm: "React" });
    expect(screen.getByDisplayValue("React")).toBeInTheDocument();
  });

  it("入力時に onSearchInput が呼ばれること", () => {
    const { onSearchInput } = setup();
    const input = screen.getByLabelText(/search:/i);

    fireEvent.change(input, { target: { value: "Redux" } });
    expect(onSearchInput).toHaveBeenCalledTimes(1);
    expect(onSearchInput).toHaveBeenCalledWith(expect.any(Object));
  });

  it("searchTerm が空のとき、Submit ボタンが disabled であること", () => {
    setup({ searchTerm: "" });
    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toBeDisabled();
  });

  it("searchTerm が入力されているとき、Submit ボタンが enabled であること", () => {
    setup({ searchTerm: "React" });
    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toBeEnabled();
  });

  it("フォーム送信時に onSearchSubmit が呼ばれること", () => {
    const { onSearchSubmit } = setup({ searchTerm: "React" });
    // aria-label を使ってフォームを取得
    const form = screen.getByRole("form", { name: "Search Form" });

    fireEvent.submit(form);

    expect(onSearchSubmit).toHaveBeenCalledTimes(1);
    expect(onSearchSubmit).toHaveBeenCalledWith(expect.any(Object));
  });
});
