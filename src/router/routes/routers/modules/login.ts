import { LOGIN } from '/@/router/constant';
export default {
  path: 'login',
  name: 'login',
  redirect: '/layouts/login/qr',
  component: LOGIN,
  meta: {},
  props: false,
  children: [
    {
      path: '/',
      redirect: 'login/qr',
    },
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
    {
      path: 'phone',
      name: 'phone',
      component: () => import('/@/views/login/phone/Index.vue'),
      meta: {
        title: '手机登录',
        // 	// title: t('routes.dashboard.about'),
        // 	icon: 'simple-icons:about-dot-me',
        // 	hideMenu: true,
      },
    },
  ],
};
