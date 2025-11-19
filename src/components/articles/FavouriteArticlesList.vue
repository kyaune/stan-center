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
  padding-block: 2rem;
}

/* по умолчанию 4-ю карточку скрываем — останется максимум 3 */
.favourite-list > :nth-child(4) {
  display: none;
}

/* на широких экранах включаем 4-ю карточку */
@include respond(1200px) {
  .favourite-list > :nth-child(4) {
    display: block;
  }
}
</style>