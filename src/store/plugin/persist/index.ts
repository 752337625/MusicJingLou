import { createSessionStorage, createLocalStorage } from '/@/utils/cache';
import { type PersistedStateFactoryOptions } from './types';
import type { PiniaPlugin, PiniaPluginContext, StateTree } from 'pinia';
import { normalizeOptions } from './normalize';
import { pick } from './pick';
const ls = createLocalStorage();
const ss = createSessionStorage();
interface Persistence {
  storage?: 'localStorage' | 'sessionStorage';
  paths?: string[] | null;
  key?: string;
}
function persistState(state: StateTree, { storage = 'localStorage', paths, key }: Persistence) {
  const toStore = Array.isArray(paths) ? pick(state, paths) : state;
  storage === 'localStorage' ? ls!.set(key!, toStore) : ss!.set(key!, toStore);
}
export function createPersistedState(factoryOptions: PersistedStateFactoryOptions = {}): PiniaPlugin {
  return (context: PiniaPluginContext) => {
    const { auto = false } = factoryOptions;
    const {
      options: { persist = auto },
      store,
    } = context;
    if (!persist) return;
    const persistences = Array.isArray(persist)
      ? persist.map(p => normalizeOptions(p, factoryOptions))
      : [normalizeOptions(persist, factoryOptions)];
    persistences.map(({ storage = 'localStorage', key = store.$id }) => ({
      storage,
      key: (factoryOptions.key ?? (k => k))(key),
    }));
    persistences.forEach(item => {
      store.$subscribe((_mutation, state: StateTree) => persistState(state, item), {
        detached: true,
      });
    });
  };
}
