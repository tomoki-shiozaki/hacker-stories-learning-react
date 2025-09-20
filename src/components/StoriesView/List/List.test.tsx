import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import List from "./List";
import { Story } from "../../../types/story";

describe("List", () => {
  const sampleList: Story[] = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: "1",
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov",
      num_comments: 2,
      points: 5,
      objectID: "2",
    },
  ];

  const setup = (list = sampleList) => {
    const onRemoveItem = vi.fn();
    render(<List list={list} onRemoveItem={onRemoveItem} />);
    return { onRemoveItem };
  };

  it("リストのアイテムが表示されること", () => {
    setup();

    // React のタイトルがリンクとして表示されているか
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Redux")).toBeInTheDocument();

    // 著者が表示される
    expect(screen.getByText("Jordan Walke")).toBeInTheDocument();
    expect(screen.getByText("Dan Abramov")).toBeInTheDocument();

    // コメント数とポイントが表示される
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("リンクが正しくレンダリングされていること", () => {
    setup();

    const reactLink = screen.getByRole("link", { name: "React" });
    expect(reactLink).toHaveAttribute("href", "https://reactjs.org/");

    const reduxLink = screen.getByRole("link", { name: "Redux" });
    expect(reduxLink).toHaveAttribute("href", "https://redux.js.org/");
  });

  it("Dismiss ボタンをクリックすると onRemoveItem が呼ばれること", () => {
    const { onRemoveItem } = setup();

    const dismissButtons = screen.getAllByRole("button", { name: /dismiss/i });
    fireEvent.click(dismissButtons[0]);

    expect(onRemoveItem).toHaveBeenCalledTimes(1);
    expect(onRemoveItem).toHaveBeenCalledWith(sampleList[0]);
  });
});
