import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App integration with MSW", () => {
  test("初期表示で React ストーリーが表示される", async () => {
    render(<App />);

    // API モックの結果が描画されるのを待つ
    expect(await screen.findByText("React Story")).toBeInTheDocument();
    expect(screen.getByText("Redux Story")).toBeInTheDocument();
  });

  test("検索を変更すると新しい結果が表示される", async () => {
    render(<App />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Next.js" } });

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    // Generic Story が出てくる（handlers.ts の条件分岐）
    expect(await screen.findByText("Generic Story")).toBeInTheDocument();
  });
});
