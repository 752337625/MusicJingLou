<template>
	<div class="side-main">
		<router-link to="/" class="logo"><img :src="logo" alt="log" /></router-link>
		<ul class="nav">
			<li
				v-for="item in menuList"
				:key="item.path"
				:class="{ 'is-active': menuActive.indexOf(item.path) >= 0 }"
				@click="selectMenu(item.path)">
				<i :class="['iconfont', `icon-${item.icon}`]"></i><span>{{ item.name }}</span>
			</li>
		</ul>
	</div>
</template>
<script setup>
	import { useRoute, useRouter } from 'vue-router';
	import { shallowReactive, computed } from 'vue';
	import logo from '/@/assets/img/logo.jpg';
	const route = useRoute();
	const router = useRouter();
	const menuList = shallowReactive([
		{
			name: '首页',
			icon: 'index',
			path: '/music/index',
		},
		{
			name: '排行榜',
			icon: 'rank',
			path: '/music/rank',
		},
		{
			name: '歌单',
			icon: 'playlist',
			path: '/music/playlist',
		},
		{
			name: 'MV',
			icon: 'mvlist',
			path: '/music/mvlist',
		},
		{
			name: '歌手',
			icon: 'artist',
			path: '/music/mvlist',
		},
		{
			name: '我的音乐',
			icon: 'mvlist',
			path: '/music/my',
		},
	]);
	// 当前选择菜单
	const menuActive = computed(() => route.path);
	// 切换导航跳转
	const selectMenu = item => {
		router.push({
			path: '/' + item,
		});
	};
</script>
<style lang="less" scoped>
	.side-main {
		padding: 0 35px;
		text-align: center;
	}
	.logo {
		display: inline-block;
		width: 145px;
		margin: 25px auto 10px;
	}

	.nav {
		padding-top: 30px;
		border-top: 1px solid #f5f5f5;

		li {
			display: block;
			padding: 10px 16px;
			color: @--color-text-main;
			border-radius: 8px;
			text-align: left;
			font-weight: 300;
			cursor: pointer;

			&.is-active {
				font-weight: 400;
				background-color: #fff;
				box-shadow: 0 20px 27px rgb(0 0 0 / 5%);

				.iconfont {
					color: #fff;
					background-color: @--color-text-height;
				}
			}

			span {
				display: inline-block;
				line-height: 32px;
			}
		}

		.iconfont {
			display: inline-flex;
			width: 32px;
			height: 32px;
			background-color: #fff;
			box-shadow: 0 4px 6px rgb(0 0 0 / 12%);
			border-radius: 6px;
			justify-content: center;
			align-items: center;
			margin-right: 10px;
			font-size: 18px;
			color: @--color-text;
			vertical-align: top;
		}
	}
</style>
