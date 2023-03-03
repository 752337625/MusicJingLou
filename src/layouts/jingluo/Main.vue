<template>
	<div>
		<div class="left">555 </div>
		<!-- <div class="right"><RouterView /></div> -->
	</div>
</template>
<script setup></script>
<style scoped lang="less">
	.left {
		width: 199px;
		height: 100%;
		border: 1px solid #e0e0e0;
	}
	.right {
		width: calc(100% - 199px);
	}
</style>
