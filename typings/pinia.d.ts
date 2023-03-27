export interface PersistedStateOptions {
  /**
   * @default $store.id
   */
  key?: string;
  /**
   * @default undefined
   */
  paths?: Array<string>;
  /**
   * @default localStorage
   */
  storage?: 'localStorage' | 'sessionStorage';
}

declare module 'pinia' {
  export interface DefineStoreOptionsBase {
    persist?: boolean | PersistedStateOptions | PersistedStateOptions[];
    sync?: boolean | PersistedStateOptions | PersistedStateOptions[];
  }
}
