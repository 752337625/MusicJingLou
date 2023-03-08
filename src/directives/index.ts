import type { App } from 'vue';

import { setupPermissionDirective } from './permission'; //权限组件
import { setupDropDirective } from './electronDrop'; //配合桌面端实现得拖拽

export function setupGlobDirectives(app: App) {
  setupPermissionDirective(app);
  setupDropDirective(app);
}

export default setupGlobDirectives;
