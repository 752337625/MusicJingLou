export function getEnvConfig() {
  const ENV = import.meta.env as unknown as ViteEnv;
  const {
    VITE_BASE_URL,
    VITE_DEFAULT_THEME_KEY,
    VITE_DEFAULT_LYRICS_KEY,
    VITE_PUBLIC_PATH,
    VITE_DEFAULT_CACHE_KEY,
    VITE_DEFAULT_CACHE_TIME,
    VITE_GLOB_API_URL,
    VITE_DEFAULT_LOCALE_KEY,
    VITE_DEFAULT_PLAYLIST_KEY,
    VITE_DEFAULT_PLAYINDEX_KEY,
    VITE_ROUTER_History,
    VITE_DEFAULT_VERSION_UPDATE_KEY,
  } = ENV;
  return {
    VITE_ROUTER_History,
    VITE_BASE_URL,
    VITE_DEFAULT_LYRICS_KEY,
    VITE_DEFAULT_PLAYLIST_KEY,
    VITE_DEFAULT_PLAYINDEX_KEY,
    VITE_DEFAULT_THEME_KEY,
    VITE_DEFAULT_LOCALE_KEY,
    VITE_PUBLIC_PATH,
    VITE_DEFAULT_CACHE_KEY,
    VITE_DEFAULT_CACHE_TIME,
    VITE_GLOB_API_URL,
    VITE_DEFAULT_VERSION_UPDATE_KEY,
  };
}

/**
 * @description: Development mode
 */
export const devMode = 'development';

/**
 * @description: Production mode
 */
export const prodMode = 'production';

/**
 * 设计到npm\pnpm 启动指令：cross-env NODE_ENV=production、cross-env REPORT=true等
 */
export function isReportMode(): boolean {
  return process.env.REPORT === 'true';
}

/**
 * @description: {string} 应用运行的模式。
 * @returns:
 * @example:
 */
export function getEnv(): string {
  return import.meta.env.MODE;
}

/**
 * @description: {boolean} 应用是否运行在开发环境 (永远与 import.meta.env.PROD相反)。
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV;
}

/**
 * @description: {boolean} 应用是否运行在生产环境。
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD;
}

/**
 * @description: {string} 部署应用时的基本 URL。他由base 配置项决定。
 * @returns:
 * @example:
 */
export function getBaseUrl(): string {
  return import.meta.env.BASE_URL;
}
