import type { App } from 'vue';

import { setupPermissionDirective } from './permission'; //权限组件

export function setupGlobDirectives(app: App) {
	setupPermissionDirective(app);
}

export default setupGlobDirectives;
