import { createSessionStorage, createLocalStorage } from '/@/utils/cache';
import { type PersistedStateFactoryOptions, PersistedStateOptions } from '../types';
import type { PiniaPlugin, PiniaPluginContext, StateTree } from 'pinia';
import { normalizeOptions } from '../utils/normalize';
import { pick } from '../utils/pick';
const ls = createLocalStorage();
const ss = createSessionStorage();

function persistState(state: StateTree, { storage = 'localStorage', paths, key }: PersistedStateOptions) {
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
    let persistences = Array.isArray(persist)
      ? persist.map(p => normalizeOptions(p, factoryOptions))
      : [normalizeOptions(persist, factoryOptions)];
    //@ts-ignore
    persistences = persistences.map(({ storage = 'localStorage', key = store.$id, paths }) => ({
      storage,
      key: factoryOptions.key || key,
      paths,
    }));
    persistences.forEach(item => {
      store.$subscribe((_mutation, state: StateTree) => persistState(state, item), {
        detached: true,
      });
    });
  };
}
