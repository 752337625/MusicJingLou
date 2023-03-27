type Prettify<T> = {
  [K in keyof T]: T[K];
};
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
   * @default "localStorage"
   */
  storage?: 'localStorage' | 'sessionStorage';
}

export type PersistedStateFactoryOptions = Prettify<
  Pick<PersistedStateOptions, 'storage'> & {
    /**
     * 自定义
     * @default storeKey => storeKey
     */
    key?: (storeKey: string) => string;

    /**
     * @default false
     */
    auto?: boolean;
  }
>;
