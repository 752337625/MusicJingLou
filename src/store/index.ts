import type { App } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from '/@/store/plugin/persist';
import { createSyncState } from '/@/store/plugin/sync';

// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
const store = createPinia();
export default function setupStore(app: App<Element>) {
  store.use(createPersistedState());
  store.use(createSyncState());
  app.use(store);
}
export { store };
