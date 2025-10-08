<template>
  <main class="home">
    <section class="home__banner">
      <banner-carousel />
    </section>
    <section class="home__favourites">
      <FavouriteArticlesList />
    </section>
    <div class="home__content">
    <section class="home__articles"> articles</section>
    <section class="home__partners"> partners</section>
    <section class="home__youtube"> youtube</section>
    </div>
  </main>
</template>
<script setup lang="ts">
import BannerCarousel from "@/components/bannerCarousel.vue";
import FavouriteArticlesList from "@/components/articles/FavouriteArticlesList.vue";
</script>
<style lang="scss" scoped>
.home__banner {
  max-height: 600px;
}
</style>