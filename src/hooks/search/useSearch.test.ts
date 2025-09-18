import { renderHook, act } from "@testing-library/react";
import { useSearch } from "./useSearch";

let originalLocalStorage: Storage;

beforeEach(() => {
  originalLocalStorage = window.localStorage;

  let store: Record<string, string> = {};
  const localStorageMock = {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
    configurable: true,
    writable: true,
  });
});

afterEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: originalLocalStorage,
    configurable: true,
    writable: true,
  });
});

describe("useSearch", () => {
  it("初期値が正しくセットされる", () => {
    const { result } = renderHook(() => useSearch("searchKey", "initial"));

    expect(result.current.searchTerm).toBe("initial");
    expect(result.current.query).toBe("initial");
  });

  it("入力を更新すると searchTerm が変わる", () => {
    const { result } = renderHook(() => useSearch("searchKey", "initial"));

    act(() => {
      result.current.handleSearchInput({
        target: { value: "newValue" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.searchTerm).toBe("newValue");
    // submit 前は query は変わらない
    expect(result.current.query).toBe("initial");
  });

  it("submit すると query が更新される", () => {
    const { result } = renderHook(() => useSearch("searchKey", "initial"));

    // 入力を変更
    act(() => {
      result.current.handleSearchInput({
        target: { value: "newValue" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    // submit
    act(() => {
      result.current.handleSearchSubmit({
        preventDefault: () => {},
      } as React.FormEvent<HTMLFormElement>);
    });

    expect(result.current.query).toBe("newValue");
  });

  it("localStorage に値が保存される", () => {
    const { result } = renderHook(() => useSearch("searchKey", "initial"));

    act(() => {
      result.current.handleSearchInput({
        target: { value: "storedValue" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(window.localStorage.getItem("searchKey")).toBe(
      JSON.stringify("storedValue")
    );
  });
});
