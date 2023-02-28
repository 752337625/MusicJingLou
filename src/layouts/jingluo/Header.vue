<template>
	<div class="top-bar">
		<img src="../../assets/logo.svg" alt="LOGO" class="top-bar-logo" />
		<div class="top-bar-main">
			<div class="top-bar-control">
				<Controls />
			</div>
			<div class="top-bar-search">
				<!-- <search-box /> -->
			</div>
			<div class="top-bar-menu">
				<div class="top-bar-menu-user">
					<div class="item">
						<!-- <user-info /> -->
					</div>
					<div class="item">
						<!-- <theme-setting /> -->
					</div>
					<div class="item" @click="$router.push({ path: '/setting' })">
						<!-- <a-icon type="setting" class="icon" /> -->
					</div>
					<!-- <div class="item" @click="logout" v-if="userId">退出</div> -->
				</div>
				<!-- <frame-actions /> -->
			</div>
		</div>
	</div>
</template>

<script setup></script>

<style lang="less" scoped>
	.top-bar {
		display: flex;
		height: 100%;
		.top-bar-logo {
			width: 200px;
			padding-left: 20px;
			padding-right: 40px;
		}
		.top-bar-main {
			flex: 1;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.top-bar-search {
				width: 240px;
				flex: 0 0 240px;
			}
			.top-bar-control {
				margin-right: 5px;
			}
		}
	}
</style>
