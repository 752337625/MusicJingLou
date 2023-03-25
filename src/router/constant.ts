/*
 * 考虑到项目中可能有很多的布局
 * 所有简历一个文件夹layout用于创建布局root.vue
 */
export const LAYOUTS = () => import('/@/Index.vue');
export const JINGLUO = () => import('/@/jingluo/Index.vue');
export const TYAY = () => import('/@/tray/Index.vue');
export const LOGIN = () => import('/@/login/Index.vue');
export const DESKTOP = () => import('/@/desktop/Index.vue');
