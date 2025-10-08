<script setup lang="ts">
defineProps({
  article: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <article class="favourite-article">
    <div class="favourite-article__image-wrapper">
      <img
          :src="article.img"
          :alt="article.title"
          class="favourite-article__image"
      />
    </div>
    <div class="favourite-article__content">
      <span class="favourite-article__quote">«</span>
      <h3 class="favourite-article__title">{{ article.title }}</h3>
    </div>
  </article>
</template>

<style scoped lang="scss">
.favourite-article {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
  }

  &__image-wrapper {
    width: 100%;
    aspect-ratio: 16/9;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__content {
    display: flex;
    align-items: flex-start;
    padding: 1rem 1.25rem 1.5rem;
  }

  &__quote {
    font-size: 22px;
    font-weight: bold;
    color: #00793d;
    margin-right: 0.4rem;
    line-height: 1;
  }

  &__title {
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.4;
    color: #004225;
    border-left: 4px solid #00793d;
    padding-left: 0.75rem;
  }
}
</style>