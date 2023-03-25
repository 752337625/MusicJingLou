import { RouteRecordRaw } from 'vue-router';
//const modules1 = import.meta.glob('./*.ts'); 注意异步导出
const modules = import.meta.globEager('./routers/*.ts');
const routes: Array<RouteRecordRaw> = [];
for (const path in modules) {
  routes.push((modules[path] as any).default);
}
console.log(routes);
export default routes;
