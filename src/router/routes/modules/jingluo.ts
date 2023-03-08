import { JINGLUO } from '/@/router/constant';
export default {
  path: '/music',
  name: 'music',
  redirect: '/music/index',
  component: JINGLUO,
  meta: {},
  props: false,
  children: [
    {
      path: 'index',
      name: 'index',
      component: () => import('/@/views/jingluo/index/Index.vue'),
      meta: {
        title: '首页',
        // 	// title: t('routes.dashboard.about'),
        // 	icon: 'simple-icons:about-dot-me',
        // 	hideMenu: true,
      },
    },
  ],
};
