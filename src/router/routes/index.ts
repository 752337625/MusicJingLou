import { RouteRecordRaw } from 'vue-router';
//const modules1 = import.meta.glob('./*.ts'); 注意异步导出
const modules = import.meta.globEager('./modules/*.ts');
const routes: Array<RouteRecordRaw> = [];
for (const path in modules) {
	console.log(modules[path]);
	routes.push((modules[path] as any).default);
}
export default routes;
