<template>
	<Swiper
		:loop="true"
		:autoplay="false"
		:pagination="true"
		:slidesPerView="2"
		:effect="'coverflow'"
		:centeredSlides="true"
		:coverflowEffect="{
			rotate: 0,
			stretch: 2,
			depth: 100,
			modifier: 2,
			slideShadows: false,
		}"
		:observer="true"
		:observeParents="false"
		:modules="modules">
		<SwiperSlide><img src="https://swiperjs.com/demos/images/nature-7.jpg" /></SwiperSlide
		><SwiperSlide><img src="https://swiperjs.com/demos/images/nature-8.jpg" /></SwiperSlide
		><SwiperSlide><img src="https://swiperjs.com/demos/images/nature-9.jpg" /></SwiperSlide>
	</Swiper>
</template>

<script setup>
	import { Swiper, SwiperSlide } from 'swiper/vue';
	import { EffectCoverflow, Pagination, Autoplay } from 'swiper';
	// Import Swiper styles
	import 'swiper/css';
	import 'swiper/css/effect-coverflow';
	import 'swiper/css/pagination';
	const modules = [EffectCoverflow, Pagination, Autoplay];
</script>

<style lang="less" scoped>
	.swiper {
		width: 100%;
	}
	:deep(.swiper-wrapper .swiper-slide) {
		background-position: center;
		background-size: cover;
		width: 100% !important;
		height: 218px;
	}

	.swiper-slide img {
		display: block;
		width: 540px;
		height: 198px;
	}
</style>
