<script setup>
	import { createAsyncComponent } from '/@/utils/createAsyncComponent';
	let Header = createAsyncComponent(() => import('/@/layouts/jingluo/Header.vue'));
</script>
<template>
	<Header />
	<RouterView />
</template>
<style scoped lang="less"></style>
