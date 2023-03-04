import { JINGLUO } from '/@/router/constant';
export default {
	path: '/find',
	name: 'find',
	redirect: '/find/personal',
	component: JINGLUO,
	meta: {},
	props: false,
	children: [
		{
			path: 'personal',
			name: 'personal',
			component: () => import('/@/views/jingluo/find/Personal.vue'),
			meta: {
				title: '个性推荐',
				// 	// title: t('routes.dashboard.about'),
				// 	icon: 'simple-icons:about-dot-me',
				// 	hideMenu: true,
			},
		},
		{
			path: 'exclusive',
			name: 'exclusive',
			component: () => import('/@/views/jingluo/find/Exclusive.vue'),
			meta: {
				title: '专属订制',
				// 	// title: t('routes.dashboard.about'),
				// 	icon: 'simple-icons:about-dot-me',
				// 	hideMenu: true,
			},
		},
		{
			path: 'sheet',
			name: 'sheet',
			component: () => import('/@/views/jingluo/find/Sheet.vue'),
			meta: {
				title: '歌单',
				// 	// title: t('routes.dashboard.about'),
				// 	icon: 'simple-icons:about-dot-me',
				// 	hideMenu: true,
			},
		},
		{
			path: 'singer',
			name: 'singer',
			component: () => import('/@/views/jingluo/find/Singer.vue'),
			meta: {
				title: '歌手',
				// 	// title: t('routes.dashboard.about'),
				// 	icon: 'simple-icons:about-dot-me',
				// 	hideMenu: true,
			},
		},
		{
			path: 'ranking',
			name: 'ranking',
			component: () => import('/@/views/jingluo/find/Ranking.vue'),
			meta: {
				title: '歌单排行',
				// 	// title: t('routes.dashboard.about'),
				// 	icon: 'simple-icons:about-dot-me',
				// 	hideMenu: true,
			},
		},
		{
			path: 'music',
			name: 'music',
			component: () => import('/@/views/jingluo/find/Music.vue'),
			meta: {
				title: '最新音乐',
				// 	// title: t('routes.dashboard.about'),
				// 	icon: 'simple-icons:about-dot-me',
				// 	hideMenu: true,
			},
		},
	],
};
