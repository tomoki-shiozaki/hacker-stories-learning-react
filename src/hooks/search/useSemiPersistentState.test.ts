import { renderHook, act } from "@testing-library/react";
import useSemiPersistentState from "./useSemiPersistentState";

const localStorageProto = Object.getPrototypeOf(window.localStorage);

beforeEach(() => {
  let store: Record<string, string> = {};

  jest
    .spyOn(localStorageProto, "getItem")
    .mockImplementation((...args: any[]) => {
      const key = args[0] as string;
      return store[key] || null;
    });

  jest
    .spyOn(localStorageProto, "setItem")
    .mockImplementation((...args: any[]) => {
      const key = args[0] as string;
      const value = args[1] as string;
      store[key] = value;
    });

  jest
    .spyOn(localStorageProto, "removeItem")
    .mockImplementation((...args: any[]) => {
      const key = args[0] as string;
      delete store[key];
    });

  jest.spyOn(localStorageProto, "clear").mockImplementation(() => {
    store = {};
  });
});

afterEach(() => {
  jest.restoreAllMocks();
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
