import { LAYOUTS } from '/@/router/constant';
import { RouteRecordRaw } from 'vue-router';
//const modules1 = import.meta.glob('./*.ts'); 注意异步导出
const modules = import.meta.globEager('./modules/*.ts');
const routes: Array<RouteRecordRaw> = [];
for (const path in modules) {
  routes.push((modules[path] as any).default);
}
export default {
  path: '/layouts',
  name: 'layouts',
  redirect: '/layouts/music/index',
  component: LAYOUTS,
  meta: {},
  props: true,
  children: routes,
};
