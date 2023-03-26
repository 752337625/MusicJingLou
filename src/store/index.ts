import type { App } from 'vue';
import { createPinia } from 'pinia';
// import piniaPluginPersistedstate from '/@/store/plugin/keep-state';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
const store = createPinia();
export default function setupStore(app: App<Element>) {
  store.use(piniaPluginPersistedstate);
  app.use(store);
}
export { store };
