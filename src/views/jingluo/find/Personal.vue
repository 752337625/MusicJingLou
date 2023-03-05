<template>
	<div class="swiper">
		<div class="swiper-wrapper">
			<div v-for="item in banner" :key="item.imageUrl" class="swiper-slide">
				<img :src="item.imageUrl" />
				<p :style="{ backgroundColor: item.titleColor }">{{ item.typeTitle }}</p>
			</div>
		</div>
		<div class="swiper-pagination"></div>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import Swiper, { EffectCoverflow, Pagination, Autoplay } from 'swiper';
	import 'swiper/css';
	import 'swiper/css/autoplay ';
	import 'swiper/css/effect-coverflow';
	import 'swiper/css/pagination';
	let banner = ref([]);
	fetch('https://www.luosifa.top/jingluo/banner')
		.then(res => res.json())
		.then(res => {
			let { code, banners } = res;

			if (code === 200) banner.value = banners;
		});
	onMounted(() => {
		new Swiper('.swiper', {
			width: 540,
			height: 200,
			setWrapperSize: true,
			slidesOffsetBefore: 0,
			roundLengths: true,
			initialSlide: 4,
			autoplay: false,
			effect: 'coverflow',
			centeredSlides: true,
			slidesPerview: 3,
			loop: true,
			// loopPreventsSlide: true,
			// slidesPerGroup: 3,
			// spaceBetween: 150,
			coverflowEffect: {
				rotate: 0, //slide做3d旋转时Y轴的旋转角度。默认50。
				stretch: 100, //每个slide之间的拉伸值（距离），越大slide靠得越紧。 默认0。
				depth: 250, //slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。
				modifier: 1, //depth和rotate和stretch的倍率，相当于            depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。
				slideShadows: false, //开启slide阴影。默认 true。
			},
			modules: [Pagination, Autoplay, EffectCoverflow],
			pagination: {
				el: '.swiper-pagination',
			},
		});
	});

	//
	// import { Swiper, SwiperSlide } from 'swiper/vue';
	//
	// // Import Swiper styles

	// defineEmits(['autoplayTimeLeft']);
	// const modules = [EffectCoverflow, Pagination, Autoplay];
	//
</script>

<style lang="less" scoped>
	.swiper {
		width: 100%;
		.swiper-slide {
			position: relative;
			border-radius: 10px;
			img {
				display: block;
				border-radius: 10px;
			}
			p {
				color: #fff;
				display: inline-block;
				position: absolute;
				right: 0;
				bottom: 25px;
				font-size: 11px;
				border-radius: 10px 0 10px 0;
				padding: 5px;
			}
		}
		:deep(.swiper-pagination-bullet) {
			background-color: #e5e5e5;
		}
		:deep(.swiper-pagination-bullet-active) {
			background-color: #ec4141;
		}
	}
</style>
