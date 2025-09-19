import "./logger";

describe("logger utils", () => {
  const originalEnv = process.env;
  let warnSpy: jest.SpyInstance;
  let infoSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv }; // 環境変数をリセット

    warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    infoSpy = jest.spyOn(console, "info").mockImplementation(() => {});
    errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    process.env = originalEnv; // 後始末
  });

  it("development 環境では logWarn が console.warn を呼ぶ", async () => {
    process.env = { ...process.env, NODE_ENV: "development" };
    jest.resetModules();
    const { logWarn } = await import("./logger");

    logWarn("test warning");
    expect(warnSpy).toHaveBeenCalledWith("test warning");
  });

  it("production 環境では logWarn は呼ばれない", async () => {
    process.env = { ...process.env, NODE_ENV: "production" };
    jest.resetModules();
    const { logWarn } = await import("./logger");

    logWarn("test warning");
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it("development 環境では logInfo が console.info を呼ぶ", async () => {
    process.env = { ...process.env, NODE_ENV: "development" };
    jest.resetModules();
    const { logInfo } = await import("./logger");

    logInfo("test info");
    expect(infoSpy).toHaveBeenCalledWith("test info");
  });

  it("development 環境では logError が console.error を呼ぶ", async () => {
    process.env = { ...process.env, NODE_ENV: "development" };
    jest.resetModules();
    const { logError } = await import("./logger");

    logError("test error");
    expect(errorSpy).toHaveBeenCalledWith("test error");
  });

  it("development 環境では console.error を呼ぶ", async () => {
    process.env = { ...process.env, NODE_ENV: "development" };
    jest.resetModules(); // モジュールキャッシュをクリア
    const { logError } = await import("./logger"); // 環境変数を反映して再インポート

    logError("test error");

    expect(errorSpy).toHaveBeenCalledWith("test error");
  });

  it("production 環境では console.error を呼ばない", async () => {
    process.env = { ...process.env, NODE_ENV: "production" };
    jest.resetModules();
    const { logError } = await import("./logger");

    logError("test error");

    expect(errorSpy).not.toHaveBeenCalled();
  });
});
