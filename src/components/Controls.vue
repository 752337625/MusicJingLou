<template>
	<el-button-group size="small">
		<el-button :icon="ArrowLeft" @click="back" />
		<el-button :icon="ArrowRight" @click="forward" />
		<el-button :icon="RefreshLeft" @click="refresh" />
	</el-button-group>
</template>

<script setup name="Controls">
	import { ArrowLeft, ArrowRight, RefreshLeft } from '@element-plus/icons-vue';
	let back = () => {
		cosnole.log(1);
	};
	let forward = () => {
		cosnole.log(1);
	};
	let refresh = () => {
		cosnole.log(1);
	};
</script>

<style lang="less" scoped>
	.ant-btn {
		border: 1px solid rgba(0, 0, 0, 0.1);
	}
</style>
