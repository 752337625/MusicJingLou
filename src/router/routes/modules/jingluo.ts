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
    {
      path: 'artist',
      name: 'artist',
      component: () => import('/@/views/jingluo/artist/Index.vue'),
      meta: {
        title: '艺术家',
        // 	// title: t('routes.dashboard.about'),
        // 	icon: 'simple-icons:about-dot-me',
        // 	hideMenu: true,
      },
    },
    {
      path: 'mvlist',
      name: 'mvlist',
      component: () => import('/@/views/jingluo/mv/Index.vue'),
      meta: {
        title: 'Mvlist',
        // 	// title: t('routes.dashboard.about'),
        // 	icon: 'simple-icons:about-dot-me',
        // 	hideMenu: true,
      },
    },
    {
      path: 'mv',
      name: 'mv',
      component: () => import('/@/views/jingluo/mvPlay/Index.vue'),
      meta: {
        title: 'MV',
        // 	// title: t('routes.dashboard.about'),
        // 	icon: 'simple-icons:about-dot-me',
        // 	hideMenu: true,
      },
    },
    {
      path: 'playlist',
      name: 'playlist',
      component: () => import('/@/views/jingluo/playlist/Index.vue'),
      meta: {
        title: '歌单',
        // 	// title: t('routes.dashboard.about'),
        // 	icon: 'simple-icons:about-dot-me',
        // 	hideMenu: true,
      },
    },
    {
      path: 'rank',
      name: 'rank',
      component: () => import('/@/views/jingluo/rank/Index.vue'),
      meta: {
        title: '排行榜',
        // 	// title: t('routes.dashboard.about'),
        // 	icon: 'simple-icons:about-dot-me',
        // 	hideMenu: true,
      },
    },
    {
      path: 'song',
      name: 'song',
      component: () => import('/@/views/jingluo/song/Index.vue'),
      meta: {
        title: '音乐',
        // 	// title: t('routes.dashboard.about'),
        // 	icon: 'simple-icons:about-dot-me',
        // 	hideMenu: true,
      },
    },
    {
      path: 'singer',
      name: 'singer',
      component: () => import('/@/views/jingluo/singer/Index.vue'),
      meta: {
        title: '歌手',
        // 	// title: t('routes.dashboard.about'),
        // 	icon: 'simple-icons:about-dot-me',
        // 	hideMenu: true,
      },
    },
  ],
};
