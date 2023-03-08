import type { App } from 'vue';
import util from '/@/utils/util';
export function setupGlobProperties(app: App) {
  app.config.globalProperties['$utils'] = util;
}

export default setupGlobProperties;
