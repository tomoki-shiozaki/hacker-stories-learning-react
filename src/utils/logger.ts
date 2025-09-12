const logWarn = (...args: unknown[]) => {
  if (process.env.NODE_ENV === "development") {
    console.warn(...args);
  }
};

const logInfo = (...args: unknown[]) => {
  if (process.env.NODE_ENV === "development") {
    console.info(...args);
  }
};

const logError = (...args: unknown[]) => {
  if (process.env.NODE_ENV === "development") {
    console.error(...args);
  }
};

export { logWarn, logInfo, logError };
