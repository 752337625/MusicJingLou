import { DESKTOP } from '/@/router/constant';
export default {
  path: 'desktop',
  name: 'desktop',
  component: DESKTOP,
  meta: {},
  props: false,
  children: [
    {
      path: 'transverse',
      name: 'transverse',
      component: () => import('/@/views/desktop/transverse/Index.vue'),
      meta: {
        title: '横向歌词',
        // 	// title: t('routes.dashboard.about'),
        // 	icon: 'simple-icons:about-dot-me',
        // 	hideMenu: true,
      },
    },
  ],
};
