import { renderHook, act } from "@testing-library/react";
import useSemiPersistentState from "./useSemiPersistentState";

const localStorageProto = Object.getPrototypeOf(window.localStorage);

beforeEach(() => {
  let store: Record<string, string> = {};

  vi.spyOn(localStorageProto, "getItem").mockImplementation(
    (key: unknown): string | null => {
      return store[key as string] || null;
    }
  );

  vi.spyOn(localStorageProto, "setItem").mockImplementation(
    (key: unknown, value: unknown): void => {
      store[key as string] = value as string;
    }
  );

  vi.spyOn(localStorageProto, "removeItem").mockImplementation(
    (key: unknown): void => {
      delete store[key as string];
    }
  );

  vi.spyOn(localStorageProto, "clear").mockImplementation((): void => {
    store = {};
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useSemiPersistentState", () => {
  it("初期値を返す（localStorage に値がない場合）", () => {
    const { result } = renderHook(() =>
      useSemiPersistentState("testKey", "default")
    );
    expect(result.current[0]).toBe("default");
  });

  it("localStorage に保存された値を使う", () => {
    window.localStorage.setItem("testKey", JSON.stringify("storedValue"));
    const { result } = renderHook(() =>
      useSemiPersistentState("testKey", "default")
    );
    expect(result.current[0]).toBe("storedValue");
  });

  it("値を更新すると localStorage に保存される", () => {
    const { result } = renderHook(() =>
      useSemiPersistentState("testKey", "default")
    );

    act(() => {
      result.current[1]("newValue");
    });

    expect(window.localStorage.getItem("testKey")).toBe(
      JSON.stringify("newValue")
    );
    expect(result.current[0]).toBe("newValue");
  });

  it("localStorage に壊れた JSON がある場合、初期値を返す", () => {
    window.localStorage.setItem("testKey", "invalid-json");

    const { result } = renderHook(() =>
      useSemiPersistentState("testKey", "default")
    );

    expect(result.current[0]).toBe("default");
  });
});
