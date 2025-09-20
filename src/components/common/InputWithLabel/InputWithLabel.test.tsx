import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import InputWithLabel from "./InputWithLabel";

describe("InputWithLabel", () => {
  const setup = (props = {}) => {
    const defaultProps = {
      id: "search",
      value: "",
      onInputChange: vi.fn(),
      children: "Search:",
      ...props,
    };
    render(<InputWithLabel {...defaultProps} />);
    return defaultProps;
  };

  it("ラベルが正しく表示されること", () => {
    setup();
    expect(screen.getByLabelText(/search:/i)).toBeInTheDocument();
  });

  it("入力値が props の value に従って表示されること", () => {
    setup({ value: "React" });
    expect(screen.getByDisplayValue("React")).toBeInTheDocument();
  });

  it("入力時に onInputChange が呼び出されること", () => {
    const { onInputChange } = setup();
    const input = screen.getByLabelText(/search:/i);

    fireEvent.change(input, { target: { value: "Redux" } });
    expect(onInputChange).toHaveBeenCalledTimes(1);
    expect(onInputChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it("isFocused が true の場合に入力欄がフォーカスされること", () => {
    setup({ isFocused: true });
    const input = screen.getByLabelText(/search:/i);
    expect(input).toHaveFocus();
  });

  it("デフォルトで type='text' が設定されていること", () => {
    setup();
    const input = screen.getByLabelText(/search:/i);
    expect(input).toHaveAttribute("type", "text");
  });

  it("props で渡された type が入力欄に反映されること", () => {
    setup({ type: "password" });
    const input = screen.getByLabelText(/search:/i);
    expect(input).toHaveAttribute("type", "password");
  });
});
