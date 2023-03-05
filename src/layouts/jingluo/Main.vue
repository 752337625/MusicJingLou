<template>
	<div class="left">
		<router-link to="/find" class="router-link-default">发现音乐</router-link>
		<router-link to="/blog" class="router-link-default">博客</router-link>
		<router-link to="/video" class="router-link-default">视频</router-link>
		<router-link to="/follow" class="router-link-default">关注</router-link>
		<router-link to="/live" class="router-link-default">直播</router-link>
		<router-link to="/fm" class="router-link-default">私人FM</router-link>
	</div>
	<el-container class="right">
		<el-header>
			<router-link to="/find/personal" class="router-link-default">个性推荐</router-link>
			<router-link to="/find/exclusive" class="router-link-default">专属订制</router-link>
			<router-link to="/find/sheet" class="router-link-default">歌单</router-link>
			<router-link to="/find/ranking" class="router-link-default">排行榜</router-link>
			<router-link to="/find/singer" class="router-link-default">歌手</router-link>
			<router-link to="/find/music" class="router-link-default">最新音乐</router-link>
		</el-header>
		<el-main><RouterView /></el-main>
	</el-container>
</template>
<script setup></script>
<style scoped lang="less">
	.left {
		width: 199px;
		height: 100%;
		padding: 12px 2px 0 12px;
		border-right: 1px solid #e0e0e0;
		.router-link-default {
			display: block;
			font-size: 18px;
			line-height: 38px;
			padding-left: 8px;
			margin-bottom: 3px;
			&:hover {
				color: #353536;
				background-color: #f6f6f7;
			}
		}
		.router-link-active {
			font-size: 20px;
			font-weight: bold;
			color: #353536;
			background-color: #f6f6f7;
		}
	}
	.right {
		width: calc(100% - 199px);
		height: 100%;
		.el-header {
			padding: 23px 0 0 23px;
			.router-link-default {
				font-size: 18px;
				margin-right: 20px;
				&:hover {
					color: #353536;
				}
			}
			.router-link-exact-active {
				font-size: 20px;
				transition: all 0.3;
				border-bottom: 3px solid #ec4141;
				padding-bottom: 6px;
				font-weight: 700;
			}
		}
		.el-main {
			padding: 0px 0 0 0;
			width: 758px;
			margin: 0 auto;
		}
	}
</style>
