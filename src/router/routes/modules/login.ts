import { LOGIN } from '/@/router/constant';
export default {
  path: '/login',
  name: 'login',
  redirect: '/login/qr',
  component: LOGIN,
  meta: {},
  props: false,
  children: [
    {
      path: 'qr',
      name: 'qr',
      component: () => import('/@/views/login/qr/Index.vue'),
      meta: {
        title: '二维码',
        // 	// title: t('routes.dashboard.about'),
        // 	icon: 'simple-icons:about-dot-me',
        // 	hideMenu: true,
      },
    },
  ],
};
