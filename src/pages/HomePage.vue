<template>
  <main class="home">
    <section class="home__banner">
      <banner-carousel />
    </section>

    <section class="home__favourites">
      <FavouriteArticlesList />
    </section>

    <div class="home__content">
      <ContentWithSidebar>
        <template #content>
          <StoriesSection />
        </template>

        <template #sidebar>
          <SidebarFilters />
        </template>
      </ContentWithSidebar>

      <section class="home__youtube">
        <YoutubeBlock />
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import BannerCarousel from "@/components/bannerCarousel.vue";
import FavouriteArticlesList from "@/components/articles/FavouriteArticlesList.vue";
import ContentWithSidebar from "@/components/layout/ContentWithSidebar.vue";
import StoriesSection from "@/components/stories/StoriesSection.vue";
import SidebarFilters from "@/components/sidebar/SidebarFilters.vue";
import YoutubeBlock from "@/components/youtube/YoutubeBlock.vue";
</script>

<style scoped lang="scss">
.home__banner {
  max-height: 600px;
}

.home__favourites,
.home__content {
  @include container;
}

.home__youtube {
  padding-block: var(--paddingXL);
}
</style>