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
import { useWordPressArticles } from '@/composables/useWordPressArticles.js'
import {computed} from "vue";

const {articles}  =  useWordPressArticles()
const favouriteArticles = computed(() => {
  return articles.value.filter(a => a.favourite).slice(0, 4)
})

// const favouriteArticles = articles.filter(a => a.favourite).slice(0, 4)
</script>

<style scoped lang="scss">
.favourite-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  padding-block: 2rem;
}

/* по умолчанию 4-ю карточку схлопываем — останется максимум 3 */
.favourite-list > :nth-child(4) {
  max-width: 0;
  overflow: hidden;
  padding: 0;
  margin: 0;
  flex-shrink: 1;
}

/* на широких экранах разворачиваем 4-ю карточку */
@include respond(1200px) {
  .favourite-list > :nth-child(4) {
    max-width: none;
    margin: inherit;
  }
}
</style>