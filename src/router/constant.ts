/*
 * 考虑到项目中可能有很多的布局
 * 所有简历一个文件夹layout用于创建布局root.vue
 */
export const JINGLUO = () => import('/@/layouts/jingluo/Index.vue');
export const TYAY = () => import('/@/layouts/tray/Index.vue');
export const LOGIN = () => import('/@/layouts/login/Index.vue');
export const DESKTOP = () => import('/@/layouts/desktop/Index.vue');
export const SUSPENSION = () => import('/@/layouts/suspension/Index.vue');
export const LOADING = () => import('/@/layouts/loading/Index.vue');
