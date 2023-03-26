import 'pinia';
declare module '*.json' {
  const value: any;
  export default value;
}
declare module 'vue' {
  interface ComponentCustomProperties {
    $utils: any;
  }
}
interface PersistedStateOptions {
  /**
   * Storage key to use.
   * @default $store.id
   */
  key?: string;
  /**
   * Where to store persisted state.
   * @default localStorage
   */
  storage?: StorageLike;
  /**
   * Dot-notation paths to partially save state. Saves everything if undefined.
   * @default undefined
   */
  paths?: Array<string>;
  /**
   * Customer serializer to serialize/deserialize state.
   */
  serializer?: Serializer;
  /**
   * Hook called before state is hydrated from storage.
   * @default null
   */
  beforeRestore?: (context: PiniaPluginContext) => void;
  /**
   * Hook called after state is hydrated from storage.
   * @default undefined
   */
  afterRestore?: (context: PiniaPluginContext) => void;
  /**
   * Logs errors in console when enabled.
   * @default false
   */
  debug?: boolean;
}
declare module 'pinia' {
  interface DefineStoreOptionsBase<_S extends StateTree, _Store> {
    persist?: boolean | PersistedStateOptions | PersistedStateOptions[];
  }
  interface PiniaCustomProperties {
    $hydrate: (opts?: { runHooks?: boolean }) => void;
    $persist: () => void;
  }
}
export {};
