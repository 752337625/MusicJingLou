// //所有找不到的页面都会到这里来
// import { LAYOUT } from '@/router/constant';
// export default {
// 	path: '/:pathMatch(.*)*',
// 	name: 'PageNotFound',
// 	component: LAYOUT,
// 	children: [
// 		{
// 			path: '/:pathMatch(.*)*',
// 			name: 'PageNotFound',
// 			component: () => import('@/components/error/Error.vue'),
// 		},
// 	],
// };
