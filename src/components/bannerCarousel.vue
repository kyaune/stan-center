<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import {Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useWordPressArticles } from '@/composables/useWordPressArticles.js'

import articlesT from '@/dummydata/articles'
import {computed, onMounted, watch} from "vue";
import {RouterLink} from "vue-router";

const {articles}  =  useWordPressArticles()
const modules = [ Autoplay, Navigation, Pagination];
const slides = computed(() => {
  return articles.value.filter(a => a.favourite)
})
const TAG_ROUTE_BY_VALUE =  {
  'аналитика': 'analitika',
  'интервью': 'intervyu',
  'мнения': 'mneniya',
  'обзоры': 'obzory',
}

const articleTagRouteName = computed(() => {
  const tag = slides.type?.toLowerCase?.()
  return tag ? TAG_ROUTE_BY_VALUE[tag] : undefined
})

// Включаем loop только если достаточно слайдов
const canLoop = computed(() => slides.value.length >= 3)

</script>

<template>
  <Swiper
      :modules="modules"
      :loop="canLoop"
      :autoplay="{ delay: 10000 }"
      :pagination="{ clickable: true }"
      navigation
      :speed="800"
      effect="slide"
      class="banner-carousel"
  >
    <SwiperSlide v-for="article in slides" :key="article.id" class="banner-carousel__slide">
      <RouterLink :to="{ name: `article-${TAG_ROUTE_BY_VALUE[article.type.toLowerCase()]}`, params: { id: article.acfId } }">
      <img :src="article.img" alt="" class="banner-carousel__img" />
      <div class="banner-carousel__overlay"></div>
      <div class="banner-carousel__content">
        <RouterLink
                    :to="{ name: 'tag', params: { slug: TAG_ROUTE_BY_VALUE[article.type.toLowerCase()] } }"
                    class="banner-carousel__tag">
        {{ article.type.toUpperCase() }}
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

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.4) 40%,
            rgba(0, 0, 0, 0.1) 70%,
            transparent 100%
    );
    z-index: 0;
  }


  &__content {
    position: relative;
    z-index: 1;
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
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  &__subtitle {
    //line-height: 1.4;
    font-size: 20px;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
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

/* ==================== Адаптивные стили ==================== */

@media (max-width: 1024px) {
  .banner-carousel {
    height: 500px;

    &__content {
      padding: 3rem;
      max-width: 600px;
    }

    &__title {
      font-size: 2rem;
      line-height: 1.2;
    }

    &__subtitle {
      font-size: 18px;
    }
  }
}

@media (max-width: 768px) {
  .banner-carousel {
    height: 400px;

    &__content {
      padding: 2rem;
      max-width: 100%;
    }

    &__tag {
      font-size: 0.75rem;
      padding: 0.25rem 0.75rem;
    }

    &__title {
      font-size: 1.5rem;
      line-height: 1.3;
      margin: 0.75rem 0;
    }

    &__subtitle {
      font-size: 14px;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .swiper-button-prev,
    .swiper-button-next {
      width: 32px;
      height: 32px;

      &::after {
        font-size: 12px;
      }
    }

    .swiper-button-next {
      right: 10px;
    }

    .swiper-button-prev {
      left: 10px;
    }
  }
}

@media (max-width: 480px) {
  .banner-carousel {
    height: 350px;

    &__content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      height: 100%;
      box-sizing: border-box;
    }

    &__tag {
      font-size: 0.7rem;
      padding: 0.2rem 0.6rem;
      align-self: flex-start;
    }

    &__title {
      font-size: 1.25rem;
      line-height: 1.3;
      margin: 0.5rem 0;
    }

    &__subtitle {
      font-size: 13px;
      -webkit-line-clamp: 2;
    }

    .swiper-button-prev,
    .swiper-button-next {
      display: none;
    }

    .swiper-pagination-bullet {
      width: 6px;
      height: 6px;
    }

    .swiper-pagination-bullet-active {
      width: 24px;
    }
  }
}
</style>