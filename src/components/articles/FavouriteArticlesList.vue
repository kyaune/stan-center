<template>
  <div class="favourite-list">
    <FavouriteArticleCard
        v-for="article in favouriteArticles"
        :key="article.id"
        :article="article"
    />
  </div>
</template>

<script setup>
import FavouriteArticleCard from '@/components/articles/FavouriteArticleCard.vue'
import articles from '@/dummydata/articles'

const favouriteArticles = articles.filter(a => a.favourite).slice(0, 4)
</script>

<style scoped lang="scss">
.favourite-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  padding: 2rem 24px;
}
</style>