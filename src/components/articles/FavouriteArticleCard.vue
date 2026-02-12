<script setup lang="ts">
const props = defineProps<{
  article: {
    id: number
    acfId: number
    title: string
    subtitle?: string
    type?: string
    img: string
  }
}>()

const TAG_ROUTE_BY_VALUE =  {
  'аналитика': 'analitika',
  'интервью': 'intervyu',
  'мнения': 'mneniya',
  'обзоры': 'obzory',
}
</script>

<template>
  <RouterLink
      class="favourite-article"
      :to="{ name: `article-${TAG_ROUTE_BY_VALUE[props.article.type.toLowerCase()]}`, params: { id: props.article.acfId } }"
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
      <span class="favourite-article__quote" aria-hidden="true">“</span>
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
  flex: 1;

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
    flex: 1;

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
    font-size: 48px;
    font-weight: 800;
    color: #00793d;
    margin-right: 0.6rem;
    line-height: 0.85;
    transform: translateY(-2px);
    font-family: ui-serif, Georgia, "Times New Roman", Times, serif;
  }

  &__title {
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.4;
    color: #004225;
  }
}
</style>