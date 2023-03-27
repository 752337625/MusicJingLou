import type { PiniaPlugin, PiniaPluginContext, StateTree } from 'pinia';
import { normalizeOptions } from '../utils/normalize';
import { type PersistedStateFactoryOptions, PersistedStateOptions } from '../types';
import { createSessionStorage, createLocalStorage } from '/@/utils/cache';
const ls = createLocalStorage();
const ss = createSessionStorage();

function syncState(state: StateTree, { storage = 'localStorage', paths, key = '' }: PersistedStateOptions) {
  const s = storage === 'localStorage' ? ls : ss;
  const data = s.get(key);
  // const toStore = Array.isArray(paths) ? pick(state, paths) : state;
  if (Array.isArray(paths)) {
    paths.forEach(i => {
      state[i] = data[i];
    });
  } else {
    state.$patch(data);
  }
}
export function createSyncState(factoryOptions: PersistedStateFactoryOptions = {}): PiniaPlugin {
  return (context: PiniaPluginContext) => {
    const {
      options: { sync = false },
      store,
    } = context;
    if (!sync) return;
    let syncs = Array.isArray(sync)
      ? sync.map(p => normalizeOptions(p, factoryOptions))
      : [normalizeOptions(sync, factoryOptions)];
    syncs = syncs.map(({ storage = 'localStorage', key = store.$id, paths }) => ({
      storage,
      key: factoryOptions.key || key,
      paths,
    }));
    syncs.forEach(item => {
      window.addEventListener('storage', () => {
        syncState(store, item);
      });
    });
  };
}
