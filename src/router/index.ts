import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { getEnvConfig } from '/@/utils/env';
import list from '/@/router/routes/index';
const { VITE_PUBLIC_PATH } = getEnvConfig();
const routes: Array<RouteRecordRaw> = list;
const router = createRouter({
	history: createWebHistory(VITE_PUBLIC_PATH),
	routes,
	strict: true, // 默认为 false，意味着默认情况下，路由 /users 同时匹配 /users 和 /users/。
	scrollBehavior: () => ({ left: 0, top: 0 }),
});
/**
 * @description 全局前置守卫
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
router.beforeEach(() => {
	// console.log(1);
});
/**
 * @description 全局解析守卫
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
router.beforeResolve(() => {
	// console.log(1);
});
/**
 * @description 全局后置钩子:不会改变导航本身,它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用。
 * @param {*} to
 * @param {*} from
 * @param {*} failure
 */
router.afterEach(() => {
	// console.log(1);
});
export default async function setupRouter(app: App) {
	app.use(router);
}
export { router };
