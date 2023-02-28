<script setup>
	import { createAsyncComponent } from '/@/utils/createAsyncComponent';
	let Header = createAsyncComponent(() => import('/@/layouts/jingluo/Header.vue'));
	let Main = createAsyncComponent(() => import('/@/layouts/jingluo/Main.vue'));
	let Footer = createAsyncComponent(() => import('/@/layouts/jingluo/Footer.vue'));
</script>
<template>
	<el-container class="jingluo">
		<el-header><Header /></el-header>
		<el-main><Main /></el-main>
		<el-footer><Footer /></el-footer>
	</el-container>
</template>
<style lang="less" scoped>
	.jingluo {
		width: 100%;
		height: 100%;
	}
	.el-header,
	.el-footer {
		height: 50px;
		line-height: 50px;
		padding: 0;
	}
	.el-header {
		background-color: @jl-layout-background-color;
		color: @jl-layout-color;
	}
	.el-footer {
		border-top: 1px solid #ddd;
	}
</style>
