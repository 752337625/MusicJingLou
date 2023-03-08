import { createStorage as create, CreateStorageParams } from './storageCache';
import { getEnvConfig, getEnv, isDevMode } from '/@/utils/env';
export type Options = Partial<CreateStorageParams>;
const createOptions = (storage: Storage, options: Options = {}): Options => {
  const { VITE_DEFAULT_CACHE_KEY } = getEnvConfig();
  return {
    // No encryption in debug mode
    hasEncrypt: !isDevMode(),
    storage,
    prefixKey: `${VITE_DEFAULT_CACHE_KEY}_${getEnv()}_`.toUpperCase(),
    ...options,
  };
};
export const WebStorage = create(createOptions(sessionStorage));
export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => {
  return create(createOptions(storage, options));
};
export const createSessionStorage = (options: Options = {}) => {
  const { VITE_DEFAULT_CACHE_TIME } = getEnvConfig();
  return createStorage(sessionStorage, { ...options, timeout: VITE_DEFAULT_CACHE_TIME });
};
export const createLocalStorage = (options: Options = {}) => {
  const { VITE_DEFAULT_CACHE_TIME } = getEnvConfig();
  return createStorage(localStorage, { ...options, timeout: VITE_DEFAULT_CACHE_TIME });
};
export default WebStorage;
