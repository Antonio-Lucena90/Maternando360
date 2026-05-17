const isDev = process.env.NODE_ENV !== 'production';

const timestamp = () => new Date().toISOString();

const logger = {
  info: (msg, ...args) => {
    if (isDev) console.log(`[INFO]  ${timestamp()} — ${msg}`, ...args);
  },
  warn: (msg, ...args) => {
    console.warn(`[WARN]  ${timestamp()} — ${msg}`, ...args);
  },
  error: (msg, ...args) => {
    console.error(`[ERROR] ${timestamp()} — ${msg}`, ...args);
  }
};

export default logger;
