import type { App } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from '/@/store/plugin/persist';
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
const store = createPinia();
export default function setupStore(app: App<Element>) {
  store.use(createPersistedState());
  app.use(store);
}
export { store };
