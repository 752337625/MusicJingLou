<script setup>
	import { createAsyncComponent } from '/@/utils/createAsyncComponent';
	import { computed } from 'vue';
	import useLoginStore from '/@/store/modules/login';
	let Search = createAsyncComponent(() => import('/@/layouts/jingluo/Search.vue'));
	const loginStore = useLoginStore();
	const isLogin = computed(() => loginStore.getIsLogin);
	// 头像
	const avatarUrl = computed(() => loginStore.getAvatarUrl);
	// 名称
	const nickname = computed(() => loginStore.getNickname);
	const loginDialog = () => {
		console.log(1);
	};
	const logout = () => {
		console.log(1);
	};
</script>
<template>
	<header class="header">
		<div class="menu"> </div>
		<Search />
		<div :class="isLogin ? 'user-avatar' : 'login'">
			<div v-if="isLogin" class="logined">
				<el-image :src="avatarUrl" class="avatar">
					<div slot="placeholder" class="image-slot">
						<i class="iconfont icon-placeholder"></i>
					</div>
				</el-image>
				<span class="nickname">{{ nickname }}</span>
				<span class="set"><i class="iconfont icon-set"></i></span>
				<span class="quit" @click="logout"><i class="iconfont icon-quit"></i></span>
			</div>
			<span v-else class="login-btn" @click="loginDialog">登录</span>
		</div>
	</header>
</template>
<style lang="less" scoped>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80px;
	}
	.menu {
		flex: 1;
	}

	.user-avatar {
		padding: 5px 0 5px 20px;
		text-align: center;

		.avatar {
			display: inline-block;
			width: 24px;
			height: 24px;
			border-radius: 100%;
			overflow: hidden;
			cursor: pointer;
		}

		.logined {
			display: flex;
			align-items: center;

			span {
				display: inline-block;
				height: 24px;
				line-height: 24px;
				font-weight: 300;
				padding: 0 10px;
				cursor: pointer;
			}

			.iconfont {
				color: @--color-text-main;
				vertical-align: top;
			}
		}
	}
	.login {
		padding: 0 20px;
		text-align: center;

		.login-btn {
			font-size: 16px;
			cursor: pointer;
		}
	}
</style>
