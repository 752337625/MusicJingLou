import type { App } from 'vue';
import { Version } from './Version';

export function registerGlobComp(app: App) {
  app.use(Version);
}
