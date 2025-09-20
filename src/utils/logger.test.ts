import "./logger";
import { vi } from "vitest";

describe("logger utils", () => {
  const originalEnv = process.env;
  let warnSpy: vi.SpyInstance;
  let infoSpy: vi.SpyInstance;
  let errorSpy: vi.SpyInstance;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv }; // 環境変数をリセット

    warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    process.env = originalEnv; // 後始末
  });

  it("development 環境では logWarn が console.warn を呼ぶ", async () => {
    process.env = { ...process.env, NODE_ENV: "development" };
    vi.resetModules();
    const { logWarn } = await import("./logger");

    logWarn("test warning");
    expect(warnSpy).toHaveBeenCalledWith("test warning");
  });

  it("production 環境では logWarn は呼ばれない", async () => {
    process.env = { ...process.env, NODE_ENV: "production" };
    vi.resetModules();
    const { logWarn } = await import("./logger");

    logWarn("test warning");
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it("development 環境では logInfo が console.info を呼ぶ", async () => {
    process.env = { ...process.env, NODE_ENV: "development" };
    vi.resetModules();
    const { logInfo } = await import("./logger");

    logInfo("test info");
    expect(infoSpy).toHaveBeenCalledWith("test info");
  });

  it("development 環境では logError が console.error を呼ぶ", async () => {
    process.env = { ...process.env, NODE_ENV: "development" };
    vi.resetModules();
    const { logError } = await import("./logger");

    logError("test error");
    expect(errorSpy).toHaveBeenCalledWith("test error");
  });

  it("development 環境では console.error を呼ぶ", async () => {
    process.env = { ...process.env, NODE_ENV: "development" };
    vi.resetModules(); // モジュールキャッシュをクリア
    const { logError } = await import("./logger"); // 環境変数を反映して再インポート

    logError("test error");

    expect(errorSpy).toHaveBeenCalledWith("test error");
  });

  it("production 環境では console.error を呼ばない", async () => {
    process.env = { ...process.env, NODE_ENV: "production" };
    vi.resetModules();
    const { logError } = await import("./logger");

    logError("test error");

    expect(errorSpy).not.toHaveBeenCalled();
  });
});
