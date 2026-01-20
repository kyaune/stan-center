<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import {Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import articles from '@/dummydata/articles'
import {computed} from "vue";
import {RouterLink} from "vue-router";

const modules = [ Autoplay, Navigation, Pagination];
const slides = articles.filter(a => a.favourite)

const TAG_ROUTE_BY_VALUE =  {
  'аналитика': 'analitika',
  'интервью': 'intervyu',
  'мнения': 'mneniya',
  'обзоры': 'obzory',
}

const articleTagRouteName = computed(() => {
  const tag = slides.tag?.toLowerCase?.()
  console.log({slides})
  return tag ? TAG_ROUTE_BY_VALUE[tag] : undefined
})
</script>

<template>
  <Swiper
      :modules="modules"
      :loop="true"
      :autoplay="{ delay: 10000 }"
      :pagination="{ clickable: true }"
      navigation
      :speed="800"
      effect="slide"
      class="banner-carousel"
  >
    <SwiperSlide v-for="article in slides" :key="article.id" class="banner-carousel__slide">
      <RouterLink :to="{ name: 'article-by-tag', params: { tagSlug: TAG_ROUTE_BY_VALUE[article.tag.toLowerCase()], id: article.id } }">
      <img :src="article.img" alt="" class="banner-carousel__img" />
      <div class="banner-carousel__overlay"></div>
      <div class="banner-carousel__content">
        <RouterLink
                    :to="{ name: 'tag', params: { slug: TAG_ROUTE_BY_VALUE[article.tag.toLowerCase()] } }"
                    class="banner-carousel__tag">
        {{ article.tag.toUpperCase() }}
        </RouterLink>
        <h2 class="banner-carousel__title">{{ article.title }}</h2>
        <p class="banner-carousel__subtitle">{{ article.subtitle }}</p>
      </div>
      </RouterLink>
    </SwiperSlide>
  </Swiper>
</template>

<style lang="scss">
.banner-carousel {
  position: relative;
  width: 100%;
  height: 600px;

  &__slide {
    position: relative;
    color: #fff;
  }

  &__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }

  &__content {
    padding: 5rem;
    max-width: 700px;
  }

  &__tag {
    background: #d21b1b;
    padding: 0.3rem 1rem;
    border-radius: 1rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  &__title {
    font-weight: 700;
    line-height: 55px;
    margin: 1rem 0;
  }

  &__subtitle {
    //line-height: 1.4;
    font-size: 20px;
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: #000;
    background: #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    &::after {
      font-size: 16px;
      font-weight: bold;
    }

    & svg {
      width: 50%;
      height: 50%;
    }
  }

  .swiper-button-next {
    right: 18px;
  }

  .swiper-button-prev {
    left: 18px;
  }

  .swiper-pagination-bullet {
    background: #fff;
    opacity: 0.5;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .swiper-pagination-bullet-active {
    width: 36px;
    border-radius: 6px;
    opacity: 1;
  }
}

.banner-carousel a {
  color: inherit;
  text-decoration: none;
}

.banner-carousel a:hover,
.banner-carousel a:focus,
.banner-carousel a:visited,
.banner-carousel a:active {
  color: inherit;
  text-decoration: none;
}
</style>