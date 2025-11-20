<script setup lang="ts">
const props = defineProps<{
  article: {
    id: number
    title: string
    subtitle?: string
    tag?: string
    img: string
  }
}>()
</script>

<template>
  <RouterLink
      class="favourite-article"
      :to="{ name: 'statiya', params: { id: props.article.id } }"
  >
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
  </RouterLink>
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
    padding: 1rem 1.25rem 1.5rem 1.25rem;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background-color: #00793d;
      border-radius: 2px;
    }
  }

  &__quote {
    font-size: 22px;
    font-weight: bold;
    color: #00793d;
    margin-right: 0.5rem;
    line-height: 1;
  }

  &__title {
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.4;
    color: #004225;
  }
}
</style>